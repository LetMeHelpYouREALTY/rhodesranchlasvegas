import Link from "next/link";
import { SectionFigure } from "@/components/media/SectionFigure";
import { cn } from "@/lib/utils";

const EXPLORE_LINKS: { href: string; label: string }[] = [
  {
    href: "/rhodes-ranch-las-vegas",
    label: "Rhodes Ranch Las Vegas Homes and Local Real Estate Hub (89148)",
  },
  {
    href: "/search",
    label: "Homes for sale near Rhodes Ranch, Spring Valley, and southwest Las Vegas",
  },
  {
    href: "/rhodes-ranch-mls-listings",
    label: "Rhodes Ranch MLS Listings - all listings, easy to search",
  },
  {
    href: "/rhodes-ranch-new-listings",
    label: "Rhodes Ranch new listings and recent status changes",
  },
  {
    href: "/rhodes-ranch-homes-under-500k",
    label: "Rhodes Ranch homes under $500k (price-focused search)",
  },
  {
    href: "/rhodes-ranch-pool-homes",
    label: "Rhodes Ranch pool homes for sale in Las Vegas 89148",
  },
  {
    href: "/open-houses",
    label: "Open houses by day of the week with weekend tour planning",
  },
  {
    href: "/open-houses/saturday",
    label: "Saturday open houses — Rhodes Ranch and Las Vegas 89148",
  },
  {
    href: "/open-houses/sunday",
    label: "Sunday open houses and weekend map routing",
  },
  {
    href: "/map",
    label: "Rhodes Ranch and Spring Valley area map (orientation)",
  },
  {
    href: "/buyers",
    label: "Rhodes Ranch home buyer guide and specialist access",
  },
  {
    href: "/buyers/process",
    label: "Las Vegas home buying process — from search to closing",
  },
  {
    href: "/rhodes-ranch-lifestyle",
    label: "Rhodes Ranch community guide: golf, amenities, and lifestyle",
  },
  {
    href: "/questions",
    label: "Rhodes Ranch and Las Vegas real estate Q&A",
  },
  {
    href: "/locations",
    label: "Office NAP, hours, maps, and key locations",
  },
  {
    href: "/contact",
    label: "Contact the team, schedule, and turn-by-turn directions",
  },
];

function normalize(p: string): string {
  const s = p.split("?")[0].split("#")[0].replace(/\/$/, "");
  if (s === "") return "/";
  return s || "/";
}

function includeLink(href: string, currentPath: string): boolean {
  const cur = normalize(currentPath);
  const h = normalize(href);
  if (h === cur) return false;
  return true;
}

type LocalExploreNavProps = {
  /** e.g. `/search` or `/open-houses/saturday` (pathname only). */
  currentPath: string;
  className?: string;
};

/**
 * Dense internal links with descriptive anchor text for SEO (crawl path), local GEO,
 * and AEO (clear topical routes). Excludes the current page when paths match.
 */
export function LocalExploreNav({ currentPath, className }: LocalExploreNavProps) {
  const items = EXPLORE_LINKS.filter((x) => includeLink(x.href, currentPath));
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="More Rhodes Ranch and Las Vegas real estate pages"
      className={cn(
        "rounded-2xl border border-emerald-900/10 bg-gradient-to-br from-stone-50/90 via-white to-emerald-50/30 p-6 shadow-[0_6px_24px_rgb(0_0_0_/0.05)] ring-1 ring-stone-900/5 sm:p-8",
        className,
      )}
    >
      <h3 className="font-display text-xl font-semibold tracking-tight text-emerald-950 sm:text-[1.35rem]">
        More local real estate: guides, search, and open houses
      </h3>
      <SectionFigure
        imageId="section-landmarks"
        caption="More local real estate: guides, search, and open houses"
        className="mt-4 max-w-xl"
      />
      <p className="mt-2 text-sm text-stone-600">
        Hyperlocal topics for the same NAP and service area as our Google Business Profile—helpful
        for search, maps, and AI overviews that use clear page titles and internal links.
      </p>
      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {items.map((x) => (
          <li key={x.href}>
            <Link
              href={x.href}
              className="text-sm font-medium text-emerald-900 underline-offset-2 hover:underline"
            >
              {x.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
