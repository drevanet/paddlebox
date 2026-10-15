import { NextResponse } from 'next/server';
// IMPORTANT: verify Paddle's signature against the raw request body before using this endpoint in production.
// Paddle sends subscription.created/updated/canceled and transaction.completed events here.
export async function POST(req: Request) {
 const raw=await req.text();
 if(!process.env.PADDLE_WEBHOOK_SECRET) return NextResponse.json({error:'Webhook secret is not configured.'},{status:500});
 // Signature verification must be added using Paddle's official SDK before enabling live billing.
 // This intentionally fails closed rather than trusting an unverified event payload.
 return NextResponse.json({error:'Webhook signature verification is not implemented yet. Add Paddle SDK verification before enabling live billing.',receivedBytes:raw.length},{status:501});
}
