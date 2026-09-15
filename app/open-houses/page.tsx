import Link from "next/link";
import type { Metadata } from "next";
import { GbpActionBar } from "@/components/gbp/GbpActionBar";
import { PageHero } from "@/components/media/PageHero";
import { SectionFigure } from "@/components/media/SectionFigure";
import { LocalExploreNav } from "@/components/seo/LocalExploreNav";
import { RealScoutLeadSection } from "@/components/realscout/RealScoutLeadSection";
import { OpenHousesMapSection } from "@/components/sections/OpenHousesMapSection";
import { ListingTourSection } from "@/components/sections/ListingTourSection";
import { NapBlock } from "@/components/sections/NapBlock";
import { GoogleSearchShareLink } from "@/components/seo/GoogleSearchShareLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { defaultMetadata, metaDescriptionTail, pageSocialMetadata } from "@/lib/metadata";
import { breadcrumbListJsonLd, webPageJsonLd } from "@/lib/schema";
import { WEEKDAY_SLUGS, weekdayMeta } from "@/lib/open-houses-weekdays";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Rhodes Ranch and Las Vegas Open Houses by Day | Tour Schedule",
  description: `Plan open houses in Rhodes Ranch, Spring Valley, and Las Vegas 89148 by day of the week. Map and MLS open house search. ${siteContact.secondaryContactName} (${siteContact.secondaryContactTitle}). ${metaDescriptionTail}`,
  alternates: { canonical: "/open-houses" },
  ...pageSocialMetadata("/open-houses", {
    title: "Open houses by day | Rhodes Ranch and Las Vegas",
    description: `Weekend map and daily open house listings for ${siteContact.serviceAreaDescription}.`,
  }),
};

export default function OpenHousesHubPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Open houses", path: "/open-houses" },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          path: "/open-houses",
          name: "Rhodes Ranch and Las Vegas open houses by day",
          description: `Weekend map, MLS open house search, and day-by-day planning for ${siteContact.serviceAreaDescription}.`,
        })}
      />
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Open houses", path: "/open-houses" },
        ]}
      />
      <PageHero imageId="hero-open-house">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          Open houses · {siteContact.address.postalCode}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.25rem]">
          Rhodes Ranch and Las Vegas open houses by day
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          Use the weekend map to route your tour, then pick a day below for MLS open house listings
          and tips. Times change—confirm on each listing and refresh the map before you drive.{" "}
          <strong>{siteContact.secondaryContactName}</strong> ({siteContact.secondaryContactTitle})
          maintains the map; <strong>{siteContact.agentName}</strong> supports listings and strategy.{" "}
          See also{" "}
          <GoogleSearchShareLink className="font-medium text-emerald-900 underline-offset-2 hover:underline" />{" "}
          for how Google surfaces the community name.
        </p>
        <GbpActionBar />
      </PageHero>

      <RealScoutLeadSection
        className="mt-10"
        titleElement="h2"
        variant="openHouses"
        heading="Open house listings (MLS)"
        headingId="open-houses-hub-listings-heading"
        listingIntro={`Broker open house search for ${siteContact.serviceAreaDescription}—confirm times on each card, then use the map below to plan your route.`}
      />

      <OpenHousesMapSection />

      <section
        className="mt-12"
        aria-labelledby="by-day-heading"
      >
        <h2
          id="by-day-heading"
          className="font-display text-2xl font-semibold tracking-tight text-emerald-950"
        >
          Open houses by day of the week
        </h2>
        <SectionFigure
          imageId="section-weekday-tours"
          caption="Open houses by day of the week"
          className="mt-4 max-w-xl"
        />
        <p className="mt-3 max-w-2xl text-sm text-stone-600">
          Choose a day for day-specific guidance. Each page includes the same broker open house
          search so you can match calendar planning with live inventory.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WEEKDAY_SLUGS.map((slug) => (
            <li key={slug}>
              <Link
                href={`/open-houses/${slug}`}
                className="flex h-full flex-col rounded-xl border border-stone-200/90 bg-white p-4 shadow-sm ring-1 ring-stone-900/5 transition hover:border-emerald-800/30 hover:bg-emerald-50/40"
              >
                <span className="font-display text-lg font-semibold text-emerald-950">
                  {weekdayMeta[slug].label}
                </span>
                <span className="mt-1 text-sm text-stone-600 line-clamp-2">
                  {weekdayMeta[slug].title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ListingTourSection
        heading="Need a private showing instead of an open house?"
        headingId="private-showing-open-houses-heading"
        body="If a listing is not holding open hours that day, we still book gated access. Call, text, or schedule so Chance Fuller can map a route that fits 89148."
        imageId="section-private-tour"
      />

      <LocalExploreNav currentPath="/open-houses" className="mt-14" />

      <div className="mt-14">
        <NapBlock />
      </div>
    </main>
  );
}
