"use client";

import Link from "next/link";
import { startTransition, useEffect, useRef, useState } from "react";
import { SiteImage } from "@/components/media/SiteImage";
import { siteContact } from "@/lib/site-contact";

function viewerUrlFromEmbed(embedUrl: string): string {
  const m = embedUrl.match(/[?&]mid=([^&]+)/);
  return m
    ? `https://www.google.com/maps/d/viewer?mid=${encodeURIComponent(m[1])}&hl=en`
    : embedUrl;
}

/**
 * Weekend open houses map (Google My Maps). Iframe `src` loads only when the section is near the
 * viewport to reduce mobile LCP and main-thread work on first paint.
 */
export function OpenHousesMapSection() {
  const embedSrcFull = siteContact.openHousesMapEmbedUrl;
  const viewerHref = viewerUrlFromEmbed(embedSrcFull);
  const { secondaryContactName, secondaryContactTitle, phoneTelHref, phoneDisplay } =
    siteContact;

  const sentinelRef = useRef<HTMLDivElement>(null);
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);

  useEffect(() => {
    const root = sentinelRef.current;
    if (!root) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      startTransition(() => setIframeSrc(embedSrcFull));
      return;
    }

    const failSafe = setTimeout(() => {
      startTransition(() => setIframeSrc(embedSrcFull));
    }, 12_000);

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry?.isIntersecting) {
            clearTimeout(failSafe);
            setIframeSrc(embedSrcFull);
            obs.disconnect();
            return;
          }
        }
      },
      { rootMargin: "280px 0px 200px 0px", threshold: 0.01 },
    );
    obs.observe(root);
    requestAnimationFrame(() => {
      if (typeof obs.takeRecords !== "function") return;
      for (const entry of obs.takeRecords()) {
        if (entry.isIntersecting) {
          clearTimeout(failSafe);
          setIframeSrc(embedSrcFull);
          obs.disconnect();
        }
      }
    });
    return () => {
      clearTimeout(failSafe);
      obs.disconnect();
    };
  }, [embedSrcFull]);

  return (
    <section
      ref={sentinelRef}
      className="mt-10 rounded-2xl border border-stone-200/90 bg-white p-6 shadow-[0_8px_30px_rgb(0_0_0_/0.06)] ring-1 ring-stone-900/5 sm:p-8"
      aria-labelledby="open-houses-map-heading"
    >
        <h3
          id="open-houses-map-heading"
          className="font-display text-2xl font-semibold tracking-tight text-emerald-950 sm:text-[1.65rem]"
        >
          Where are the open houses and tour stops in Rhodes Ranch and Las Vegas?
        </h3>
        <SiteImage
          id="section-open-house-map"
          sizes="(max-width: 768px) 100vw, 720px"
          caption="Where are the open houses and tour stops in Rhodes Ranch and Las Vegas?"
          className="mt-4"
        />
      <p className="mt-3 max-w-3xl leading-relaxed text-stone-700">
        <strong>{secondaryContactName}</strong>, {secondaryContactTitle}, hosts the current tour
        lineup on a live Google Map covering Rhodes Ranch, Spring Valley, and nearby Las Vegas
        neighborhoods. Use it to plan your route, then call{" "}
        <a href={phoneTelHref} className="font-medium text-emerald-900 underline-offset-2 hover:underline">
          {phoneDisplay}
        </a>{" "}
        or{" "}
        <Link href="/contact" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
          message the team
        </Link>{" "}
        for questions or a private showing.
      </p>
      <p className="mt-2 text-sm text-stone-600">
        Map updates when new open houses are added—bookmark this page and refresh before you head
        out.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-stone-200/90 bg-stone-100 shadow-inner">
        <div className="relative aspect-4/3 w-full min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]">
          {iframeSrc ? (
            <iframe
              title={`Open houses map — ${secondaryContactName}, ${secondaryContactTitle}`}
              src={iframeSrc}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center bg-stone-100 text-sm text-stone-500"
              aria-busy="true"
              aria-live="polite"
            >
              Loading map preview…
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-stone-600">
        <a
          href={viewerHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-emerald-900 underline-offset-2 hover:underline"
        >
          Open full map in Google Maps
        </a>
        <span aria-hidden="true" className="hidden sm:inline">
          ·
        </span>
        <Link href="/open-houses" className="font-medium text-emerald-800 underline-offset-2 hover:underline">
          Open houses by day and MLS search
        </Link>
        <span aria-hidden="true" className="hidden sm:inline">
          ·
        </span>
        <Link href="/buyers" className="font-medium text-emerald-800 underline-offset-2 hover:underline">
          Home buyer resources
        </Link>
      </p>
    </section>
  );
}
