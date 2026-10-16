
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Box, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function SiteHeader() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const links = [
    ['Features', '#features'],
    ['How it works', '#how-it-works'],
    ['Pricing', '/pricing'],
    ['Editor', '/editor'],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Drevabox home"
        >
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-violet text-white">
            <Box size={21} />
          </span>

          <span className="text-xl font-black tracking-tight">
            drevabox<span className="text-violet">.</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-semibold text-slate-600 transition hover:text-violet"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop authentication actions */}
        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <>
              <Link href="/editor" className="btn-secondary">
                My workspace
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-sm font-bold text-slate-600 transition hover:text-violet"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-sm font-bold">
                Sign in
              </Link>

              <Link href="/sign-up" className="btn-primary">
                Get started <span>↗</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="rounded-lg p-2 transition hover:bg-slate-100 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {open && (
        <div className="border-t bg-white px-5 py-4 md:hidden">
          {links.map(([label, href]) => (
            <Link
              onClick={() => setOpen(false)}
              key={label}
              href={href}
              className="block py-3 font-semibold text-slate-700 transition hover:text-violet"
            >
              {label}
            </Link>
          ))}

          {session ? (
            <>
              <Link
                href="/editor"
                onClick={() => setOpen(false)}
                className="mt-2 block py-3 font-bold text-violet"
              >
                My workspace
              </Link>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  void signOut({ callbackUrl: '/' });
                }}
                className="block py-3 font-bold text-slate-600"
              >
                Sign out
              </button>
            </>
          ) : (
            <div className="mt-3 flex flex-col gap-4">
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="font-bold"
              >
                Sign in
              </Link>

              <Link
                href="/sign-up"
                onClick={() => setOpen(false)}
                className="btn-primary text-center"
              >
                Get started <span>↗</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
