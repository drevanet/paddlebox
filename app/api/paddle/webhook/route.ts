
import { NextResponse } from 'next/server';
import { Paddle } from '@paddle/paddle-node-sdk';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  const apiKey = process.env.PADDLE_API_KEY;
  const signature = req.headers.get('paddle-signature');

  if (!secret || !apiKey) {
    console.error('Paddle webhook configuration is missing.');
    return NextResponse.json(
      { error: 'Webhook is not configured.' },
      { status: 500 }
    );
  }

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing Paddle signature.' },
      { status: 400 }
    );
  }

  let event: any;

  try {
    // Read the untouched body before parsing or processing it.
    const rawBody = await req.text();
    const paddle = new Paddle(apiKey);

    event = await paddle.webhooks.unmarshal(
      rawBody,
      secret,
      signature
    );
  } catch (error) {
    console.error('Paddle webhook verification failed:', error);

    return NextResponse.json(
      { error: 'Invalid webhook signature or payload.' },
      { status: 400 }
    );
  }

  try {
    const subscriptionEvents = [
      'subscription.created',
      'subscription.updated',
      'subscription.activated',
      'subscription.canceled',
      'subscription.past_due',
      'subscription.paused',
      'subscription.resumed',
      'subscription.trialing',
    ];

    if (!subscriptionEvents.includes(event.eventType)) {
      // Other event types are acknowledged but not processed here.
      return NextResponse.json({ received: true });
    }

    const data = event.data;
    const subscriptionId = data.id as string | undefined;
    const customerId = data.customerId as string | undefined;
    const customData = data.customData as
      | { userId?: string; planKey?: string }
      | null
      | undefined;

    if (!subscriptionId) {
      console.error('Paddle event has no subscription ID.');
      return NextResponse.json({ received: true });
    }

    // Prefer an existing subscription/customer mapping.
    const existing = await db.subscription.findFirst({
      where: {
        OR: [
          { paddleSubscriptionId: subscriptionId },
          ...(customerId ? [{ paddleCustomerId: customerId }] : []),
        ],
      },
    });

    const userId = existing?.userId ?? customData?.userId;

    if (!userId) {
      console.error(
        'Cannot map Paddle subscription to a user.',
        { subscriptionId, customerId, eventType: event.eventType }
      );

      // A retry will not fix missing checkout user metadata.
      return NextResponse.json({
        received: true,
        mapped: false,
      });
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      console.error('Paddle event references an unknown user.');
      return NextResponse.json({ received: true, mapped: false });
    }

    const firstItem = data.items?.[0];
    const priceId = firstItem?.price?.id as string | undefined;
    const periodEnd = data.currentBillingPeriod?.endsAt as
      | string
      | undefined;

    const updateData: Record<string, unknown> = {
      paddleSubscriptionId: subscriptionId,
      status: data.status,
    };

    if (customerId) updateData.paddleCustomerId = customerId;
    if (priceId) updateData.priceId = priceId;
    if (customData?.planKey) updateData.planKey = customData.planKey;

    if (periodEnd) {
      const parsedDate = new Date(periodEnd);
      if (!Number.isNaN(parsedDate.getTime())) {
        updateData.periodEnd = parsedDate;
      }
    }

    await db.subscription.upsert({
      where: { userId },
      create: {
        userId,
        paddleSubscriptionId: subscriptionId,
        paddleCustomerId: customerId,
        status: data.status,
        priceId,
        planKey: customData?.planKey,
        periodEnd: periodEnd ? new Date(periodEnd) : null,
      },
      update: updateData,
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Paddle webhook database update failed:', error);

    return NextResponse.json(
      { error: 'Could not process subscription event.' },
      { status: 500 }
    );
  }
}
