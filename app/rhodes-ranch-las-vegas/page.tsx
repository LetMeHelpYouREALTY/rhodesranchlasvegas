import type { Metadata } from "next";
import Link from "next/link";
import { DirectionsToOfficeDynamic } from "@/components/directions/DirectionsToOfficeDynamic";
import { GbpActionBar } from "@/components/gbp/GbpActionBar";
import { PageHero } from "@/components/media/PageHero";
import { SectionFigure } from "@/components/media/SectionFigure";
import { RealScoutLeadSection } from "@/components/realscout/RealScoutLeadSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { NapBlock } from "@/components/sections/NapBlock";
import { LocalExploreNav } from "@/components/seo/LocalExploreNav";
import { GoogleSearchShareLink } from "@/components/seo/GoogleSearchShareLink";
import { LastUpdatedNote } from "@/components/seo/LastUpdatedNote";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { rhodesRanchFaq } from "@/lib/faq-rhodes-ranch";
import { publicEnv } from "@/lib/env";
import { metaAddressOnly, metaDescriptionTail, pageSocialMetadata } from "@/lib/metadata";
import { breadcrumbListJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/schema";
import { googleBusinessProfileReviewHref, googleMapsProfileHref, siteContact } from "@/lib/site-contact";

const canonicalPath = "/rhodes-ranch-las-vegas";

export const metadata: Metadata = {
  title: "Rhodes Ranch Las Vegas homes for sale & local real estate | 89148",
  description: `Rhodes Ranch Las Vegas (89148) real estate: guard-gated golf community in Spring Valley. ${siteContact.agentName} and ${siteContact.secondaryContactName} with ${siteContact.legalBrokerage}—search listings, plan tours, and get local guidance. ${metaAddressOnly}`,
  keywords: [
    "Rhodes Ranch Las Vegas",
    "Rhodes Ranch homes for sale",
    "Rhodes Ranch MLS listings",
    "89148 real estate",
    "Rhodes Ranch Las Vegas homes",
    "Spring Valley homes",
    `${siteContact.address.streetAddress} ${siteContact.address.addressLocality}`,
  ],
  alternates: { canonical: canonicalPath },
  ...pageSocialMetadata(canonicalPath, {
    title: `Rhodes Ranch Las Vegas homes for sale & real estate | ${siteContact.siteBrandShort}`,
    description: `Buy or sell in guard-gated Rhodes Ranch (89148). ${publicEnv.seoSiteTagline} ${metaAddressOnly}`,
  }),
};

export default function RhodesRanchLasVegasHubPage() {
  const mapsHref = googleMapsProfileHref();
  const gbpReviewHref = googleBusinessProfileReviewHref();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Rhodes Ranch Las Vegas", path: canonicalPath },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          path: canonicalPath,
          name: "Rhodes Ranch Las Vegas — homes, real estate, and local guidance (89148)",
          description: `Micro-market hub for ${siteContact.serviceAreaDescription}. ${siteContact.agentName} and ${siteContact.secondaryContactName} for listings, showings, and contract strategy with ${siteContact.legalBrokerage}.`,
        })}
      />
      <JsonLd data={faqPageJsonLd(rhodesRanchFaq)} />
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Rhodes Ranch Las Vegas", path: canonicalPath },
        ]}
      />

      <PageHero imageId="hero-homes">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          Local hub · {siteContact.address.postalCode} · Southwest Las Vegas
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.35rem]">
          Rhodes Ranch Las Vegas Homes and Real Estate
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          This page is your starting point for the query thousands of buyers and sellers use—
          <strong> Rhodes Ranch Las Vegas</strong>—in zip code {siteContact.address.postalCode}. The
          community is guard-gated, built around a central golf course, and set in Spring Valley for
          straightforward access to the west side of the valley. Use the search below for live
          inventory, then call{" "}
          <a
            href={siteContact.phoneTelHref}
            className="font-semibold text-emerald-900 underline-offset-2 hover:underline"
          >
            {siteContact.phoneDisplay}
          </a>{" "}
          or work with <strong>{siteContact.agentName}</strong> and{" "}
          <strong>{siteContact.secondaryContactName}</strong> for tours and pricing context—without
          hype or unverified market claims.
        </p>
        <LastUpdatedNote reviewedMonthYear="September 2026" className="mt-4" />
        <GbpActionBar />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/rhodes-ranch-mls-listings"
            className="rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-950/15 ring-1 ring-white/10 transition hover:bg-emerald-950"
          >
            Rhodes Ranch MLS Listings
          </Link>
          <Link
            href="/search"
            className="rounded-full border border-emerald-900/25 bg-emerald-50/90 px-5 py-2.5 text-sm font-semibold text-emerald-950 shadow-sm hover:bg-emerald-100/90"
          >
            Search Rhodes Ranch area listings
          </Link>
          <Link
            href="/locations"
            className="rounded-full border border-stone-300/90 bg-white/90 px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm backdrop-blur hover:border-stone-400"
          >
            Office and key locations
          </Link>
          <Link
            href="/contact#schedule"
            className="rounded-full border border-stone-300/90 bg-white/90 px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm backdrop-blur hover:border-stone-400"
          >
            Schedule a call
          </Link>
          <Link
            href="/rhodes-ranch-lifestyle"
            className="rounded-full border border-emerald-900/25 bg-emerald-50/90 px-5 py-2.5 text-sm font-semibold text-emerald-950 shadow-sm hover:bg-emerald-100/90"
          >
            Community &amp; lifestyle guide
          </Link>
          <GoogleSearchShareLink className="rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 shadow-sm ring-1 ring-stone-900/5 hover:bg-stone-50">
            Open this area on Google Search
          </GoogleSearchShareLink>
        </div>
      </PageHero>

      <RealScoutLeadSection
        className="mt-10"
        heading="Rhodes Ranch MLS Listings and Homes for Sale"
        headingId="rhodes-hub-listings-heading"
        listingMountStrategy="visible"
        listingIntro="Filter by price, beds, and baths for Rhodes Ranch and nearby Spring Valley—same MLS-backed search we use to prep private tours and offer strategy."
      />
      <section
        className="mt-12 rounded-2xl border border-stone-200/90 bg-gradient-to-br from-white via-white to-emerald-50/35 p-6 shadow-[0_8px_30px_rgb(0_0_0_/0.06)] ring-1 ring-stone-900/5 sm:p-8"
        aria-labelledby="path-heading"
      >
        <h2
          id="path-heading"
          className="font-display text-2xl font-semibold tracking-tight text-emerald-950"
        >
          How we help in Rhodes Ranch
        </h2>
        <div className="mt-5 grid gap-6 md:grid-cols-2 md:items-start">
          <ul className="list-disc space-y-3 pl-5 text-stone-700">
          <li>
            <strong className="text-stone-800">Buyers:</strong> curate a short list, coordinate
            showings, and review disclosures and HOA materials with you—start with the{" "}
            <Link href="/buyers" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
              buyer guide
            </Link>{" "}
            or{" "}
            <Link
              href="/buyers/process"
              className="font-medium text-emerald-900 underline-offset-2 hover:underline"
            >
              Las Vegas purchase process
            </Link>
            .
          </li>
          <li>
            <strong className="text-stone-800">Sellers:</strong> prep, pricing conversation, and
            exposure through Berkshire Hathaway HomeServices channels—ask for a consultation when
            you are ready to compare your home to current comps.
          </li>
          <li>
            <strong className="text-stone-800">Weekend tours:</strong> use{" "}
            <Link href="/open-houses" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
              open house schedules
            </Link>{" "}
            and the{" "}
            <Link href="/map" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
              area map
            </Link>{" "}
            to line up 89148 stops. Times change; confirm before you drive.
          </li>
        </ul>
          <SectionFigure imageId="hero-buyers" caption="How we help in Rhodes Ranch" />
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-stone-200/90 bg-gradient-to-br from-white via-white to-emerald-50/30 p-6 shadow-[0_8px_30px_rgb(0_0_0_/0.06)] ring-1 ring-stone-900/5 sm:p-8">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-emerald-950">
              Thinking about selling in Rhodes Ranch?
            </h3>
            <p className="mt-4 leading-relaxed text-stone-700">
              Rhodes Ranch sellers consistently get more than online estimates show — because guard-gated
              communities, golf course views, and upgraded finishes don&apos;t show up in automated
              valuations. Dr. Jan Duffy has been pricing and marketing homes in 89148 for over 35 years.
              You get a strategy built for your specific section, not a generic market average.
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-stone-700">
              <li>Accurate pricing based on current closed sales — not Zestimates</li>
              <li>Marketing that reaches California equity buyers and local move-ups</li>
              <li>Clear communication from list to close, no surprises</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-950/15 ring-1 ring-white/10 transition hover:bg-emerald-950"
              >
                Get your home&apos;s value
              </Link>
              <a
                href={siteContact.phoneTelHref}
                className="rounded-full border border-emerald-900/30 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
              >
                Call {siteContact.phoneDisplay}
              </a>
            </div>
          </div>
          <SectionFigure
            imageId="section-selling-kitchen"
            caption="Thinking about selling in Rhodes Ranch?"
          />
        </div>
      </section>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="font-display text-xl font-semibold text-emerald-950 sm:text-2xl">
            Office, Call, and Google Business Profile
          </h2>
          <p className="text-sm leading-relaxed text-stone-600">
            NAP and hours match our{" "}
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-900 underline-offset-2 hover:underline"
              title="View Google Business Profile on Google Maps"
            >
              public Google Business Profile
            </a>{" "}
            for {siteContact.businessName}.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={siteContact.phoneTelHref}
              className="rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-900"
            >
              Call {siteContact.phoneDisplay}
            </a>
            <a
              href={siteContact.phoneSmsHref}
              className="rounded-full border border-emerald-900/35 bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-950 shadow-sm hover:bg-emerald-100"
            >
              Text {siteContact.phoneDisplay}
            </a>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-emerald-900/30 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
            >
              Directions
            </a>
            <a
              href={gbpReviewHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-emerald-900/30 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
            >
              View Google reviews
            </a>
          </div>
          <NapBlock />
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-emerald-950">Map and Service Area</h2>
          <SectionFigure imageId="hero-aerial-map" caption="Map and Service Area" />
          <MapEmbed
            title={`${siteContact.businessName} — office map (${siteContact.address.postalCode})`}
          />
          <p className="text-sm text-stone-600">
            {siteContact.agentName} and {siteContact.secondaryContactName} serve buyers and sellers
            in {siteContact.serviceAreaDescription}.
          </p>
        </div>
      </div>

      <div className="mt-14">
        <DirectionsToOfficeDynamic />
      </div>

      <p className="mt-10 max-w-3xl text-sm text-stone-600">
        IDX listing data and disclaimers appear with search tools where provided.{" "}
        {metaDescriptionTail}
      </p>

      <LocalExploreNav
        currentPath="/rhodes-ranch-las-vegas"
        className="mt-14"
      />

      <div className="mt-16">
        <FaqSection
          id="rhodes-hub-faq"
          titleLevel={3}
          heading="Rhodes Ranch Las Vegas FAQ"
          items={rhodesRanchFaq}
        />
      </div>
    </main>
  );
}
