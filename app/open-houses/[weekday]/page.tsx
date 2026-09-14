import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GbpActionBar } from "@/components/gbp/GbpActionBar";
import { PageHero } from "@/components/media/PageHero";
import { LocalExploreNav } from "@/components/seo/LocalExploreNav";
import { RealScoutLeadSection } from "@/components/realscout/RealScoutLeadSection";
import { NapBlock } from "@/components/sections/NapBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { defaultMetadata, metaDescriptionTail, pageSocialMetadata } from "@/lib/metadata";
import { breadcrumbListJsonLd, webPageJsonLd } from "@/lib/schema";
import {
  type WeekdaySlug,
  WEEKDAY_SLUGS,
  isWeekdaySlug,
  weekdayMeta,
} from "@/lib/open-houses-weekdays";
import { siteContact } from "@/lib/site-contact";

type PageProps = {
  params: Promise<{ weekday: string }>;
};

export function generateStaticParams(): { weekday: WeekdaySlug }[] {
  return WEEKDAY_SLUGS.map((weekday) => ({ weekday }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { weekday: raw } = await params;
  if (!isWeekdaySlug(raw)) {
    return { title: "Open houses" };
  }
  const { label, title } = weekdayMeta[raw];
  return {
    ...defaultMetadata,
    title: `${label} Open Houses | Rhodes Ranch and Las Vegas 89148`,
    description: `${title} — MLS open house search, map on the open houses hub, and ${siteContact.secondaryContactName} (${siteContact.secondaryContactTitle}). ${metaDescriptionTail}`,
    alternates: { canonical: `/open-houses/${raw}` },
    ...pageSocialMetadata(`/open-houses/${raw}`, {
      title: `${label} open houses | Las Vegas`,
      description: `Plan ${label} tours in ${siteContact.address.postalCode} and southwest Las Vegas. Open house listings below.`,
    }),
  };
}

export default async function OpenHousesWeekdayPage({ params }: PageProps) {
  const { weekday: raw } = await params;
  if (!isWeekdaySlug(raw)) notFound();

  const { label, intro, title } = weekdayMeta[raw];

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Open houses", path: "/open-houses" },
          { name: `${label} open houses`, path: `/open-houses/${raw}` },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          path: `/open-houses/${raw}`,
          name: title,
          description: intro.length > 300 ? `${intro.slice(0, 297).trim()}…` : intro,
        })}
      />
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Open houses", path: "/open-houses" },
          { name: `${label} open houses`, path: `/open-houses/${raw}` },
        ]}
      />

      <PageHero imageId="hero-open-house">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/85">
          {label} · {siteContact.address.postalCode}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.12] tracking-tight text-emerald-950 sm:text-[2.25rem]">
          {title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-700">{intro}</p>
        <p className="mt-4 text-sm text-stone-600">
          <Link href="/open-houses" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
            Weekend open house map and all days
          </Link>
          {" · "}
          <Link href="/contact#schedule" className="font-medium text-emerald-900 underline-offset-2 hover:underline">
            Schedule a private tour
          </Link>
        </p>
        <GbpActionBar />
      </PageHero>

      <RealScoutLeadSection
        className="mt-10"
        titleElement="h2"
        variant="openHouses"
        heading={`Open house listings — ${label}`}
        headingId={`open-house-${raw}-listings-heading`}
        listingIntro={`Broker open house search for ${label}—confirm date and time on each listing card, then use the hub map when you plan multiple stops across ${siteContact.address.postalCode}.`}
      />

      <LocalExploreNav currentPath={`/open-houses/${raw}`} className="mt-14" />

      <div className="mt-14">
        <NapBlock />
      </div>
    </main>
  );
}
