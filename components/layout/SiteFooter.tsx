import Link from "next/link";
import {
  googleBusinessProfileReviewHref,
  googleMapsProfileHref,
  googleSearchShareHref,
  siteContact,
} from "@/lib/site-contact";
import { cn } from "@/lib/utils";

export function SiteFooter({ className }: { className?: string }) {
  const mapsProfileHref = googleMapsProfileHref();
  const gbpReviewHref = googleBusinessProfileReviewHref();
  const googleSearchShareUrl = googleSearchShareHref();

  return (
    <footer
      className={cn(
        "mt-auto border-t border-emerald-950/30 bg-stone-950 text-stone-300",
        className,
      )}
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400/90">
            Office
          </p>
          <p className="mt-3 font-display text-lg font-semibold text-stone-50">
            {siteContact.businessName}
          </p>
          <p className="text-sm text-stone-400">{siteContact.legalBrokerage}</p>
          <p className="mt-2 text-sm text-stone-400">Nevada License {siteContact.license}</p>
          <p className="mt-3 text-sm leading-relaxed text-stone-400">
            {siteContact.address.streetAddress}
            <br />
            {siteContact.address.addressLocality}, {siteContact.address.addressRegion}{" "}
            {siteContact.address.postalCode}
          </p>
          <p className="mt-2 text-sm text-stone-400">{siteContact.hoursSummaryLine}</p>
          <p className="mt-2">
            <a
              href={siteContact.phoneTelHref}
              className="font-semibold text-emerald-400 hover:text-emerald-300"
            >
              {siteContact.phoneDisplay}
            </a>
          </p>
          <div className="mt-1 space-y-1 text-sm">
            <p>
              <a
                href={`mailto:${siteContact.email}`}
                className="text-emerald-400/95 hover:text-emerald-300"
              >
                {siteContact.email}
              </a>
              <span className="text-stone-500">
                {" "}
                — {siteContact.agentName}, {siteContact.agentTitle}
              </span>
            </p>
            <p>
              <a
                href={`mailto:${siteContact.secondaryEmail}`}
                className="text-emerald-400/95 hover:text-emerald-300"
              >
                {siteContact.secondaryEmail}
              </a>
              <span className="text-stone-500">
                {" "}
                — {siteContact.secondaryContactName}, {siteContact.secondaryContactTitle}
              </span>
            </p>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400/90">
            Explore
          </p>
          <ul className="mt-3 space-y-2.5 text-sm">
            <li>
              <Link href="/rhodes-ranch-las-vegas" className="text-stone-300 hover:text-white">
                Rhodes Ranch Las Vegas Homes and Real Estate Hub
              </Link>
            </li>
            <li>
              <Link href="/buyers" className="text-stone-300 hover:text-white">
                Home buyer guide (Rhodes Ranch)
              </Link>
            </li>
            <li>
              <Link href="/buyers/process" className="text-stone-300 hover:text-white">
                Las Vegas home buying process
              </Link>
            </li>
            <li>
              <Link href="/rhodes-ranch-lifestyle" className="text-stone-300 hover:text-white">
                Rhodes Ranch lifestyle and amenities
              </Link>
            </li>
            <li>
              <Link href="/open-houses" className="text-stone-300 hover:text-white">
                Open houses by day
              </Link>
            </li>
            <li>
              <Link href="/open-houses/saturday" className="text-stone-300 hover:text-white">
                Saturday open houses — Rhodes Ranch &amp; Las Vegas 89148
              </Link>
            </li>
            <li>
              <Link href="/open-houses/sunday" className="text-stone-300 hover:text-white">
                Sunday open houses — weekend tour planning
              </Link>
            </li>
            <li>
              <Link href="/map" className="text-stone-300 hover:text-white">
                Rhodes Ranch and Spring Valley map
              </Link>
            </li>
            <li>
              <Link href="/search" className="text-stone-300 hover:text-white">
                Search Rhodes Ranch area homes
              </Link>
            </li>
            <li>
              <a
                href={googleSearchShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 hover:text-white"
              >
                Rhodes Ranch Las Vegas on Google Search
              </a>
            </li>
            <li>
              <Link href="/questions" className="text-stone-300 hover:text-white">
                Real estate Q&amp;A (Rhodes Ranch and Las Vegas)
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-stone-300 hover:text-white">
                Contact and directions
              </Link>
            </li>
            <li>
              <Link href="/locations" className="text-stone-300 hover:text-white">
                Office and key locations
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400/90">
            Actions
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a
              href={siteContact.phoneTelHref}
              className="inline-flex w-fit rounded-md border border-emerald-700/80 bg-emerald-950/40 px-3 py-2 font-medium text-emerald-100 hover:border-emerald-500/60 hover:bg-emerald-900/50"
            >
              Call now
            </a>
            <a
              href={mapsProfileHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit rounded-md border border-emerald-700/80 bg-emerald-950/40 px-3 py-2 font-medium text-emerald-100 hover:border-emerald-500/60 hover:bg-emerald-900/50"
            >
              View on Google Maps
            </a>
            <a
              href={gbpReviewHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit rounded-md border border-emerald-700/80 bg-emerald-950/40 px-3 py-2 font-medium text-emerald-100 hover:border-emerald-500/60 hover:bg-emerald-900/50"
            >
              Google reviews
            </a>
            <a
              href={googleSearchShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit rounded-md border border-emerald-700/80 bg-emerald-950/40 px-3 py-2 font-medium text-emerald-100 hover:border-emerald-500/60 hover:bg-emerald-900/50"
            >
              Google Search (Rhodes Ranch)
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-stone-800 px-4 py-5 text-center text-xs text-stone-400 sm:px-6">
        <p>
          Listing data (IDX) is provided through our broker feed. Listing disclaimers apply where shown on
          listing tools.
        </p>
        <p className="mx-auto mt-2 max-w-4xl leading-relaxed text-stone-400">
          © 2026 Berkshire Hathaway HomeServices Nevada Properties - Rhodes Ranch Las Vegas Real Estate
          Division. Comprehensive Real Estate Services by Dr. Jan Duffy S.0197614. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
