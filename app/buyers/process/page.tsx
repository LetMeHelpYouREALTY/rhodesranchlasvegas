import Link from "next/link";
import type { Metadata } from "next";
import { GbpActionBar } from "@/components/gbp/GbpActionBar";
import { PageHero } from "@/components/media/PageHero";
import { SectionFigure } from "@/components/media/SectionFigure";
import { LocalExploreNav } from "@/components/seo/LocalExploreNav";
import { RealScoutLeadSection } from "@/components/realscout/RealScoutLeadSection";
import { BuyerCtaStrip } from "@/components/buyers/BuyerCtaStrip";
import { NapBlock } from "@/components/sections/NapBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { defaultMetadata, metaAddressOnly, pageSocialMetadata } from "@/lib/metadata";
import { breadcrumbListJsonLd, webPageJsonLd } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Las Vegas Home Buying Process | Rhodes Ranch Buyers",
  description: `Overview of the Las Vegas area home purchase flow for Rhodes Ranch buyers: search, offer, escrow, and closing—with ${siteContact.secondaryContactName}, ${siteContact.secondaryContactTitle}. ${metaAddressOnly} Not legal or tax advice.`,
  alternates: { canonical: "/buyers/process" },
  ...pageSocialMetadata("/buyers/process", {
    title: "Las Vegas Home Buying Process",
    description: `Search through closing with ${siteContact.secondaryContactName} (${siteContact.secondaryContactTitle}). ${metaAddressOnly} Educational overview only.`,
  }),
};

export default function BuyersProcessPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Buyers", path: "/buyers" },
          { name: "Buying process", path: "/buyers/process" },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          path: "/buyers/process",
          name: "Las Vegas home buying process",
          description: `Educational overview for Rhodes Ranch buyers: search through closing with ${siteContact.secondaryContactName}. Not legal or tax advice.`,
        })}
      />
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Buyers", path: "/buyers" },
          { name: "Buying process", path: "/buyers/process" },
        ]}
      />
      <PageHero imageId="section-keys-closing">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          Buyers · Process overview
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.25rem]">
          From search to keys: what Las Vegas buyers typically do
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          This page is an educational overview for Rhodes Ranch and Las Vegas area buyers. Timelines
          vary by lender, property type, and contract. For legal or tax questions, consult a qualified
          Nevada attorney or CPA.
        </p>
        <div className="mt-6">
          <BuyerCtaStrip />
        </div>
        <GbpActionBar />
      </PageHero>

      <RealScoutLeadSection
        className="mt-10"
        listingIntro="Browse current listings while you learn the purchase timeline—pause on any step to talk with your buyer specialist or schedule a call."
      />

      <section
        className="mt-12 text-slate-700"
        aria-labelledby="key-phases-heading"
      >
        <h2
          id="key-phases-heading"
          className="text-2xl font-semibold text-emerald-950"
        >
          Key phases: from pre-approval to keys
        </h2>
        <SectionFigure
          imageId="section-preapproval"
          caption="Key phases: from pre-approval to keys"
          className="mt-4 max-w-xl"
        />
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Timelines and details vary by lender, property, and contract—this is a general outline.
        </p>
        <div className="mt-8 space-y-10">
          <section className="grid gap-4 sm:grid-cols-2 sm:items-center">
            <div>
            <h3 className="text-xl font-semibold text-emerald-950">1. Budget and pre-approval</h3>
            <p className="mt-3 leading-relaxed">
              Meet with a mortgage loan officer for pre-approval. That sets your price range and
              helps you act quickly when the right Rhodes Ranch Las Vegas home lists.
            </p>
            </div>
            <SectionFigure imageId="section-preapproval" caption="1. Budget and pre-approval" />
          </section>
          <section className="grid gap-4 sm:grid-cols-2 sm:items-center">
            <div>
            <h3 className="text-xl font-semibold text-emerald-950">2. Search and shortlist</h3>
            <p className="mt-3 leading-relaxed">
              Use the{" "}
              <Link
                href="/search"
                className="font-medium text-emerald-900 underline-offset-2 hover:underline"
              >
                Home search
              </Link>{" "}
              to track new inventory. Save favorites and note questions about HOA documents, golf
              membership, or community rules—we help you request disclosures through normal channels.
            </p>
            </div>
            <SectionFigure imageId="section-search-shortlist" caption="2. Search and shortlist" />
          </section>
          <section className="grid gap-4 sm:grid-cols-2 sm:items-center">
            <div>
            <h3 className="text-xl font-semibold text-emerald-950">3. Tours and due diligence</h3>
            <p className="mt-3 leading-relaxed">
              We schedule showings that comply with guard-gated access. For condition and systems,
              rely on licensed inspectors and seller disclosures—not guesswork.
            </p>
            </div>
            <SectionFigure imageId="section-due-diligence" caption="3. Tours and due diligence" />
          </section>
          <section className="grid gap-4 sm:grid-cols-2 sm:items-center">
            <div>
            <h3 className="text-xl font-semibold text-emerald-950">4. Offer and contract</h3>
            <p className="mt-3 leading-relaxed">
              Offers include price, earnest money, contingencies, and timelines. We explain common
              Las Vegas purchase agreement concepts in plain language; your decisions drive terms.
            </p>
            </div>
            <SectionFigure imageId="section-offer-contract" caption="4. Offer and contract" />
          </section>
          <section className="grid gap-4 sm:grid-cols-2 sm:items-center">
            <div>
            <h3 className="text-xl font-semibold text-emerald-950">5. Escrow and closing</h3>
            <p className="mt-3 leading-relaxed">
              Title and escrow coordinate signatures, payoffs, and recording. Your lender funds the
              loan when conditions are cleared. Closing day ends with keys when the transaction is
              funded and recorded—your escrow officer confirms details.
            </p>
            </div>
            <SectionFigure imageId="section-keys-closing" caption="5. Escrow and closing" />
          </section>
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-emerald-900/15 bg-emerald-50/50 p-6">
        <h3 className="text-lg font-semibold text-emerald-950">Work with our buyer specialist</h3>
        <SectionFigure
          imageId="hero-consultation"
          caption="Work with our buyer specialist"
          className="mt-4 max-w-xl"
        />
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          {siteContact.secondaryContactName}, {siteContact.secondaryContactTitle}, supports buyers
          touring and purchasing in {siteContact.serviceAreaDescription}.
        </p>
        <div className="mt-4">
          <BuyerCtaStrip />
        </div>
        <p className="mt-4 text-sm">
          <Link href="/buyers" className="font-medium text-emerald-900 hover:underline">
            Back to buyer hub
          </Link>
        </p>
      </section>

      <LocalExploreNav currentPath="/buyers/process" className="mt-14" />

      <div className="mt-14">
        <NapBlock />
      </div>
    </main>
  );
}
