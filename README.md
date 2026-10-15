# Betty — 3D Box Maker (starter project)

A Next.js App Router + Tailwind CSS starter for a modern six-face 3D packaging editor. It includes an interactive Three.js box preview, editable face labels, account creation/sign-in/sign-out, pricing UI, legal policy pages, a contact page, subscription status UI, Paddle checkout launch points and a customer-portal route.

## Run locally

1. Install Node.js 20.9+.
2. Copy `.env.example` to `.env` and set `NEXTAUTH_SECRET` to a long random secret.
3. Install packages: `npm install`.
4. Create the local database: `npx prisma db push`.
5. Start development: `npm run dev`.
6. Visit `http://localhost:3000`.

## Paddle setup before taking payments

1. Create the two products/prices in Paddle: **US$8.39 recurring every 2 weeks** and **US$7.20 recurring monthly**. Confirm the currency, tax settings, renewal intervals, and consumer disclosures in Paddle.
2. Copy their price IDs into `NEXT_PUBLIC_PADDLE_PRICE_TWO_WEEKS` and `NEXT_PUBLIC_PADDLE_PRICE_MONTHLY`.
3. Set `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`, `NEXT_PUBLIC_PADDLE_ENV` (`sandbox` while testing, then `production`), and `PADDLE_API_KEY`.
4. Configure the customer portal in Paddle and set the notification destination to `/api/paddle/webhook`.
5. **Do not enable live checkout yet:** the webhook route intentionally fails closed until Paddle signature verification and event-to-user subscription synchronization are implemented. Without that, paid subscription status and plan allowances will not activate automatically. Add verification with Paddle's official Node SDK, persist customer/subscription IDs and plan keys, and test created/updated/canceled events before launch.
6. Move download authorization and usage increments to a server route. The current editor demonstrates the gating UI but its JSON export is client-side, so it is not a secure production entitlement check.

## Current starter limitations

- 3D preview uses a real interactive Three.js box with six texture faces; face editing currently changes the displayed face label. It is a concept mock-up, not a manufacturing dieline or print-ready packaging file.
- The download action currently exports editable design settings to JSON, not a rendered PNG/PDF.
- Project saving/persistence is not implemented yet, although the Prisma `Project` model is included as a foundation.
- The contact form uses `mailto:` and `support@yourdomain.com` is a placeholder. Replace it with your real support address and preferably a server-side email service.
- The legal pages are editable starter templates, not legal advice. Update business identity/contact information and have them reviewed for your markets.
- Add rate limiting, email verification, password reset, logging, database backups and production security checks before launch.

## Deploy

Deploy to a Node.js-capable host (e.g. Vercel or a managed Node host), configure a production database and environment variables, run `npx prisma migrate deploy` when using migrations, and verify Paddle in sandbox before switching to live mode. The default SQLite database is suitable for local development, not most production deployments.
