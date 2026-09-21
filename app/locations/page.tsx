import Link from "next/link";
import type { Metadata } from "next";
import { DirectionsToOfficeDynamic } from "@/components/directions/DirectionsToOfficeDynamic";
import { GbpActionBar } from "@/components/gbp/GbpActionBar";
import { PageHero } from "@/components/media/PageHero";
import { SectionFigure } from "@/components/media/SectionFigure";
import { LocalExploreNav } from "@/components/seo/LocalExploreNav";
import { GoogleSearchShareLink } from "@/components/seo/GoogleSearchShareLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { LocationsMyMapEmbed } from "@/components/sections/LocationsMyMapEmbed";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { NapBlock } from "@/components/sections/NapBlock";
import {
  defaultMetadata,
  metaAddressOnly,
  metaDescriptionTail,
  pageSocialMetadata,
} from "@/lib/metadata";
import { breadcrumbListJsonLd, webPageJsonLd } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

const path = "/locations";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Office and key locations | Las Vegas 89148",
  description: `Find ${siteContact.businessName}: office at ${siteContact.fullAddressLine}, service area, hours, and maps. ${siteContact.agentName} and ${siteContact.secondaryContactName}. ${metaDescriptionTail}`,
  alternates: { canonical: path },
  ...pageSocialMetadata(path, {
    title: "Office and key locations | Rhodes Ranch and Las Vegas",
    description: `NAP that matches our Google Business Profile, office map, and open house tour map. ${metaAddressOnly}`,
  }),
};

export default function LocationsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          path,
          name: "Office and key locations",
          description: `Office address, hours, maps, and NAP for ${siteContact.serviceAreaDescription}. ${metaAddressOnly}`,
        })}
      />

      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Locations", path },
        ]}
      />
      <PageHero imageId="hero-office">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          NAP &amp; maps · {siteContact.address.postalCode}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.25rem]">
          Find our office and key locations
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          Everything on this page matches our{" "}
          <Link href="/contact" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
            public contact and scheduling
          </Link>{" "}
          details: same name, address, and phone you see on our Google Business Profile. For the
          broader Rhodes Ranch and Spring Valley area, open the{" "}
          <Link href="/map" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
            community area map
          </Link>{" "}
          or see how this site appears on{" "}
          <GoogleSearchShareLink className="font-medium text-emerald-900 underline-offset-2 hover:underline" />
          .
        </p>
        <GbpActionBar />
      </PageHero>

      <LocationsMyMapEmbed
        className="mt-12"
        titleLevel={2}
        emptyState="message"
      />

      <section
        className="mt-12"
        aria-labelledby="office-map-heading"
      >
        <h2
          id="office-map-heading"
          className="font-display text-2xl font-semibold tracking-tight text-emerald-950"
        >
          Primary office and map
        </h2>
        <SectionFigure
          imageId="section-key-locations"
          caption="Primary office and map"
          className="mt-4 max-w-xl"
        />
        <p className="mt-2 max-w-2xl text-sm text-stone-600">
          Door-to-door map for {siteContact.fullAddressLine} ({siteContact.legalBrokerage}). Use
          multi-mode directions below when you are ready to drive.
        </p>
        <div className="mt-4 max-w-3xl">
          <MapEmbed
            title={`${siteContact.businessName} — office map (${siteContact.address.postalCode})`}
          />
        </div>
        <div className="mt-8 max-w-6xl">
          <DirectionsToOfficeDynamic />
        </div>
      </section>

      <LocalExploreNav currentPath="/locations" className="mt-14" />

      <div className="mt-14">
        <NapBlock titleLevel={2} headingId="nap-locations-heading" />
      </div>
    </main>
  );
}
