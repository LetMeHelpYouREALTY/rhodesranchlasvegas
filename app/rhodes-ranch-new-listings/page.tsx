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
import { breadcrumbListJsonLd, webPageJsonLd } from "@/lib/schema";
import { metaAddressOnly, metaDescriptionTail, pageSocialMetadata } from "@/lib/metadata";
import { siteContact } from "@/lib/site-contact";

const canonicalPath = "/rhodes-ranch-new-listings";

export const metadata: Metadata = {
  title: "Rhodes Ranch New Listings | Homes for Sale in 89148",
  description: `Track Rhodes Ranch new listings and recent status changes in Las Vegas 89148. Browse current MLS-backed homes and schedule private tours with ${siteContact.agentName}. ${metaDescriptionTail}`,
  alternates: { canonical: canonicalPath },
  ...pageSocialMetadata(canonicalPath, {
    title: "Rhodes Ranch New Listings | 89148",
    description: `Fresh Rhodes Ranch homes for sale with map-based search. ${metaAddressOnly}`,
  }),
};

export default function RhodesRanchNewListingsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Rhodes Ranch new listings", path: canonicalPath },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          path: canonicalPath,
          name: "Rhodes Ranch new listings",
          description: "Fresh Rhodes Ranch listings page focused on newly available homes for sale in 89148.",
        })}
      />

      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Rhodes Ranch new listings", path: canonicalPath },
        ]}
      />
      <PageHero imageId="hero-new-listing">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          New listings · Rhodes Ranch · 89148
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.25rem]">
          Rhodes Ranch New Listings
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          Review recently listed homes in Rhodes Ranch and nearby southwest Las Vegas. Use map filters,
          save homes, and request a tour schedule that fits your timeline.
        </p>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-emerald-900/80">
          New-listing intent page · inventory monitored daily
        </p>
        <p className="mt-3 text-sm text-stone-600">
          Need all inventory?{" "}
          <Link href="/rhodes-ranch-mls-listings" className="font-medium text-emerald-900 hover:underline">
            Return to the full Rhodes Ranch MLS listings page
          </Link>
          .
        </p>
        <LastUpdatedNote reviewedMonthYear="September 2026" className="mt-4" />
        <GbpActionBar />
      </PageHero>

      <RealScoutLeadSection
        className="mt-10"
        titleElement="h2"
        heading="New Rhodes Ranch MLS Listings"
        headingId="rhodes-ranch-new-listings-heading"
        listingIntro="Newest available homes in Rhodes Ranch and surrounding 89148 zones. Confirm status quickly and book showings."
        listingMountStrategy="immediate"
      />
      <LocalExploreNav currentPath={canonicalPath} className="mt-14" />
      <div className="mt-14">
        <NapBlock />
      </div>
    </main>
  );
}
