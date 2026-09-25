import type { Metadata } from "next";
import Link from "next/link";
import { CalendlyInline } from "@/components/calendly/CalendlyInline";
import { DirectionsToOfficeDynamic } from "@/components/directions/DirectionsToOfficeDynamic";
import { GbpActionBar } from "@/components/gbp/GbpActionBar";
import { PageHero } from "@/components/media/PageHero";
import { SectionFigure } from "@/components/media/SectionFigure";
import { RealScoutLeadSection } from "@/components/realscout/RealScoutLeadSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { LocalExploreNav } from "@/components/seo/LocalExploreNav";
import { GoogleSearchShareLink } from "@/components/seo/GoogleSearchShareLink";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { NapBlock } from "@/components/sections/NapBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { contactFaq } from "@/lib/faq-contact";
import { metaDescriptionTail, pageSocialMetadata } from "@/lib/metadata";
import { breadcrumbListJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/schema";
import { googleBusinessProfileReviewHref, googleMapsProfileHref, siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: `Schedule a consultation | Contact ${siteContact.agentName} | ${siteContact.businessName} 89148`,
  description: `Book a private 15-minute conversation with ${siteContact.agentName} or reach ${siteContact.secondaryContactName} for Rhodes Ranch Las Vegas homes. Call ${siteContact.phoneDisplay} or visit ${siteContact.fullAddressLine}. Use the calendar below. Nevada license ${siteContact.license}. ${siteContact.legalBrokerage}.`,
  alternates: { canonical: "/contact" },
  ...pageSocialMetadata("/contact", {
    title: `Schedule with ${siteContact.agentName} | ${siteContact.businessName}`,
    description: `Schedule a consultation or call for Rhodes Ranch and 89148 real estate. ${metaDescriptionTail}`,
  }),
};

export default function ContactPage() {
  const mapsHref = googleMapsProfileHref();
  const gbpReviewHref = googleBusinessProfileReviewHref();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          path: "/contact",
          name: `Contact ${siteContact.agentName} — ${siteContact.siteBrandShort}`,
          description: `Schedule a consultation, call ${siteContact.phoneDisplay}, or visit ${siteContact.fullAddressLine}.`,
        })}
      />
      <JsonLd data={faqPageJsonLd(contactFaq)} />
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <PageHero imageId="hero-consultation">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          Get in touch
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.25rem]">
          Contact the Rhodes Ranch Las Vegas team
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          <strong>{siteContact.agentName}</strong> ({siteContact.agentTitle}) and{" "}
          <strong>{siteContact.secondaryContactName}</strong> ({siteContact.secondaryContactTitle}
          ). Book a time on the calendar below, call{" "}
          <a href={siteContact.phoneTelHref} className="font-semibold text-emerald-900 underline-offset-2 hover:underline">
            {siteContact.phoneDisplay}
          </a>
          ,{" "}
          <a href={siteContact.phoneSmsHref} className="font-semibold text-emerald-900 underline-offset-2 hover:underline">
            text us
          </a>
          , or email—hours: {siteContact.hoursSummaryLine}
        </p>
        <GbpActionBar />
      </PageHero>

      <section
        className="mt-10 max-w-3xl rounded-2xl border border-stone-200/90 bg-white p-6 shadow-[0_8px_30px_rgb(0_0_0_/0.06)] ring-1 ring-stone-900/5 sm:p-8"
        aria-labelledby="about-business-heading"
      >
        <h2
          id="about-business-heading"
          className="font-display text-xl font-semibold tracking-tight text-emerald-950 sm:text-2xl"
        >
          About {siteContact.businessName}
        </h2>
        <SectionFigure
          imageId="hero-office"
          caption={`About ${siteContact.businessName}`}
          className="mt-4"
        />
        <p className="mt-4 text-base leading-relaxed text-stone-700">
          {siteContact.gbpBusinessDescription}
        </p>
        <p className="mt-3 text-sm text-stone-600">
          See reviews and directions on{" "}
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-900 underline-offset-2 hover:underline"
          >
            Google Maps
          </a>
          . For the same Google Search view we link sitewide, use{" "}
          <GoogleSearchShareLink className="font-medium text-emerald-900 underline-offset-2 hover:underline" />
          . Call or text for the fastest response during business hours.
        </p>
      </section>

      <RealScoutLeadSection
        className="mt-10"
        listingIntro="See active listings before you book time on the calendar—narrow your search by price and features, then use the scheduler below for a 15-minute private conversation."
      />

      <section
        id="schedule"
        className="mt-14 scroll-mt-24"
        aria-labelledby="schedule-heading"
      >
        <h2
          id="schedule-heading"
          className="font-display text-2xl font-semibold tracking-tight text-emerald-950 sm:text-[1.65rem]"
        >
          Schedule a private 15-minute conversation
        </h2>
        <SectionFigure
          imageId="section-schedule-call"
          caption="Schedule a private 15-minute conversation"
          className="mt-4 max-w-xl"
        />
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600">
          Pick a time that works for you. Prefer phone or email first? Use the Office and contact
          section below for the same phone number, address, and inboxes.
        </p>
        <div className="mt-6 rounded-2xl border border-stone-200/90 bg-white p-3 shadow-[0_8px_30px_rgb(0_0_0_/0.06)] ring-1 ring-stone-900/5 sm:p-4">
          <CalendlyInline />
        </div>
      </section>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
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
              href={`mailto:${siteContact.email}`}
              className="rounded-full border border-emerald-900/30 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
            >
              Email {siteContact.agentName} (listings)
            </a>
            <a
              href={`mailto:${siteContact.secondaryEmail}`}
              className="rounded-full border border-emerald-900/30 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
            >
              Email {siteContact.secondaryContactName} (buyers)
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
              Google reviews
            </a>
          </div>
          <NapBlock />
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-emerald-950">Map and Service Area</h2>
          <SectionFigure imageId="hero-aerial-map" caption="Map and Service Area" />
          <MapEmbed
            title={`Office map — ${siteContact.fullAddressLine} (${siteContact.legalBrokerage})`}
          />
          <p className="text-sm text-slate-600">
            {siteContact.agentName} and {siteContact.secondaryContactName} serve buyers and sellers
            in {siteContact.serviceAreaDescription}.
          </p>
        </div>
      </div>

      <div className="mt-14 max-w-6xl">
        <DirectionsToOfficeDynamic />
      </div>

      <section
        className="mt-12 max-w-3xl rounded-2xl border border-emerald-900/10 bg-emerald-50/35 p-6"
        aria-labelledby="locations-link-heading"
      >
        <h3
          id="locations-link-heading"
          className="font-display text-lg font-semibold text-emerald-950"
        >
          Office, maps, and key locations
        </h3>
        <SectionFigure
          imageId="section-key-locations"
          caption="Office, maps, and key locations"
          className="mt-4 max-w-xl"
        />
        <p className="mt-2 text-sm leading-relaxed text-stone-700">
          For the full page with the office map, open house tour map, hours, and
          turn-by-turn directions, open{" "}
          <Link
            href="/locations"
            className="font-semibold text-emerald-900 underline-offset-2 hover:underline"
          >
            office and key locations
          </Link>
          .
        </p>
      </section>

      <LocalExploreNav currentPath="/contact" className="mt-12" />

      <div className="mt-16">
        <FaqSection
          id="contact-faq-heading"
          titleLevel={3}
          heading="Questions about scheduling and contact"
          items={contactFaq}
          imageId="section-contact-faq"
        />
      </div>
    </main>
  );
}
