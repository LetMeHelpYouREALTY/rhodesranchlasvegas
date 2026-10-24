"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ensureCalendlyReady } from "@/lib/calendly-load";
import { calendlyUrlFor } from "@/lib/calendly-url";
import { publicEnv } from "@/lib/env";

/** Floating Calendly badge — mount once in root layout; rebuilt on route change so the booking URL matches the page. */
export function CalendlyBadge() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    let cancelled = false;

    function scheduleInit() {
      if (cancelled) return;

      void (async () => {
        await ensureCalendlyReady();
        if (!window.Calendly || cancelled) return;
        if (window.Calendly.destroyBadgeWidget) {
          window.Calendly.destroyBadgeWidget();
        } else {
          document.querySelector(".calendly-badge-widget")?.remove();
        }
        window.Calendly.initBadgeWidget({
          url: calendlyUrlFor(pathname, "badge"),
          text: publicEnv.calendlyBadgeLabel,
          color: publicEnv.calendlyBadgeColor,
          textColor: publicEnv.calendlyBadgeTextColor,
          branding: false,
        });
      })().catch(() => {
        // Badge is optional; phone and /contact remain.
      });
    }

    const isMobile =
      typeof globalThis.matchMedia === "function" &&
      globalThis.matchMedia("(max-width: 768px)").matches;

    if (typeof globalThis.requestIdleCallback === "function") {
      const id = globalThis.requestIdleCallback(() => scheduleInit(), {
        timeout: isMobile ? 9000 : 4000,
      });
      return () => {
        cancelled = true;
        globalThis.cancelIdleCallback(id);
      };
    }

    const t = globalThis.setTimeout(scheduleInit, isMobile ? 6000 : 2800);
    return () => {
      cancelled = true;
      globalThis.clearTimeout(t);
    };
  }, [pathname]);

  return null;
}
