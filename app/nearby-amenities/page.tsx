import type { Metadata } from "next";
import Link from "next/link";
import { CommunityAmenityMap } from "@/components/amenities/CommunityAmenityMap";
import { CuratedAmenityList } from "@/components/amenities/CuratedAmenityList";
import { GbpActionBar } from "@/components/gbp/GbpActionBar";
import { PageHero } from "@/components/media/PageHero";
import { SectionFigure } from "@/components/media/SectionFigure";
import { FaqSection } from "@/components/sections/FaqSection";
import { NapBlock } from "@/components/sections/NapBlock";
import { LocalExploreNav } from "@/components/seo/LocalExploreNav";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { nearbyAmenitiesFaq } from "@/lib/faq-nearby-amenities";
import { metaAddressOnly, pageSocialMetadata } from "@/lib/metadata";
import { curatedAmenities, rhodesRanchCommunity } from "@/lib/rhodes-ranch-community";
import {
  amenityItemListJsonLd,
  breadcrumbListJsonLd,
  communityPlaceJsonLd,
  faqPageJsonLd,
  webPageJsonLd,
} from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

const canonicalPath = "/nearby-amenities";
const pageTitle = `Nearby Amenities in ${rhodesRanchCommunity.name}, ${rhodesRanchCommunity.city}`;

export const metadata: Metadata = {
  title: `${pageTitle} | ${rhodesRanchCommunity.postalCode}`,
  description: `Grocery, golf, healthcare, dining, parks, and shopping near guard-gated ${rhodesRanchCommunity.name} (${rhodesRanchCommunity.postalCode}). Interactive map plus commute notes—${siteContact.agentName}, ${siteContact.legalBrokerage}. ${metaAddressOnly}`,
  alternates: { canonical: canonicalPath },
  ...pageSocialMetadata(canonicalPath, {
    title: pageTitle,
    description: `Hyperlocal amenity guide for ${rhodesRanchCommunity.fullLabel}. ${metaAddressOnly}`,
    imageId: "section-landmarks",
  }),
};

export default function NearbyAmenitiesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Nearby amenities", path: canonicalPath },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          path: canonicalPath,
          name: pageTitle,
          description: `Map and buyer-focused amenity guide for ${rhodesRanchCommunity.fullLabel}.`,
          imageId: "section-landmarks",
        })}
      />
      <JsonLd data={faqPageJsonLd(nearbyAmenitiesFaq)} />
      <JsonLd
        data={communityPlaceJsonLd({
          name: rhodesRanchCommunity.fullLabel,
          description: `Guard-gated master-planned community in ${rhodesRanchCommunity.locality}, ${rhodesRanchCommunity.city}, Nevada.`,
          latitude: rhodesRanchCommunity.center.latitude,
          longitude: rhodesRanchCommunity.center.longitude,
          containedInPlace: `${rhodesRanchCommunity.locality}, ${rhodesRanchCommunity.region}`,
        })}
      />
      <JsonLd
        data={amenityItemListJsonLd(
          curatedAmenities.map((p) => ({
            name: p.name,
            schemaType: p.schemaType,
            streetAddress: p.streetAddress,
            addressLocality: p.addressLocality,
            addressRegion: p.addressRegion,
            postalCode: p.postalCode,
          })),
          `Featured places near ${rhodesRanchCommunity.name}`,
        )}
      />
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Nearby amenities", path: canonicalPath },
        ]}
      />

      <PageHero imageId="section-landmarks">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-900/85">
          Hyperlocal guide · {rhodesRanchCommunity.postalCode}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.35rem]">
          {pageTitle}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          {rhodesRanchCommunity.name} is a guard-gated, golf-centered community in{" "}
          {rhodesRanchCommunity.locality}—about six miles southwest of the Las Vegas Strip. Use the
          interactive map for restaurants, grocery, parks, healthcare, and more; the written sections
          below highlight verified anchors buyers ask about first.
        </p>
        <GbpActionBar />
      </PageHero>

      <section className="mt-10" aria-labelledby="amenity-map-heading">
        <h2
          id="amenity-map-heading"
          className="font-display text-2xl font-semibold tracking-tight text-emerald-950"
        >
          Interactive amenity map
        </h2>
        <p className="mt-2 max-w-3xl text-stone-700">
          Map center: {rhodesRanchCommunity.centerSource} Switch categories to refresh markers;
          confirm hours and fees with each business.
        </p>
        <div className="mt-6">
          <CommunityAmenityMap defaultCategory="golf" />
        </div>
      </section>

      <div className="mt-14 max-w-3xl space-y-12 text-stone-700">
        <section aria-labelledby="dining-heading">
          <h2 id="dining-heading" className="font-display text-2xl font-semibold text-emerald-950">
            Dining and cafes
          </h2>
          <SectionFigure imageId="section-city-access" caption="Dining near Rhodes Ranch" className="mt-4" />
          <p className="mt-4 leading-relaxed">
            Inside the gates, <strong>Rhodes Ranch Grille</strong> at the golf club is a common
            stop for residents (menus and events on the club site). Along{" "}
            <strong>Warm Springs Road</strong> and <strong>Fort Apache Road</strong> you will find
            chain and local restaurants serving the southwest valley. For larger dining clusters,{" "}
            <strong>Downtown Summerlin</strong> (1980 Festival Plaza Dr) is a major retail and
            restaurant hub northwest of Rhodes Ranch—drive time is often roughly 15–20 minutes in
            light traffic, approximate.
          </p>
        </section>

        <section aria-labelledby="grocery-heading">
          <h2 id="grocery-heading" className="font-display text-2xl font-semibold text-emerald-950">
            Grocery and everyday errands
          </h2>
          <p className="mt-4 leading-relaxed">
            <strong>Smith&apos;s</strong> at 8525 W Warm Springs Rd is the full-service grocery many
            Rhodes Ranch households use near the community entrance. Additional southwest options
            include Winco and other stores along Charleston and Rainbow—use the map filters above to
            compare what is open today.
          </p>
        </section>

        <section aria-labelledby="parks-rec-heading">
          <h2 id="parks-rec-heading" className="font-display text-2xl font-semibold text-emerald-950">
            Parks, recreation, and golf
          </h2>
          <SectionFigure imageId="hero-golf" caption="Golf and recreation" className="mt-4" />
          <p className="mt-4 leading-relaxed">
            <strong>Rhodes Ranch Golf Club</strong> (20 E Rhodes Ranch Pkwy) anchors the community
            with an 18-hole Ted Robinson layout. Residents also use the on-site recreation center,
            trails, and pools (access rules set by the association). Nearby public parks include{" "}
            <strong>Red Ridge Park</strong> (2005 Red Ridge Dr). Regional summer options include{" "}
            <strong>Wet&apos;n&apos;Wild Las Vegas</strong> on S Fort Apache Rd.
          </p>
        </section>

        <section aria-labelledby="health-heading">
          <h2 id="health-heading" className="font-display text-2xl font-semibold text-emerald-950">
            Healthcare and pharmacies
          </h2>
          <p className="mt-4 leading-relaxed">
            <strong>St. Rose Dominican Hospital — San Martín Campus</strong> (8280 W Warm Springs Rd)
            is the closest full-service hospital many buyers reference along the Warm Springs
            corridor. Use the map&apos;s Healthcare and Pharmacies filters for additional clinics and
            drugstores; for emergencies, dial 911.
          </p>
        </section>

        <section aria-labelledby="shopping-heading">
          <h2 id="shopping-heading" className="font-display text-2xl font-semibold text-emerald-950">
            Shopping
          </h2>
          <p className="mt-4 leading-relaxed">
            Day-to-day retail lines Fort Apache, Rainbow, and Charleston west of the 215 Beltway.{" "}
            <strong>Downtown Summerlin</strong> adds department stores and specialty retail roughly
            15–20 minutes north in typical conditions. The map&apos;s Shopping filter surfaces malls
            and major centers dynamically when the Google Maps API key is configured.
          </p>
        </section>

        <section aria-labelledby="schools-heading">
          <h2 id="schools-heading" className="font-display text-2xl font-semibold text-emerald-950">
            Schools
          </h2>
          <p className="mt-4 leading-relaxed">
            Rhodes Ranch students attend Clark County School District campuses assigned by address—
            common nearby names buyers research include <strong>Sierra Vista High School</strong> and{" "}
            <strong>Tanaka Elementary School</strong>. Verify current zoning with CCSD before you
            write an offer; assignment boundaries change.
          </p>
        </section>

        <section aria-labelledby="commute-heading">
          <h2 id="commute-heading" className="font-display text-2xl font-semibold text-emerald-950">
            Commute and regional access
          </h2>
          <SectionFigure imageId="section-city-access" caption="Commute from Rhodes Ranch" className="mt-4" />
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
            <li>
              <strong>Las Vegas Strip</strong> — often roughly 15–25 minutes by car in light traffic
              (approximate); use Russell Rd or the 215 to reach resort corridors.
            </li>
            <li>
              <strong>Harry Reid International Airport</strong> — commonly about 20–35 minutes
              depending on time of day (approximate).
            </li>
            <li>
              <strong>Downtown Summerlin</strong> — often roughly 15–20 minutes north on the 215 or
              surface streets (approximate).
            </li>
            <li>
              <strong>Red Rock Canyon</strong> — popular weekend drive west of the valley for hiking
              and scenic loops.
            </li>
          </ul>
        </section>

        <section aria-labelledby="curated-list-heading">
          <h2 id="curated-list-heading" className="font-display text-2xl font-semibold text-emerald-950">
            Verified nearby anchors (static list)
          </h2>
          <p className="mt-3 text-sm text-stone-600">
            Names and street addresses only—no invented ratings or drive times.
          </p>
          <CuratedAmenityList className="mt-6" />
        </section>
      </div>

      <section
        className="mt-14 grid gap-8 rounded-2xl border border-emerald-900/15 bg-emerald-50/40 p-6 sm:grid-cols-2 sm:p-8"
        aria-labelledby="agent-trust-heading"
      >
        <div>
          <h2 id="agent-trust-heading" className="font-display text-xl font-semibold text-emerald-950">
            Local REALTOR® for {rhodesRanchCommunity.name}
          </h2>
          <p className="mt-3 leading-relaxed text-stone-700">
            {siteContact.agentName} ({siteContact.agentTitle}, Nevada license {siteContact.license})
            with {siteContact.legalBrokerage} helps buyers and sellers compare sections, HOA context,
            and commute tradeoffs in {siteContact.serviceAreaDescription}.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-950"
            >
              Contact {siteContact.agentName}
            </Link>
            <Link
              href="/search"
              className="rounded-full border border-emerald-900/40 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
            >
              Search Rhodes Ranch homes
            </Link>
          </div>
        </div>
        <NapBlock />
      </section>

      <FaqSection
        id="nearby-amenities-faq"
        heading={`${rhodesRanchCommunity.name} amenities FAQ`}
        items={nearbyAmenitiesFaq}
        titleLevel={2}
        imageId="section-faq-community"
      />

      <LocalExploreNav currentPath={canonicalPath} className="mt-16" />
    </main>
  );
}
