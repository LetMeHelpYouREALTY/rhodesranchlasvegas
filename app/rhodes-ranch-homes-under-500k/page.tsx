import type { Metadata } from "next";
import Link from "next/link";
import { GbpActionBar } from "@/components/gbp/GbpActionBar";
import { PageHero } from "@/components/media/PageHero";
import { RealScoutLeadSection } from "@/components/realscout/RealScoutLeadSection";
import { LocalExploreNav } from "@/components/seo/LocalExploreNav";
import { NapBlock } from "@/components/sections/NapBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { LastUpdatedNote } from "@/components/seo/LastUpdatedNote";
import { FaqSection } from "@/components/sections/FaqSection";
import { ListingTourSection } from "@/components/sections/ListingTourSection";
import { breadcrumbListJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/schema";
import { homesUnder500kFaq } from "@/lib/faq-listing-segments";
import { metaAddressOnly, metaDescriptionTail, pageSocialMetadata } from "@/lib/metadata";
import { siteContact } from "@/lib/site-contact";

const canonicalPath = "/rhodes-ranch-homes-under-500k";

export const metadata: Metadata = {
  title: "Rhodes Ranch Homes Under $500k | Las Vegas 89148",
  description: `Browse Rhodes Ranch homes under $500k using MLS-backed search filters. Track price changes and request private tours in southwest Las Vegas 89148 with ${siteContact.agentName}. ${metaDescriptionTail}`,
  alternates: { canonical: canonicalPath },
  ...pageSocialMetadata(canonicalPath, {
    title: "Rhodes Ranch Homes Under $500k",
    description: `Price-focused Rhodes Ranch home search in 89148. ${metaAddressOnly}`,
  }),
};

export default function RhodesRanchHomesUnder500kPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Rhodes Ranch homes under $500k", path: canonicalPath },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          path: canonicalPath,
          name: "Rhodes Ranch homes under $500k",
          description: "Budget-focused Rhodes Ranch listings page for homes under $500k in Las Vegas 89148.",
        })}
      />
      <JsonLd data={faqPageJsonLd(homesUnder500kFaq)} />

      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Rhodes Ranch homes under $500k", path: canonicalPath },
        ]}
      />
      <PageHero imageId="hero-starter-home">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          Price-focused search · Rhodes Ranch
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.25rem]">
          Rhodes Ranch Homes Under $500k
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          Start with homes currently listed below the $500,000 range, then refine by beds, baths, and
          property type. Prices and status shift often, so save favorites and re-check before showings.
        </p>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-emerald-900/80">
          Price-segment page · results change with market updates
        </p>
        <p className="mt-3 text-sm text-stone-600">
          Want broader options?{" "}
          <Link href="/rhodes-ranch-mls-listings" className="font-medium text-emerald-900 hover:underline">
            View all Rhodes Ranch MLS listings
          </Link>
          .
        </p>
        <LastUpdatedNote reviewedMonthYear="September 2026" className="mt-4" />
        <GbpActionBar />
      </PageHero>

      <RealScoutLeadSection
        className="mt-10"
        titleElement="h2"
        heading="Rhodes Ranch Homes for Sale Under $500k"
        headingId="rhodes-ranch-under-500k-heading"
        listingIntro="Active homes near the under-$500k target, plus map filters to compare alternatives in 89148."
        listingMountStrategy="immediate"
      />
      <ListingTourSection
        heading="Tour Rhodes Ranch homes in this price band"
        headingId="tour-under-500k-heading"
        body="Price and status move quickly in this band. Confirm the community name on each card, then call so we can book gated access and a daylight walk-through."
        imageId="hero-starter-home"
      />
      <div className="mt-14">
        <FaqSection
          id="under-500k-faq"
          titleLevel={3}
          heading="Homes under $500k FAQ"
          items={homesUnder500kFaq}
          imageId="hero-starter-home"
        />
      </div>
      <LocalExploreNav currentPath={canonicalPath} className="mt-14" />
      <div className="mt-14">
        <NapBlock />
      </div>
    </main>
  );
}
