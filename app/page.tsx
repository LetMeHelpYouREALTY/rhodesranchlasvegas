import Link from "next/link";
import type { Metadata } from "next";
import { GbpActionBar } from "@/components/gbp/GbpActionBar";
import { PageHero } from "@/components/media/PageHero";
import { SectionFigure } from "@/components/media/SectionFigure";
import { LocalExploreNav } from "@/components/seo/LocalExploreNav";
import { GoogleSearchShareLink } from "@/components/seo/GoogleSearchShareLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/sections/FaqSection";
import { NapBlock } from "@/components/sections/NapBlock";
import { RealScoutLeadSection } from "@/components/realscout/RealScoutLeadSection";
import { OpenHousesMapSection } from "@/components/sections/OpenHousesMapSection";
import { rhodesRanchFaq } from "@/lib/faq-rhodes-ranch";
import { publicEnv } from "@/lib/env";
import {
  defaultMetadata,
  metaAddressOnly,
  metaDescriptionTail,
  pageSocialMetadata,
} from "@/lib/metadata";
import { faqPageJsonLd, webPageJsonLd } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: `${siteContact.siteBrandShort} homes for sale | ${siteContact.agentName}`,
  description: `${siteContact.agentName}, ${siteContact.agentTitle}, helps you buy or sell Rhodes Ranch Las Vegas homes (89148). Weekend open house map from ${siteContact.secondaryContactName} (${siteContact.secondaryContactTitle}). Partner with ${siteContact.secondaryContactName} for buyer needs. ${metaDescriptionTail}`,
  keywords: [
    "Rhodes Ranch Las Vegas homes",
    "Rhodes Ranch open houses",
    "Las Vegas open houses",
    "89148 homes",
    `${siteContact.address.streetAddress} ${siteContact.address.addressLocality}`,
    "Spring Valley real estate",
  ],
  alternates: { canonical: "/" },
  ...pageSocialMetadata("/", {
    title: `${siteContact.siteBrandShort} homes | ${siteContact.agentName}`,
    description: `${publicEnv.seoSiteTagline} Open house map: ${siteContact.secondaryContactName} (${siteContact.secondaryContactTitle}). ${metaAddressOnly}`,
  }),
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={webPageJsonLd({
          path: "/",
          name: `${siteContact.siteBrandShort} — Rhodes Ranch and Las Vegas ${siteContact.address.postalCode}`,
          description: `${siteContact.agentName} (${siteContact.agentTitle}) and ${siteContact.secondaryContactName} for ${siteContact.serviceAreaDescription}. ${publicEnv.seoSiteTagline}`,
        })}
      />
      <JsonLd data={faqPageJsonLd(rhodesRanchFaq)} />
      <PageHero imageId="hero-homes">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-900/85">
          Southwest Las Vegas · {siteContact.address.postalCode}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-5xl">
          Rhodes Ranch Las Vegas Homes: local expertise for buyers and sellers
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          Rhodes Ranch is a guard-gated, master-planned community in Spring Valley—about six miles
          southwest of the Las Vegas Strip—with a central golf course, recreation, and easy access
          to major roads, shopping, and schools.{" "}
          <strong>{siteContact.agentName}</strong> ({siteContact.agentTitle}) and{" "}
          <strong>{siteContact.secondaryContactName}</strong> ({siteContact.secondaryContactTitle})
          work with {siteContact.legalBrokerage} on listings, showings, and strategy for{" "}
          {siteContact.address.postalCode}.
        </p>
        <GbpActionBar />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/search"
            className="rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-950/15 ring-1 ring-white/10 transition hover:bg-emerald-950"
          >
            Browse Rhodes Ranch Las Vegas area homes
          </Link>
          <Link
            href="/rhodes-ranch-las-vegas"
            className="rounded-full border border-emerald-900/40 bg-emerald-100/80 px-5 py-2.5 text-sm font-semibold text-emerald-950 shadow-sm hover:bg-emerald-200/80"
          >
            Rhodes Ranch Las Vegas real estate hub
          </Link>
          <Link
            href="/contact#schedule"
            className="rounded-full border border-stone-300/90 bg-white/90 px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm backdrop-blur hover:border-stone-400"
          >
            Schedule or call
          </Link>
          <Link
            href="/buyers"
            className="rounded-full border border-emerald-900/25 bg-emerald-50/90 px-5 py-2.5 text-sm font-semibold text-emerald-950 shadow-sm hover:bg-emerald-100/90"
          >
            Home buyer guide
          </Link>
        </div>
      </PageHero>

      <RealScoutLeadSection
        className="mt-10"
        listingMountStrategy="idle"
        listingIntro="Use the same live listing search we use for Rhodes Ranch clients—filter by price and property type, then call for a private tour or a focused short list."
      />

      <section
        className="mt-10 rounded-2xl border border-stone-200/90 bg-gradient-to-br from-white via-white to-emerald-50/40 p-6 shadow-[0_8px_30px_rgb(0_0_0_/0.06)] ring-1 ring-stone-900/5 sm:p-8"
        aria-labelledby="buyers-engage-heading"
      >
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h2
              id="buyers-engage-heading"
              className="font-display text-2xl font-semibold tracking-tight text-emerald-950"
            >
              Buying a home in Rhodes Ranch?
            </h2>
            <p className="mt-3 max-w-2xl text-stone-700">
              Get a clear path from pre-approval to tour to offer—plus home search and buyer specialist
              support from {siteContact.secondaryContactName}. No fluff; just practical next steps.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/buyers"
                className="rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-950/15 ring-1 ring-white/10 transition hover:bg-emerald-950"
              >
                Open buyer hub
              </Link>
              <Link
                href="/buyers/process"
                className="text-sm font-semibold text-emerald-900 underline-offset-2 hover:underline"
              >
                See the Las Vegas buying process
              </Link>
            </div>
          </div>
          <SectionFigure imageId="hero-buyers" caption="Buying a home in Rhodes Ranch?" />
        </div>
      </section>

      <OpenHousesMapSection />

      <nav
        className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-sm text-stone-600"
        aria-label="Open house and map shortcuts"
      >
        <span className="font-medium text-stone-700">Plan tours:</span>
        <Link href="/open-houses/saturday" className="text-emerald-900 underline-offset-2 hover:underline">
          Saturday open houses (89148)
        </Link>
        <span aria-hidden="true" className="text-stone-400">
          ·
        </span>
        <Link href="/open-houses/sunday" className="text-emerald-900 underline-offset-2 hover:underline">
          Sunday open houses
        </Link>
        <span aria-hidden="true" className="text-stone-400">
          ·
        </span>
        <Link href="/open-houses" className="text-emerald-900 underline-offset-2 hover:underline">
          All weekdays
        </Link>
        <span aria-hidden="true" className="text-stone-400">
          ·
        </span>
        <Link href="/map" className="text-emerald-900 underline-offset-2 hover:underline">
          Rhodes Ranch area map
        </Link>
        <span aria-hidden="true" className="text-stone-400">
          ·
        </span>
        <Link href="/contact" className="text-emerald-900 underline-offset-2 hover:underline">
          Contact for access
        </Link>
        <span aria-hidden="true" className="text-stone-400">
          ·
        </span>
        <GoogleSearchShareLink className="text-emerald-900 underline-offset-2 hover:underline">
          Same query on Google Search
        </GoogleSearchShareLink>
      </nav>

      <section className="mt-14 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6 text-slate-700">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-emerald-950 sm:text-[1.75rem]">
            Why Buyers Watch Rhodes Ranch
          </h2>
          <SectionFigure imageId="hero-golf" caption="Why Buyers Watch Rhodes Ranch" />
          <p className="leading-relaxed text-stone-700">
            Guard-gated Rhodes Ranch pairs a central Ted Robinson golf course with recreation,
            trails, and southwest Las Vegas convenience. For a dedicated search-intent page (NAP, map, and FAQ aligned with our Google
            profile), use the{" "}
            <Link
              href="/rhodes-ranch-las-vegas"
              className="font-medium text-emerald-900 underline-offset-2 hover:underline"
            >
              Rhodes Ranch Las Vegas real estate hub
            </Link>
            . For the full community story—amenities, recreation center, golf club context, and
            day-trip ideas—read the{" "}
            <Link
              href="/rhodes-ranch-lifestyle"
              className="font-medium text-emerald-900 underline-offset-2 hover:underline"
            >
              Rhodes Ranch community and lifestyle guide
            </Link>
            .
          </p>
        </div>
        <NapBlock />
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-emerald-950">
          Rhodes Ranch Real Estate Help
        </h2>
        <div className="mt-5 grid gap-6 md:grid-cols-2 md:items-center">
          <p className="leading-relaxed text-stone-700">
            Whether you are relocating from California, upsizing locally, or preparing to sell Rhodes
            Ranch Las Vegas homes, {siteContact.agentName} and {siteContact.secondaryContactName}{" "}
            provide pricing perspective, contract guidance, and home search support aligned with
            today&apos;s market—without sensational claims. Start with a conversation or browse{" "}
            <Link href="/search" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
              active listings for the Rhodes Ranch Las Vegas area
            </Link>
            . For direct answers about our team, open houses, and 89148, see the{" "}
            <Link href="/questions" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
              Rhodes Ranch and Las Vegas real estate Q&amp;A
            </Link>
            .
          </p>
          <SectionFigure
            imageId="hero-consultation"
            caption="Rhodes Ranch Real Estate Help"
          />
        </div>
      </section>

      <LocalExploreNav currentPath="/" className="mt-16" />

      <div className="mt-16">
        <FaqSection
          id="faq-heading"
          titleLevel={3}
          heading="Rhodes Ranch FAQ"
          items={rhodesRanchFaq}
        />
      </div>
    </main>
  );
}
