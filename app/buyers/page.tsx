import Link from "next/link";
import type { Metadata } from "next";
import { GbpActionBar } from "@/components/gbp/GbpActionBar";
import { PageHero } from "@/components/media/PageHero";
import { SectionFigure } from "@/components/media/SectionFigure";
import { RealScoutLeadSection } from "@/components/realscout/RealScoutLeadSection";
import { BuyerCtaStrip } from "@/components/buyers/BuyerCtaStrip";
import { LocalExploreNav } from "@/components/seo/LocalExploreNav";
import { GoogleSearchShareLink } from "@/components/seo/GoogleSearchShareLink";
import { NapBlock } from "@/components/sections/NapBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { FaqSection } from "@/components/sections/FaqSection";
import { buyerFaq } from "@/lib/faq-buyers";
import {
  defaultMetadata,
  metaAddressOnly,
  metaDescriptionTail,
  pageSocialMetadata,
} from "@/lib/metadata";
import { breadcrumbListJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Buy a Home in Rhodes Ranch Las Vegas | Buyer Guide",
  description: `Rhodes Ranch Las Vegas home buyers: work with ${siteContact.secondaryContactName}, ${siteContact.secondaryContactTitle}, and ${siteContact.agentName} for home search, showings, and offers in 89148. ${metaDescriptionTail}`,
  alternates: { canonical: "/buyers" },
  ...pageSocialMetadata("/buyers", {
    title: `Rhodes Ranch Buyers | ${siteContact.secondaryContactName}`,
    description: `Search homes, book tours, and get buyer guidance for Rhodes Ranch (89148). ${metaAddressOnly}`,
  }),
};

export default function BuyersPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Buyers", path: "/buyers" },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          path: "/buyers",
          name: "Buy a home in Rhodes Ranch Las Vegas",
          description: `Buyer guide for ${siteContact.serviceAreaDescription} with ${siteContact.secondaryContactName} and ${siteContact.agentName}.`,
        })}
      />
      <JsonLd data={faqPageJsonLd(buyerFaq)} />
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Buyers", path: "/buyers" },
        ]}
      />
      <PageHero imageId="hero-buyers">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          Home buyers · {siteContact.address.postalCode}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.25rem]">
          Buy a home in Rhodes Ranch Las Vegas
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          Whether you are relocating, upsizing, or buying your first Nevada home, our team focuses on
          Rhodes Ranch Las Vegas Homes and the surrounding southwest valley.{" "}
          <strong>{siteContact.secondaryContactName}</strong> is your{" "}
          {siteContact.secondaryContactTitle}; <strong>{siteContact.agentName}</strong> leads listing
          strategy when you also sell. For Google&apos;s search results on the neighborhood name, open{" "}
          <GoogleSearchShareLink className="font-medium text-emerald-900 underline-offset-2 hover:underline" />
          .
        </p>
        <div className="mt-6">
          <BuyerCtaStrip />
        </div>
        <GbpActionBar />
      </PageHero>

      <RealScoutLeadSection
        className="mt-10"
        listingIntro="Buyer-first home search: short-list homes in 89148 and nearby with your specialist, then book showings or compare notes with Dr. Jan Duffy when you are also selling."
      />

      <section className="mt-14 space-y-6 text-slate-700">
        <h2 className="text-2xl font-semibold text-emerald-950">
          Why Buyers Start Their Search Here
        </h2>
        <SectionFigure imageId="hero-golf" caption="Why Buyers Start Their Search Here" />
        <p className="leading-relaxed">
          Rhodes Ranch offers guard-gated neighborhoods, a Ted Robinson golf course, recreation, and
          quick access to shopping and major roads. When you are ready, we align home search filters
          with your budget, commute, and must-haves—then schedule tours that respect community access
          rules.
        </p>
        <BuyerCtaStrip />
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-emerald-950">Your Buyer Journey (Overview)</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2 md:items-start">
          <ol className="list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Finance first.</strong> Connect with a mortgage professional for pre-approval so
            you know your price range and loan options.
          </li>
          <li>
            <strong>Search and save.</strong> Use our{" "}
            <Link href="/search" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
              Home search
            </Link>{" "}
            for Rhodes Ranch Las Vegas area listings; ask us to refine results or set showings.
          </li>
          <li>
            <strong>Tour and offer.</strong> We coordinate gated access, review comps with you, and
            structure offers under your direction—not as legal or tax advice.
          </li>
          <li>
            <strong>Close with your partners.</strong> Your lender and title/escrow partners drive
            timelines and documents; we stay in sync through keys.
          </li>
          </ol>
          <SectionFigure
            imageId="section-keys-closing"
            caption="Your Buyer Journey (Overview)"
          />
        </div>
        <p className="mt-6">
          <Link
            href="/buyers/process"
            className="font-semibold text-emerald-900 underline-offset-2 hover:underline"
          >
            Read the step-by-step Las Vegas home buying overview
          </Link>
        </p>
      </section>

      <section className="mt-14 rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-emerald-950">
              Explore golf, recreation, and commute before you offer
            </h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Lifestyle, golf, and nearby attractions help you decide if Rhodes Ranch fits your daily
              life—not just the floor plan.
            </p>
            <Link
              href="/rhodes-ranch-lifestyle"
              className="mt-4 inline-flex font-semibold text-emerald-900 underline-offset-2 hover:underline"
            >
              Rhodes Ranch lifestyle and area highlights
            </Link>
          </div>
          <SectionFigure
            imageId="section-trails"
            caption="Explore golf, recreation, and commute before you offer"
          />
        </div>
      </section>

      <div className="mt-16">
        <FaqSection
          id="buyers-faq-heading"
          titleLevel={3}
          heading="Buyer FAQ"
          items={buyerFaq}
        />
      </div>

      <section className="mt-12 border-t border-emerald-900/10 pt-10">
        <h3 className="text-xl font-semibold text-emerald-950">Ready for the next step?</h3>
        <SectionFigure
          imageId="hero-consultation"
          caption="Ready for the next step?"
          className="mt-4 max-w-xl"
        />
        <p className="mt-2 text-slate-700">
          Tell us your timeline and must-haves—we will suggest a search plan and tour strategy for
          Rhodes Ranch Las Vegas homes.
        </p>
        <div className="mt-6">
          <BuyerCtaStrip />
        </div>
      </section>

      <LocalExploreNav currentPath="/buyers" className="mt-14" />

      <div className="mt-14">
        <NapBlock />
      </div>
    </main>
  );
}
