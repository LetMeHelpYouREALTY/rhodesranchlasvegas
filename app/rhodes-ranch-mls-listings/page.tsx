import type { Metadata } from "next";
import Link from "next/link";
import { GbpActionBar } from "@/components/gbp/GbpActionBar";
import { PageHero } from "@/components/media/PageHero";
import { SectionFigure } from "@/components/media/SectionFigure";
import { RealScoutLeadSection } from "@/components/realscout/RealScoutLeadSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ListingTourSection } from "@/components/sections/ListingTourSection";
import { LocalExploreNav } from "@/components/seo/LocalExploreNav";
import { NapBlock } from "@/components/sections/NapBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { GoogleSearchShareLink } from "@/components/seo/GoogleSearchShareLink";
import { LastUpdatedNote } from "@/components/seo/LastUpdatedNote";
import { metaAddressOnly, metaDescriptionTail, pageSocialMetadata } from "@/lib/metadata";
import { breadcrumbListJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/schema";
import { rhodesMlsFaq } from "@/lib/faq-rhodes-mls";
import { siteContact } from "@/lib/site-contact";

const canonicalPath = "/rhodes-ranch-mls-listings";

export const metadata: Metadata = {
  title: "Rhodes Ranch MLS Listings - All Listings, Easy to Search | 89148",
  description: `Search Rhodes Ranch MLS listings in Las Vegas 89148 with map-based filters for price, beds, baths, and status. Work with ${siteContact.agentName} and ${siteContact.secondaryContactName} for private tours and local guidance. ${metaDescriptionTail}`,
  alternates: { canonical: canonicalPath },
  ...pageSocialMetadata(canonicalPath, {
    title: "Rhodes Ranch MLS Listings | Las Vegas 89148",
    description: `All listings, easy to search for Rhodes Ranch homes for sale. ${metaAddressOnly}`,
  }),
};

export default function RhodesRanchMlsListingsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Rhodes Ranch MLS listings", path: canonicalPath },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          path: canonicalPath,
          name: "Rhodes Ranch MLS listings - all listings, easy to search",
          description:
            "Dedicated Rhodes Ranch listings page for Las Vegas 89148 with map search, local guidance, and private-showing support.",
        })}
      />
      <JsonLd data={faqPageJsonLd(rhodesMlsFaq)} />

      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Rhodes Ranch MLS listings", path: canonicalPath },
        ]}
      />
      <PageHero imageId="hero-living-room">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          MLS search · Rhodes Ranch · 89148
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.25rem]">
          Rhodes Ranch MLS Listings - All Listings, Easy to Search
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          Browse Rhodes Ranch homes for sale with the same MLS-backed search used by working agents.
          Filter by price, beds, baths, and map area, then connect with{" "}
          <strong>{siteContact.agentName}</strong> and{" "}
          <strong>{siteContact.secondaryContactName}</strong> for showing strategy in guard-gated
          sections.
        </p>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-emerald-900/80">
          Listing feed monitored daily · status and pricing can change
        </p>
        <p className="mt-3 text-sm text-stone-600">
          Compare these results with Google search output: <GoogleSearchShareLink />.
        </p>
        <LastUpdatedNote reviewedMonthYear="September 2026" className="mt-4" />
        <GbpActionBar />
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/contact#schedule"
            className="rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-950/15 ring-1 ring-white/10 transition hover:bg-emerald-950"
          >
            Schedule a Private Tour
          </Link>
          <Link
            href="/rhodes-ranch-las-vegas"
            className="rounded-full border border-emerald-900/30 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
          >
            Rhodes Ranch Community Hub
          </Link>
        </div>
      </PageHero>

      <RealScoutLeadSection
        className="mt-10"
        titleElement="h2"
        heading="Rhodes Ranch MLS Listings and Homes for Sale"
        headingId="rhodes-ranch-mls-listings-heading"
        listingIntro="Active MLS listings for Rhodes Ranch and nearby southwest Las Vegas. Save favorites, compare homes, and request private tours."
        listingMountStrategy="immediate"
      />
      <ListingTourSection
        heading="Tour Rhodes Ranch MLS listings with gated access"
        headingId="tour-mls-listings-heading"
        body="Filter the grid, then call so we can book showings in guard-gated sections and compare nearby 89148 options on the same route."
      />
      <section className="mt-14 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-[0_6px_24px_rgb(0_0_0_/0.05)] ring-1 ring-stone-900/5 sm:p-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-emerald-950">
          Related Rhodes Ranch Listing Searches
        </h2>
        <SectionFigure
          imageId="section-related-searches"
          caption="Related Rhodes Ranch Listing Searches"
          className="mt-4 max-w-xl"
        />
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-stone-700">
          <li>
            <Link href="/rhodes-ranch-new-listings" className="font-medium text-emerald-900 hover:underline">
              Rhodes Ranch New Listings
            </Link>
          </li>
          <li>
            <Link
              href="/rhodes-ranch-homes-under-500k"
              className="font-medium text-emerald-900 hover:underline"
            >
              Rhodes Ranch Homes Under $500k
            </Link>
          </li>
          <li>
            <Link href="/rhodes-ranch-pool-homes" className="font-medium text-emerald-900 hover:underline">
              Rhodes Ranch Pool Homes
            </Link>
          </li>
        </ul>
      </section>

      <LocalExploreNav currentPath={canonicalPath} className="mt-14" />

      <div className="mt-14">
        <FaqSection
          id="rhodes-ranch-mls-faq"
          titleLevel={3}
          heading="Rhodes Ranch MLS Listings FAQ"
          items={rhodesMlsFaq}
          imageId="section-listings-grid"
        />
      </div>

      <div className="mt-14">
        <NapBlock />
      </div>

      <p className="mt-10 text-xs leading-relaxed text-stone-600">
        Listing data and status can change without notice. Confirm availability, pricing, and broker
        details before making real estate decisions.
      </p>
    </main>
  );
}
