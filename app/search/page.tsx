import type { Metadata } from "next";
import Link from "next/link";
import { GbpActionBar } from "@/components/gbp/GbpActionBar";
import { PageHero } from "@/components/media/PageHero";
import { SectionFigure } from "@/components/media/SectionFigure";
import { RealScoutLeadSection } from "@/components/realscout/RealScoutLeadSection";
import { LocalExploreNav } from "@/components/seo/LocalExploreNav";
import { GoogleSearchShareLink } from "@/components/seo/GoogleSearchShareLink";
import { LastUpdatedNote } from "@/components/seo/LastUpdatedNote";
import { NapBlock } from "@/components/sections/NapBlock";
import { FaqSection } from "@/components/sections/FaqSection";
import { ListingTourSection } from "@/components/sections/ListingTourSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { metaAddressOnly, metaDescriptionTail, pageSocialMetadata } from "@/lib/metadata";
import { breadcrumbListJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/schema";
import { rhodesMlsFaq } from "@/lib/faq-rhodes-mls";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Rhodes Ranch MLS Listings and Homes for Sale | Search 89148",
  description: `Search Rhodes Ranch MLS listings and homes for sale in Las Vegas 89148. Filter active listings by price, map, and features, then schedule private tours with ${siteContact.agentName} and ${siteContact.secondaryContactName}. ${metaDescriptionTail}`,
  alternates: { canonical: "/search" },
  ...pageSocialMetadata("/search", {
    title: "Rhodes Ranch MLS Listings and Homes for Sale",
    description: `MLS-backed home search for Rhodes Ranch and 89148. ${metaAddressOnly}`,
  }),
};

export default function SearchPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Homes for sale", path: "/search" },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          path: "/search",
          name: "Rhodes Ranch MLS listings and homes for sale",
          description: `Active MLS-backed search for Rhodes Ranch and nearby 89148 inventory. ${siteContact.agentName} and ${siteContact.secondaryContactName}. ${metaAddressOnly}`,
        })}
      />
      <JsonLd data={faqPageJsonLd(rhodesMlsFaq.slice(0, 4))} />
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Homes for sale", path: "/search" },
        ]}
      />
      <PageHero imageId="hero-living-room">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          Home search · {siteContact.address.postalCode}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.25rem]">
          Rhodes Ranch MLS Listings and Homes for Sale
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          Explore active, MLS-backed listings with on-site map search. Narrow results by budget, beds,
          baths, and location, then work with {siteContact.agentName} ({siteContact.agentTitle}) or{" "}
          {siteContact.secondaryContactName} ({siteContact.secondaryContactTitle}) for a Rhodes
          Ranch-focused short list and private tours.
        </p>
        <p className="mt-3 text-sm text-stone-600">
          Compare with Google&apos;s organic results:{" "}
          <GoogleSearchShareLink className="font-medium text-emerald-900 underline-offset-2 hover:underline" />
          .
        </p>
        <p className="mt-3 text-sm text-stone-600">
          <Link href="/contact#schedule" className="font-medium text-emerald-900 hover:underline">
            Schedule a private consult
          </Link>{" "}
          ·{" "}
          <Link href="/" className="font-medium text-emerald-900 hover:underline">
            Back to Rhodes Ranch overview
          </Link>
        </p>
        <LastUpdatedNote reviewedMonthYear="September 2026" className="mt-4" />
        <GbpActionBar />
      </PageHero>

      <RealScoutLeadSection
        className="mt-10"
        titleElement="h2"
        heading="Rhodes Ranch MLS Listings"
        headingId="search-listings-heading"
        listingIntro="Refine by price, status, and property type, then request private tours in Rhodes Ranch, Spring Valley, and nearby southwest Las Vegas."
        listingMountStrategy="immediate"
      />
      <ListingTourSection
        heading="Tour homes from this Rhodes Ranch search"
        headingId="tour-search-heading"
        body="Save favorites in the grid, then call or text for a private showing plan. Guard-gated addresses usually need a booked window—not a drive-up visit."
      />
      <section className="mt-14 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-[0_6px_24px_rgb(0_0_0_/0.05)] ring-1 ring-stone-900/5 sm:p-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-emerald-950">
          Popular Rhodes Ranch Listing Paths
        </h2>
        <SectionFigure
          imageId="hero-new-listing"
          caption="Popular Rhodes Ranch Listing Paths"
          className="mt-4 max-w-xl"
        />
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-stone-700">
          <li>
            <Link href="/rhodes-ranch-mls-listings" className="font-medium text-emerald-900 hover:underline">
              Rhodes Ranch MLS listings (all inventory)
            </Link>
          </li>
          <li>
            <Link href="/rhodes-ranch-new-listings" className="font-medium text-emerald-900 hover:underline">
              Rhodes Ranch new listings
            </Link>
          </li>
          <li>
            <Link
              href="/rhodes-ranch-homes-under-500k"
              className="font-medium text-emerald-900 hover:underline"
            >
              Rhodes Ranch homes under $500k
            </Link>
          </li>
          <li>
            <Link href="/rhodes-ranch-pool-homes" className="font-medium text-emerald-900 hover:underline">
              Rhodes Ranch pool homes
            </Link>
          </li>
        </ul>
      </section>

      <div className="mt-14">
        <FaqSection
          id="search-rhodes-mls-faq"
          titleLevel={3}
          heading="Rhodes Ranch Search FAQ"
          items={rhodesMlsFaq.slice(0, 4)}
          imageId="section-listings-grid"
        />
      </div>

      <LocalExploreNav currentPath="/search" className="mt-14" />

      <div className="mt-14">
        <NapBlock />
      </div>
    </main>
  );
}
