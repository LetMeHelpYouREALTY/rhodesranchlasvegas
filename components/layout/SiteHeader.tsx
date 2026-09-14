import Link from "next/link";
import { siteContact } from "@/lib/site-contact";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/rhodes-ranch-las-vegas", label: "Rhodes Ranch" },
  { href: "/buyers", label: "Buyers" },
  { href: "/rhodes-ranch-lifestyle", label: "Lifestyle" },
  { href: "/open-houses", label: "Open houses" },
  { href: "/map", label: "Area map" },
  { href: "/locations", label: "Locations" },
  { href: "/search", label: "Homes for Sale" },
  { href: "/questions", label: "Q&A" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "border-b border-stone-200/90 bg-white/90 shadow-[0_1px_0_rgb(0_0_0_/0.03)] backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group max-w-md">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-900/85">
            {siteContact.businessName}
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl group-hover:text-emerald-950">
            {siteContact.agentName}
          </span>
          <span className="mt-0.5 block text-xs font-medium tracking-wide text-emerald-900/95">
            {siteContact.agentTitle}
          </span>
          <span className="mt-0.5 block text-[11px] leading-snug text-stone-600">
            {siteContact.legalBrokerage}
          </span>
          <span className="mt-0.5 block text-[11px] leading-snug text-stone-600">
            {siteContact.fullAddressLine}
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium tracking-wide text-stone-700"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="underline-offset-[5px] transition-colors hover:text-emerald-900 hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={siteContact.phoneTelHref}
          className="rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-950/15 ring-1 ring-white/15 transition hover:bg-emerald-950"
        >
          Call {siteContact.phoneDisplay}
        </a>
      </div>
    </header>
  );
}
