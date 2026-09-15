import type { Metadata } from "next";
import { siteImageAbsoluteUrl } from "@/lib/cloudflare-images";
import { publicEnv } from "@/lib/env";
import { heroImageIdForPath, SITE_IMAGES, type SiteImageId } from "@/lib/site-images";
import { siteContact } from "@/lib/site-contact";

const baseUrl = new URL(siteContact.siteUrl);

/** Address + brokerage for meta descriptions (avoids repeating stiff “Office:” in every snippet). */
export const metaDescriptionTail = `${siteContact.fullAddressLine}. ${siteContact.legalBrokerage}.`;

/** Single-line address with period (when brokerage is already mentioned in the same sentence). */
export const metaAddressOnly = `${siteContact.fullAddressLine}.`;

export const defaultMetadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    /** Business name already includes “Homes by Dr. Jan Duffy”; avoid repeating the agent in the root title. */
    default: `${siteContact.businessName} | REALTOR®`,
    /** Child routes: page title + short brand (keeps SERP titles under typical truncation). */
    template: `%s | ${siteContact.siteBrandShort}`,
  },
  description: (() => {
    const lead = publicEnv.gbpBusinessDescription
      .split(/(?<=[.!?])\s+/)
      .slice(0, 2)
      .join(" ")
      .trim();
    const tail = `${siteContact.agentName} (${siteContact.agentTitle}). ${metaDescriptionTail}`;
    const combined = `${lead} ${tail}`;
    const max = 320;
    return combined.length <= max ? combined : `${combined.slice(0, max - 1).trim()}…`;
  })(),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(publicEnv.googleSiteVerification || publicEnv.bingSiteVerification
    ? {
        verification: {
          ...(publicEnv.googleSiteVerification
            ? { google: publicEnv.googleSiteVerification }
            : {}),
          ...(publicEnv.bingSiteVerification
            ? { other: { "msvalidate.01": publicEnv.bingSiteVerification } }
            : {}),
        },
      }
    : {}),
  /** Legacy geo hints for local crawlers; NAP + JSON-LD remain primary for GBP alignment. */
  other: {
    "geo.region": `US-${siteContact.address.addressRegion}`,
    "geo.placename": siteContact.address.addressLocality,
    "geo.position": `${siteContact.geo.latitude};${siteContact.geo.longitude}`,
    ICBM: `${siteContact.geo.latitude}, ${siteContact.geo.longitude}`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    /** Resolved against `metadataBase` — homepage; child routes must override via `openGraphForCanonicalPath`. */
    url: "/",
    siteName: siteContact.businessName,
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${siteContact.businessName} — ${siteContact.agentName}, Rhodes Ranch and Las Vegas 89148`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteContact.businessName} | REALTOR®`,
    description: `Rhodes Ranch and Las Vegas 89148 real estate with ${siteContact.agentName}. ${metaAddressOnly}`,
    images: ["/og-default.jpg"],
  },
};

/**
 * Open Graph `url` must match the page canonical (path form; `metadataBase` makes it absolute).
 * Use whenever a route overrides `openGraph` so shares and GSC see the correct URL.
 */
export function openGraphForCanonicalPath(
  canonicalPath: string,
  patch: Partial<NonNullable<Metadata["openGraph"]>> = {},
): NonNullable<Metadata["openGraph"]> {
  const baseOg = defaultMetadata.openGraph;
  return {
    ...(typeof baseOg === "object" && baseOg !== null ? baseOg : {}),
    url: canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`,
    ...patch,
  } as NonNullable<Metadata["openGraph"]>;
}

/** Twitter/X card — merge with site defaults (large image, default art). */
export function twitterCardForPage(
  patch: Partial<NonNullable<Metadata["twitter"]>> = {},
): NonNullable<Metadata["twitter"]> {
  const tw = defaultMetadata.twitter;
  return {
    ...(typeof tw === "object" && tw !== null ? tw : {}),
    ...patch,
  } as NonNullable<Metadata["twitter"]>;
}

/**
 * Per-route Open Graph + Twitter using the same title/description (canonical `og:url` + aligned cards).
 */
export function pageSocialMetadata(
  canonicalPath: string,
  opts: { title: string; description: string; imageId?: SiteImageId },
): Pick<Metadata, "openGraph" | "twitter"> {
  const imageId = opts.imageId ?? heroImageIdForPath(canonicalPath);
  const meta = SITE_IMAGES[imageId];
  const image = {
    url: siteImageAbsoluteUrl(imageId),
    width: meta.width,
    height: meta.height,
    alt: meta.alt,
  };
  return {
    openGraph: openGraphForCanonicalPath(canonicalPath, {
      title: opts.title,
      description: opts.description,
      images: [image],
    }),
    twitter: twitterCardForPage({
      title: opts.title,
      description: opts.description,
      images: [image.url],
    }),
  };
}
