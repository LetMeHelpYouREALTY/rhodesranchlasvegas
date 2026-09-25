import Link from "next/link";
import type { Metadata } from "next";
import { GbpActionBar } from "@/components/gbp/GbpActionBar";
import { PageHero } from "@/components/media/PageHero";
import { LocalExploreNav } from "@/components/seo/LocalExploreNav";
import { GoogleSearchShareLink } from "@/components/seo/GoogleSearchShareLink";
import { NapBlock } from "@/components/sections/NapBlock";
import { FaqSection } from "@/components/sections/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { aeoFaq } from "@/lib/faq-aeo";
import { defaultMetadata, metaDescriptionTail, pageSocialMetadata } from "@/lib/metadata";
import { breadcrumbListJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Rhodes Ranch and Las Vegas Real Estate Q&A",
  description: `Straight answers about Rhodes Ranch (89148), ${siteContact.agentName}, ${siteContact.secondaryContactName}, home search, open houses, and southwest Las Vegas. ${metaDescriptionTail}`,
  alternates: { canonical: "/questions" },
  ...pageSocialMetadata("/questions", {
    title: "Rhodes Ranch and Las Vegas | Real estate Q&A",
    description: `Straight answers for buyers and sellers in ${siteContact.serviceAreaDescription}. Contact details on this page.`,
  }),
};

export default function QuestionsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Q&A", path: "/questions" },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          path: "/questions",
          name: "Rhodes Ranch and Las Vegas real estate Q&A",
          description: `Answers for buyers and sellers in ${siteContact.serviceAreaDescription}.`,
        })}
      />
      <JsonLd data={faqPageJsonLd(aeoFaq)} />
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Q&A", path: "/questions" },
        ]}
      />
      <PageHero imageId="hero-questions">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          Q&amp;A · {siteContact.address.postalCode}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.25rem]">
          Rhodes Ranch and Las Vegas real estate Q&amp;A
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          Short, direct answers to common questions about our team, Rhodes Ranch, home search, open
          houses, and southwest Las Vegas—so you can decide what to read next or{" "}
          <Link href="/contact" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
            contact the office
          </Link>{" "}
          with specifics. Office phone and address are listed below. To see Google&apos;s search
          results for the community alongside your research, open{" "}
          <GoogleSearchShareLink />.
        </p>
        <GbpActionBar />
      </PageHero>

      <div className="mt-14">
        <FaqSection
          id="questions-faq-heading"
          titleLevel={2}
          heading="Questions and answers"
          items={aeoFaq}
          imageId="section-qa-answers"
        />
      </div>

      <LocalExploreNav currentPath="/questions" className="mt-14" />

      <div className="mt-14">
        <NapBlock />
      </div>
    </main>
  );
}
