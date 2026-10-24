"use client";

import { usePathname } from "next/navigation";
import { ensureCalendlyReady } from "@/lib/calendly-load";
import { calendlyUrlFor } from "@/lib/calendly-url";
import { cn } from "@/lib/utils";

/** Booking strip placed directly after the RealScout listings section. */
export function CalendlyAfterListings({ className }: { className?: string }) {
  const pathname = usePathname() || "/";
  const url = calendlyUrlFor(pathname, "after-listings");

  return (
    <div
      className={cn(
        "mx-auto mt-6 flex max-w-6xl flex-col items-center justify-between gap-4 rounded-2xl border border-stone-200/90 bg-white px-6 py-5 shadow-sm ring-1 ring-stone-900/5 sm:flex-row",
        className,
      )}
    >
      <p className="text-base text-stone-800">
        See a home you like? Pick a time with Dr. Jan Duffy.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={async (event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey) return;
          event.preventDefault();
          try {
            await ensureCalendlyReady();
            window.Calendly?.initPopupWidget({ url });
          } catch {
            window.open(url, "_blank", "noopener,noreferrer");
          }
        }}
        className="rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-950/15 ring-1 ring-white/10 transition hover:bg-emerald-950"
      >
        Schedule time with me
      </a>
    </div>
  );
}
