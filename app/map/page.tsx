import Link from "next/link";
import type { Metadata } from "next";
import { GbpActionBar } from "@/components/gbp/GbpActionBar";
import { PageHero } from "@/components/media/PageHero";
import { SectionFigure } from "@/components/media/SectionFigure";
import { NapBlock } from "@/components/sections/NapBlock";
import { LocalExploreNav } from "@/components/seo/LocalExploreNav";
import { GoogleSearchShareLink } from "@/components/seo/GoogleSearchShareLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { metaAddressOnly, pageSocialMetadata } from "@/lib/metadata";
import { breadcrumbListJsonLd, webPageJsonLd } from "@/lib/schema";
import { publicEnv } from "@/lib/env";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Rhodes Ranch and Spring Valley Area Map | Las Vegas 89148",
  description: `Interactive map of Rhodes Ranch and Spring Valley (${siteContact.address.postalCode})—orientation for buyers and sellers. ${metaAddressOnly} ${siteContact.agentName}, ${siteContact.agentTitle}. ${siteContact.legalBrokerage}.`,
  alternates: { canonical: "/map" },
  ...pageSocialMetadata("/map", {
    title: "Rhodes Ranch and Spring Valley map | Las Vegas 89148",
    description: `Community map for 89148. ${metaAddressOnly}`,
  }),
};

export default function MapPage() {
  const embedSrc = publicEnv.rhodesRanchAreaMapEmbedUrl;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Area map", path: "/map" },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          path: "/map",
          name: "Rhodes Ranch and Spring Valley area map",
          description: `Community orientation map for ${siteContact.address.postalCode}, Rhodes Ranch, and Spring Valley. ${metaAddressOnly}`,
        })}
      />
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Area map", path: "/map" },
        ]}
      />
      <PageHero imageId="hero-aerial-map">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          Area guide · {siteContact.address.postalCode}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.25rem]">
          Rhodes Ranch and Spring Valley area map
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">
          Use the embedded Google Map to orient to Rhodes Ranch, Spring Valley, and southwest Las
          Vegas. For homes, tours, or pricing,{" "}
          <Link href="/search" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
            search homes for sale
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
            contact {siteContact.agentName} or {siteContact.secondaryContactName}
          </Link>
          . For the Google Search view of &ldquo;Rhodes Ranch Las Vegas,&rdquo; open{" "}
          <GoogleSearchShareLink className="font-medium text-emerald-900 underline-offset-2 hover:underline" />
          .
        </p>
        <GbpActionBar />
      </PageHero>

      <section
        className="mt-10 overflow-hidden rounded-2xl border border-emerald-900/15 bg-white shadow-sm"
        aria-labelledby="area-map-heading"
      >
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2
              id="area-map-heading"
              className="font-display text-2xl font-semibold tracking-tight text-emerald-950"
            >
              Interactive Google Map of Rhodes Ranch and Spring Valley
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              Use the map to orient to {siteContact.address.postalCode}, then call{" "}
              {siteContact.phoneDisplay} for a tour that starts from {siteContact.fullAddressLine}.
            </p>
          </div>
          <SectionFigure
            imageId="section-interactive-map"
            caption="Interactive Google Map of Rhodes Ranch and Spring Valley"
          />
        </div>
        <div className="relative aspect-4/3 w-full min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]">
          <iframe
            title="Map of Rhodes Ranch, Spring Valley, Nevada"
            src={embedSrc}
            width={600}
            height={450}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <p className="mt-6 text-sm text-stone-600">
        Map data © Google. Boundaries and labels are for orientation only; verify schools, HOA, and
        parcel lines with official sources.
      </p>

      <LocalExploreNav currentPath="/map" className="mt-12" />

      <div className="mt-10 max-w-2xl">
        <NapBlock />
      </div>
    </main>
  );
}
