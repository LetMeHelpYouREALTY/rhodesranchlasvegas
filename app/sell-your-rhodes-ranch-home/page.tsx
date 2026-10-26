import type { Metadata } from "next";
import Link from "next/link";
import { CalendlyInline } from "@/components/calendly/CalendlyInline";
import { GbpActionBar } from "@/components/gbp/GbpActionBar";
import { PageHero } from "@/components/media/PageHero";
import { SectionFigure } from "@/components/media/SectionFigure";
import { FaqSection } from "@/components/sections/FaqSection";
import { NapBlock } from "@/components/sections/NapBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { sellerFaq } from "@/lib/faq-sellers";
import {
  defaultMetadata,
  metaAddressOnly,
  pageSocialMetadata,
} from "@/lib/metadata";
import { breadcrumbListJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

const canonicalPath = "/sell-your-rhodes-ranch-home";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    absolute: `Sell Your Rhodes Ranch Home with ${siteContact.agentName}`,
  },
  description: `Rhodes Ranch sellers: pricing, prep, marketing, and negotiation with ${siteContact.agentName} in ${siteContact.address.postalCode}. Book a listing consultation or call ${siteContact.phoneDisplay}.`,
  alternates: { canonical: canonicalPath },
  ...pageSocialMetadata(canonicalPath, {
    title: `Sell Your Rhodes Ranch Home | ${siteContact.agentName}`,
    description: `Listing strategy for guard-gated Rhodes Ranch sellers in ${siteContact.address.postalCode}. ${metaAddressOnly}`,
  }),
};

export default function SellYourRhodesRanchHomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Sell your Rhodes Ranch home", path: canonicalPath },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          path: canonicalPath,
          name: "Sell your Rhodes Ranch home",
          description: `Listing consultation, pricing, and marketing for Rhodes Ranch sellers with ${siteContact.agentName}.`,
        })}
      />
      <JsonLd data={faqPageJsonLd(sellerFaq)} />
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Sell your Rhodes Ranch home", path: canonicalPath },
        ]}
      />
      <PageHero imageId="section-selling-kitchen">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          Rhodes Ranch sellers · {siteContact.address.postalCode}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.25rem]">
          Sell your Rhodes Ranch home
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          Guard-gated Rhodes Ranch draws buyers who care about golf-course views, recreation access,
          and southwest Las Vegas convenience—but automated estimates rarely capture how your
          section compares to recent closings. <strong>{siteContact.agentName}</strong> (
          {siteContact.agentTitle}) builds a listing plan around accurate pricing, thoughtful
          preparation, MLS-backed marketing, and steady negotiation through closing.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#schedule-listing-consultation"
            className="rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-950/15 ring-1 ring-white/10 transition hover:bg-emerald-950"
          >
            Book a listing consultation
          </a>
          <a
            href={siteContact.phoneTelHref}
            className="rounded-full border border-emerald-900/30 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
          >
            Call {siteContact.phoneDisplay}
          </a>
          <Link
            href="/rhodes-ranch-las-vegas"
            className="rounded-full border border-stone-300/90 bg-white/90 px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm backdrop-blur hover:border-stone-400"
          >
            Rhodes Ranch real estate hub
          </Link>
        </div>
        <GbpActionBar />
      </PageHero>

      <section className="mt-14 space-y-8 text-stone-700">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-emerald-950">
            A clear listing approach for Rhodes Ranch
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed">
            Every sale starts with the same questions: what closed nearby, what buyers are touring this
            month, and how your home presents on day one. Dr. Jan Duffy keeps the process
            straightforward—no pressure to list before you are ready.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm">
            <h3 className="font-display text-lg font-semibold text-emerald-950">Pricing</h3>
            <p className="mt-3 text-sm leading-relaxed">
              Compare your home to recent sales in Rhodes Ranch and adjacent Spring Valley sections.
              We discuss timing, carry costs, and how showing feedback should adjust strategy.
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm">
            <h3 className="font-display text-lg font-semibold text-emerald-950">Preparation</h3>
            <p className="mt-3 text-sm leading-relaxed">
              Prioritize repairs, decluttering, and photography that help buyers understand flow and
              upgrades—especially when golf or guard-gate access is part of the story.
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm">
            <h3 className="font-display text-lg font-semibold text-emerald-950">Marketing</h3>
            <p className="mt-3 text-sm leading-relaxed">
              MLS syndication, professional media, and outreach to active southwest Las Vegas
              buyers—including relocations from California and other states.
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm">
            <h3 className="font-display text-lg font-semibold text-emerald-950">Negotiation</h3>
            <p className="mt-3 text-sm leading-relaxed">
              Offer review, inspection timelines, and appraisal conversations with plain-language
              updates. {siteContact.legalBrokerage} transaction staff support paperwork through
              closing.
            </p>
          </div>
        </div>
        <SectionFigure
          imageId="section-selling-kitchen"
          caption="Listing consultation for Rhodes Ranch sellers"
        />
      </section>

      <section
        id="schedule-listing-consultation"
        className="mt-14 scroll-mt-24 rounded-2xl border border-stone-200/90 bg-gradient-to-br from-white via-white to-emerald-50/40 p-6 shadow-[0_8px_30px_rgb(0_0_0_/0.06)] ring-1 ring-stone-900/5 sm:p-8"
        aria-labelledby="listing-consult-heading"
      >
        <h2
          id="listing-consult-heading"
          className="font-display text-2xl font-semibold tracking-tight text-emerald-950"
        >
          Schedule your Rhodes Ranch listing consultation
        </h2>
        <p className="mt-3 max-w-2xl text-stone-700">
          Pick a time that works for you. Bring your target move date, recent upgrades, and any
          questions about buying another home in the same chapter—we will outline next steps on the
          call.
        </p>
        <CalendlyInline className="mt-6" />
      </section>

      <section className="mt-14 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FaqSection
            heading="Rhodes Ranch seller questions"
            items={sellerFaq}
            id="seller-faq"
          />
        </div>
        <NapBlock />
      </section>

      <p className="mt-10 text-xs leading-relaxed text-stone-500">
        {siteContact.agentName}, {siteContact.license}. {siteContact.legalBrokerage}. Information
        about homes for sale is deemed reliable but not guaranteed. IDX listing data and disclaimers
        appear with MLS search tools where provided.
      </p>
    </main>
  );
}
