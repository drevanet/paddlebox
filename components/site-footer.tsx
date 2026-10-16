
import Link from 'next/link';
import { Box, ArrowUpRight } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-black"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet">
              <Box />
            </span>
            drevabox.
          </Link>

          <p className="mt-4 max-w-md leading-7 text-slate-400">
            A little box of big ideas. Design, customize, preview and export
            beautiful 3D packaging concepts without the complicated software.
          </p>

          <Link
            href="/editor"
            className="mt-6 inline-flex items-center gap-2 font-bold text-mint"
          >
            Make your first box
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div>
          <h3 className="font-bold">Explore</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <Link href="/pricing">Pricing</Link>
            <Link href="/editor">3D box editor</Link>
            <Link href="/account/subscription">
              Subscription management
            </Link>
            <Link href="/contact">Contact us</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Policies</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms and conditions</Link>
            <Link href="/refund-policy">Refund policy</Link>
            <Link href="/cancellation-policy">Cancellation policy</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Drevabox. All rights reserved.
          </span>
          <span>Made for ideas that deserve to be unboxed.</span>
        </div>
      </div>
    </footer>
  );
}
