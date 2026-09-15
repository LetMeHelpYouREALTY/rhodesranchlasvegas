import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/media/PageHero";
import { NapBlock } from "@/components/sections/NapBlock";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <PageHero imageId="hero-homes" className="text-left">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-900">404</p>
        <h1 className="font-display mt-2 text-4xl font-semibold text-emerald-950">Page not found</h1>
        <p className="mt-3 text-sm text-slate-700">
          The page you requested is not available. Start from the home page or contact Dr. Jan Duffy.
        </p>
      </PageHero>
      <div className="mt-8 w-full max-w-md text-left">
        <NapBlock />
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"
        >
          Home
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-emerald-900/30 px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
        >
          Contact
        </Link>
      </div>
    </main>
  );
}
