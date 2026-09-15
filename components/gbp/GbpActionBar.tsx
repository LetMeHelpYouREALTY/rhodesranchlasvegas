import {
  googleBusinessProfileReviewHref,
  googleMapsProfileHref,
  siteContact,
} from "@/lib/site-contact";
import { cn } from "@/lib/utils";

type GbpActionBarProps = {
  className?: string;
};

/**
 * GBP / Maps engagement row: Call, Text, Directions, Reviews.
 * Phone is this site’s tracking line from env (do not swap with other Duffy numbers).
 */
export function GbpActionBar({ className }: GbpActionBarProps) {
  const mapsHref = googleMapsProfileHref();
  const reviewHref = googleBusinessProfileReviewHref();

  return (
    <div
      className={cn("mt-6 flex flex-wrap gap-2.5", className)}
      aria-label="Call, directions, and Google reviews"
    >
      <a
        href={siteContact.phoneTelHref}
        className="rounded-full bg-emerald-900 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-950/15 ring-1 ring-white/10 transition hover:bg-emerald-950"
      >
        Call {siteContact.phoneDisplay}
      </a>
      <a
        href={siteContact.phoneSmsHref}
        className="rounded-full border border-emerald-900/35 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-sm hover:bg-emerald-100"
      >
        Text {siteContact.phoneDisplay}
      </a>
      <a
        href={mapsHref}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-emerald-900/30 bg-white px-4 py-2 text-sm font-semibold text-emerald-950 shadow-sm hover:bg-emerald-50"
      >
        Directions
      </a>
      <a
        href={reviewHref}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-emerald-900/30 bg-white px-4 py-2 text-sm font-semibold text-emerald-950 shadow-sm hover:bg-emerald-50"
      >
        View Google reviews
      </a>
    </div>
  );
}
