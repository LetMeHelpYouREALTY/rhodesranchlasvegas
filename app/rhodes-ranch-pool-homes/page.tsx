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
import { poolHomesFaq } from "@/lib/faq-listing-segments";
import { metaAddressOnly, metaDescriptionTail, pageSocialMetadata } from "@/lib/metadata";
import { siteContact } from "@/lib/site-contact";

const canonicalPath = "/rhodes-ranch-pool-homes";

export const metadata: Metadata = {
  title: "Rhodes Ranch Pool Homes | Las Vegas 89148 Homes for Sale",
  description: `Search Rhodes Ranch pool homes in Las Vegas 89148 with MLS-backed filters and map tools. Compare listings and schedule private tours with ${siteContact.agentName} and team. ${metaDescriptionTail}`,
  alternates: { canonical: canonicalPath },
  ...pageSocialMetadata(canonicalPath, {
    title: "Rhodes Ranch Pool Homes for Sale",
    description: `Filter Rhodes Ranch homes with pool features in 89148. ${metaAddressOnly}`,
  }),
};

export default function RhodesRanchPoolHomesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Rhodes Ranch pool homes", path: canonicalPath },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          path: canonicalPath,
          name: "Rhodes Ranch pool homes",
          description: "Feature-focused Rhodes Ranch listings page for pool homes in Las Vegas 89148.",
        })}
      />
      <JsonLd data={faqPageJsonLd(poolHomesFaq)} />

      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Rhodes Ranch pool homes", path: canonicalPath },
        ]}
      />
      <PageHero imageId="hero-pool">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          Feature search · Pool homes · 89148
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.25rem]">
          Rhodes Ranch Pool Homes for Sale
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          Explore homes in Rhodes Ranch with pool-focused criteria and nearby alternatives in southwest
          Las Vegas. Verify listing details and schedule private walk-throughs before making decisions.
        </p>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-emerald-900/80">
          Feature-focused search · listing details refresh frequently
        </p>
        <p className="mt-3 text-sm text-stone-600">
          Need broader options and map coverage?{" "}
          <Link href="/rhodes-ranch-mls-listings" className="font-medium text-emerald-900 hover:underline">
            Open full Rhodes Ranch MLS listings
          </Link>
          .
        </p>
        <LastUpdatedNote reviewedMonthYear="September 2026" className="mt-4" />
        <GbpActionBar />
      </PageHero>

      <RealScoutLeadSection
        className="mt-10"
        titleElement="h2"
        heading="Rhodes Ranch Pool-Friendly MLS Listings"
        headingId="rhodes-ranch-pool-homes-heading"
        listingIntro="Pool-oriented listings and nearby options in 89148. Use filters and map search for the right mix of price and features."
        listingMountStrategy="immediate"
      />
      <ListingTourSection
        heading="Tour Rhodes Ranch pool homes in daylight"
        headingId="tour-pool-homes-heading"
        body="See the yard, equipment, and setbacks in person before you write an offer. We coordinate gated access and a showing window that fits your schedule."
        imageId="hero-pool"
      />
      <div className="mt-14">
        <FaqSection
          id="pool-homes-faq"
          titleLevel={3}
          heading="Rhodes Ranch pool homes FAQ"
          items={poolHomesFaq}
          imageId="section-pool-faq"
        />
      </div>
      <LocalExploreNav currentPath={canonicalPath} className="mt-14" />
      <div className="mt-14">
        <NapBlock />
      </div>
    </main>
  );
}
