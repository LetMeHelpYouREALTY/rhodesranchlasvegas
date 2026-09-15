import { siteImageAbsoluteUrl } from "@/lib/cloudflare-images";
import { publicEnv } from "@/lib/env";
import { heroImageIdForPath, SITE_IMAGES, type SiteImageId } from "@/lib/site-images";
import { googleMapsProfileHref, siteContact } from "@/lib/site-contact";

const base = siteContact.siteUrl.replace(/\/$/, "");

const websiteDescription =
  publicEnv.gbpBusinessDescription.length > 500
    ? `${publicEnv.gbpBusinessDescription.slice(0, 497).trim()}…`
    : publicEnv.gbpBusinessDescription;

function imageObject(id: SiteImageId): Record<string, unknown> {
  const meta = SITE_IMAGES[id];
  const url = siteImageAbsoluteUrl(id);
  return {
    "@type": "ImageObject",
    url,
    contentUrl: url,
    width: meta.width,
    height: meta.height,
    caption: meta.heading,
    description: meta.alt,
  };
}

/** WebSite graph node — pairs with RealEstateAgent for Search Console + GBP entity consistency. */
export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    name: siteContact.businessName,
    url: base,
    description: websiteDescription,
    inLanguage: "en-US",
    publisher: { "@id": `${base}/#agent` },
    image: imageObject("og-share"),
  };
}

export function realEstateAgentJsonLd(): Record<string, unknown> {
  const openingHoursSpecification = siteContact.openingHoursSpecification.map(
    (row) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: row.days,
      opens: row.opens,
      closes: row.closes,
    }),
  );

  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": `${base}/#agent`,
    name: siteContact.agentName,
    image: [
      siteImageAbsoluteUrl("hero-office"),
      siteImageAbsoluteUrl("hero-homes"),
      siteImageAbsoluteUrl("hero-golf"),
    ],
    logo: imageObject("hero-office"),
    photo: [
      imageObject("hero-office"),
      imageObject("hero-homes"),
      imageObject("hero-golf"),
      imageObject("hero-pool"),
    ],
    hasMap: googleMapsProfileHref(),
    brand: {
      "@type": "Brand",
      name: siteContact.businessName,
    },
    jobTitle: siteContact.agentTitle,
    description: `${publicEnv.gbpBusinessDescription} ${siteContact.agentName} is the ${siteContact.agentTitle} (Nevada license ${siteContact.license}) with ${siteContact.legalBrokerage}. ${siteContact.fullAddressLine}.`,
    url: base,
    telephone: siteContact.phoneE164,
    email: siteContact.email,
    identifier: {
      "@type": "PropertyValue",
      name: "Nevada real estate license",
      value: siteContact.license,
    },
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteContact.address.streetAddress,
      addressLocality: siteContact.address.addressLocality,
      addressRegion: siteContact.address.addressRegion,
      postalCode: siteContact.address.postalCode,
      addressCountry: siteContact.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteContact.geo.latitude,
      longitude: siteContact.geo.longitude,
    },
    areaServed: {
      "@type": "Place",
      name: siteContact.serviceAreaDescription,
    },
    parentOrganization: {
      "@type": "Organization",
      name: siteContact.legalBrokerage,
    },
    openingHoursSpecification,
    openingHours: `Mo-Su ${publicEnv.officeWeekdayOpens}-${publicEnv.officeWeekdayCloses}`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteContact.phoneE164,
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: ["English"],
        hoursAvailable: openingHoursSpecification,
      },
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Buyer representation for Rhodes Ranch Las Vegas homes",
          areaServed: siteContact.serviceAreaDescription,
          provider: { "@id": `${base}/#agent` },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Private home tours in Rhodes Ranch and 89148",
          areaServed: siteContact.serviceAreaDescription,
          provider: { "@id": `${base}/#agent` },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Listing representation for Rhodes Ranch Las Vegas sellers",
          areaServed: siteContact.serviceAreaDescription,
          provider: { "@id": `${base}/#agent` },
        },
      },
    ],
    potentialAction: {
      "@type": "ScheduleAction",
      name: "Schedule a private conversation",
      target: {
        "@type": "EntryPoint",
        urlTemplate: publicEnv.calendlyEventUrl,
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
    },
    knowsAbout: [
      "Rhodes Ranch Las Vegas homes",
      "Rhodes Ranch Las Vegas",
      "Rhodes Ranch Golf Club",
      "89148 real estate",
      `${siteContact.address.streetAddress} ${siteContact.address.addressLocality}`,
      "Southwest Las Vegas homes",
      "Las Vegas open houses",
      "Rhodes Ranch open houses",
      ...(siteContact.gbpHighlightAttributesLine
        ? [
            "Women-owned real estate business Las Vegas",
            "Veteran-owned business Las Vegas",
          ]
        : []),
    ],
  };

  if (publicEnv.schemaSameAs.length > 0) {
    node.sameAs = [...publicEnv.schemaSameAs];
  }

  return node;
}

export type BreadcrumbCrumb = { name: string; path: string };

/** WebPage node — links to WebSite + agent for GBP / entity clarity (use on key landing URLs). */
export function webPageJsonLd(opts: {
  path: string;
  name: string;
  description: string;
  imageId?: SiteImageId;
}): Record<string, unknown> {
  const p = opts.path.startsWith("/") ? opts.path : `/${opts.path}`;
  const pageUrl = `${base}${p}`;
  const imageId = opts.imageId ?? heroImageIdForPath(p);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": `${base}/#website` },
    about: { "@id": `${base}/#agent` },
    primaryImageOfPage: imageObject(imageId),
    image: imageObject(imageId),
    inLanguage: "en-US",
  };
}

/** BreadcrumbList JSON-LD — match visible breadcrumbs; helps GSC rich results. */
export function breadcrumbListJsonLd(crumbs: BreadcrumbCrumb[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${base}${c.path.startsWith("/") ? c.path : `/${c.path}`}`,
    })),
  };
}

export type FaqItem = { question: string; answer: string };

export function faqPageJsonLd(items: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
