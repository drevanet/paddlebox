
'use client';

import Script from 'next/script';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  Check,
  Crown,
  Infinity as InfinityIcon,
  CalendarDays,
} from 'lucide-react';

declare global {
  interface Window {
    Paddle?: any;
  }
}

type PlanKey = 'two_weeks' | 'monthly';

export default function Pricing() {
  const { data: session } = useSession();

  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<PlanKey | null>(null);

  function checkout(plan: PlanKey) {
    setError('');

    if (!session) {
      window.location.href = '/sign-up?callbackUrl=%2Fpricing';
      return;
    }

    const priceId =
      plan === 'two_weeks'
        ? process.env.NEXT_PUBLIC_PADDLE_PRICE_TWO_WEEKS
        : process.env.NEXT_PUBLIC_PADDLE_PRICE_MONTHLY;

    if (!priceId) {
      setError(
        'Paddle price ID is missing. Check your environment variables and restart the application.'
      );
      return;
    }

    if (!window.Paddle || !ready) {
      setError(
        'Paddle checkout is still loading. Please wait a moment and try again.'
      );
      return;
    }

    setLoadingPlan(plan);

    try {
      window.Paddle.Checkout.open({
        items: [
          {
            priceId,
            quantity: 1,
          },
        ],
        customer: {
          email: session.user?.email || undefined,
        },
        customData: {
          userId: (session.user as any)?.id,
          planKey: plan,
        },
        settings: {
          successUrl: `${window.location.origin}/editor?checkout=success`,
          displayMode: 'overlay',
        },
      });

      // Paddle opens its own overlay. Allow the user to try again
      // if they close it without completing checkout.
      window.setTimeout(() => {
        setLoadingPlan(null);
      }, 1500);
    } catch (checkoutError) {
      console.error('Paddle checkout error:', checkoutError);
      setLoadingPlan(null);
      setError(
        'Could not open Paddle checkout. Please try again or contact support.'
      );
    }
  }

  function initializePaddle() {
    const paddle = window.Paddle;

    if (!paddle) {
      setError('Paddle could not load. Please refresh the page and try again.');
      return;
    }

    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

    if (!token) {
      setError(
        'Paddle client token is missing. Add NEXT_PUBLIC_PADDLE_CLIENT_TOKEN to your environment variables.'
      );
      return;
    }

    try {
      if (process.env.NEXT_PUBLIC_PADDLE_ENV === 'sandbox') {
        paddle.Environment.set('sandbox');
      }

      paddle.Initialize({
        token,
        eventCallback: (event: any) => {
          if (event?.name === 'checkout.completed') {
            setLoadingPlan(null);
          }

          if (event?.name === 'checkout.closed') {
            setLoadingPlan(null);
          }
        },
      });

      setReady(true);
      setError('');
    } catch (initializationError) {
      console.error('Paddle initialization error:', initializationError);
      setError(
        'Paddle could not initialize. Verify your client token and environment settings.'
      );
    }
  }

  return (
    <main>
      <Script
        src="https://cdn.paddle.com/paddle/v2/paddle.js"
        strategy="afterInteractive"
        onLoad={initializePaddle}
        onError={() => {
          setError(
            'Unable to load Paddle checkout. Check your internet connection and try again.'
          );
        }}
      />

      {/* Heading */}
      <section className="px-5 pb-14 pt-16 text-center">
        <div className="eyebrow">
          SIMPLE, TRANSPARENT PRICING
        </div>

        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
          Big ideas.{' '}
          <span className="text-violet">Small plans.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Choose the Drevabox plan that fits your pace. Both plans
          unlock the 3D box design workflow, with different billing
          periods and download allowances.
        </p>
      </section>

      {/* Pricing plans */}
      <section className="mx-auto grid max-w-5xl gap-6 px-5 pb-16 md:grid-cols-2">
        {/* Two-week plan */}
        <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet/10 text-violet">
              <InfinityIcon size={24} />
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold">
              BEST FOR SPRINTS
            </span>
          </div>

          <h2 className="mt-6 text-2xl font-black">
            Two-week unlimited
          </h2>

          <p className="mt-2 text-slate-600">
            For focused projects and rapid experimentation.
          </p>

          <div className="mt-7 flex items-end gap-2">
            <span className="text-5xl font-black tracking-tight">
              $8.39
            </span>

            <span className="pb-2 text-sm text-slate-500">
              / 2 weeks
            </span>
          </div>

          <div className="my-7 h-px bg-slate-100" />

          <ul className="grid gap-4">
            {[
              'Unlimited downloads during your active subscription',
              'Create and refine box concepts',
              'Edit all six faces in 3D',
              'Interactive live preview',
              'Manage or cancel your subscription',
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm font-semibold"
              >
                <Check
                  size={18}
                  className="shrink-0 text-violet"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => checkout('two_weeks')}
            disabled={loadingPlan !== null}
            className="btn-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingPlan === 'two_weeks'
              ? 'Opening checkout…'
              : 'Choose unlimited'}
            <Crown size={17} />
          </button>

          <p className="mt-3 text-center text-xs text-slate-400">
            Billed every two weeks. Review renewal terms at checkout.
          </p>
        </article>

        {/* Monthly plan */}
        <article className="relative rounded-[2rem] border-2 border-violet bg-white p-8 shadow-soft">
          <span className="absolute right-6 top-6 rounded-full bg-violet px-3 py-1 text-xs font-extrabold text-white">
            GREAT VALUE
          </span>

          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mint text-emerald-900">
            <CalendarDays size={24} />
          </span>

          <h2 className="mt-6 text-2xl font-black">
            Monthly maker
          </h2>

          <p className="mt-2 text-slate-600">
            For steady creative work and ongoing ideas.
          </p>

          <div className="mt-7 flex items-end gap-2">
            <span className="text-5xl font-black tracking-tight">
              $7.20
            </span>

            <span className="pb-2 text-sm text-slate-500">
              / month
            </span>
          </div>

          <div className="my-7 h-px bg-slate-100" />

          <ul className="grid gap-4">
            {[
              '50 downloads per subscription period',
              'Create and refine box concepts',
              'Edit all six faces in 3D',
              'Interactive live preview',
              'Manage or cancel your subscription',
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm font-semibold"
              >
                <Check
                  size={18}
                  className="shrink-0 text-violet"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => checkout('monthly')}
            disabled={loadingPlan !== null}
            className="btn-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingPlan === 'monthly'
              ? 'Opening checkout…'
              : 'Choose monthly'}
            <CalendarDays size={17} />
          </button>

          <p className="mt-3 text-center text-xs text-slate-400">
            Billed monthly. Review renewal terms at checkout.
          </p>
        </article>
      </section>

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="mx-auto mb-8 max-w-2xl rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
        >
          {error}
        </div>
      )}

      {/* Policy links */}
      <p className="mx-auto max-w-3xl px-5 pb-14 text-center text-sm leading-6 text-slate-500">
        Secure checkout is powered by Paddle when configured.
        Confirm that the prices, currency, tax treatment, billing
        intervals, and renewal settings match your actual Paddle
        products before launch. Subscription renewals may continue
        until canceled according to the terms shown at checkout.{' '}
        <Link href="/refund-policy" className="underline">
          Refund policy
        </Link>
        {' · '}
        <Link href="/cancellation-policy" className="underline">
          Cancellation policy
        </Link>
      </p>
    </main>
  );
}
