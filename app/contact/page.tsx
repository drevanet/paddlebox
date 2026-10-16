
'use client';

import { useState } from 'react';
import { Mail, MessageCircle, Send } from 'lucide-react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Contact information */}
        <div>
          <div className="eyebrow">
            <MessageCircle size={14} />
            WE'RE HERE TO HELP
          </div>

          <h1 className="mt-5 text-5xl font-black tracking-tight">
            Let's talk{' '}
            <span className="text-violet">boxes.</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
            Have a question about Drevabox, billing, or your
            design workflow? Send a note and our team will get
            back to you.
          </p>

          <div className="mt-8 rounded-3xl bg-violet/5 p-6">
            <Mail className="text-violet" />

            <h2 className="mt-4 font-extrabold">
              Email support
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Need help? Contact our support team by email.
            </p>

            <a
              className="mt-3 inline-block font-bold text-violet"
              href="mailto:support@drevabox.online"
            >
              support@drevabox.online
            </a>
          </div>
        </div>

        {/* Contact form */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft sm:p-9">
          <h2 className="text-2xl font-black">
            Send us a message
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            This form opens your email app with your message
            prepared.
          </p>

          <form
            className="mt-6 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();

              const form = e.currentTarget;
              const formData = new FormData(form);

              const name = String(formData.get('name') || '');
              const email = String(formData.get('email') || '');
              const topic = String(formData.get('topic') || '');
              const message = String(
                formData.get('message') || ''
              );

              const body = [
                `Name: ${name}`,
                `Email: ${email}`,
                `Topic: ${topic}`,
                '',
                message,
              ].join('\n');

              const subject = `Drevabox support: ${topic}`;

              window.location.href =
                `mailto:support@drevabox.online` +
                `?subject=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(body)}`;

              setSent(true);
            }}
          >
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block text-sm font-bold"
              >
                Your name
              </label>

              <input
                id="contact-name"
                className="field"
                name="name"
                required
                maxLength={100}
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block text-sm font-bold"
              >
                Email address
              </label>

              <input
                id="contact-email"
                className="field"
                name="email"
                type="email"
                required
                maxLength={254}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="contact-topic"
                className="mb-2 block text-sm font-bold"
              >
                Topic
              </label>

              <select
                id="contact-topic"
                className="field"
                name="topic"
                defaultValue="General question"
              >
                <option>General question</option>
                <option>Billing and subscription</option>
                <option>Downloads and editor</option>
                <option>Privacy request</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-bold"
              >
                Message
              </label>

              <textarea
                id="contact-message"
                className="field min-h-32"
                name="message"
                required
                maxLength={5000}
                placeholder="How can we help?"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
            >
              <Send size={16} />
              Prepare email
            </button>

            {sent && (
              <p
                role="status"
                className="text-sm text-emerald-700"
              >
                Your email app should open with your message
                prepared. If it doesn't, email
                support@drevabox.online directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
