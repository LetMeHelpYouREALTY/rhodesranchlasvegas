"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ensureCalendlyReady } from "@/lib/calendly-load";
import { calendlyUrlFor } from "@/lib/calendly-url";
import { cn } from "@/lib/utils";

type CalendlyInlineProps = {
  className?: string;
};

/** Inline Calendly scheduler — requires client hydration. */
export function CalendlyInline({ className }: CalendlyInlineProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || "/";

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    let cancelled = false;
    void (async () => {
      try {
        await ensureCalendlyReady();
        if (cancelled || !window.Calendly || !parentRef.current) return;
        window.Calendly.initInlineWidget({
          url: calendlyUrlFor(pathname, "inline"),
          parentElement: parentRef.current,
        });
      } catch {
        // Widget failed; page still has phone and email in the contact section.
      }
    })();

    return () => {
      cancelled = true;
      parent.innerHTML = "";
    };
  }, [pathname]);

  return (
    <div
      ref={parentRef}
      className={cn("min-h-[700px] min-w-[320px] w-full", className)}
      aria-label="Schedule a private conversation"
    />
  );
}
