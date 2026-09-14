/**
 * Cloudflare Images is the primary public CDN. Git copies in `public/images/` are the backup
 * (and the source for `scripts/upload-cloudflare-images.mjs`).
 *
 * Delivery uses imagedelivery.net — not Cloudflare orange-cloud proxy in front of Vercel.
 * @see https://developers.cloudflare.com/images/storage/upload-images/upload-custom-path/
 */

import { publicEnv } from "@/lib/env";

export const SITE_IMAGE_EXT = "webp" as const;

export function localSiteImagePath(id: string): string {
  return `/images/${id}.${SITE_IMAGE_EXT}`;
}

export function cloudflareDeliveryUrl(id: string): string | undefined {
  const hash = publicEnv.cloudflareImagesAccountHash;
  if (!hash) return undefined;
  return `https://imagedelivery.net/${hash}/${id}/${publicEnv.cloudflareImagesVariant}`;
}

/** Public src for next/image: Cloudflare when configured, otherwise the git-backed file. */
export function siteImageSrc(id: string): string {
  return cloudflareDeliveryUrl(id) ?? localSiteImagePath(id);
}

/** Absolute URL for JSON-LD, sitemaps, and Open Graph. */
export function siteImageAbsoluteUrl(id: string): string {
  const remote = cloudflareDeliveryUrl(id);
  if (remote) return remote;
  return `${publicEnv.siteUrl.replace(/\/$/, "")}${localSiteImagePath(id)}`;
}

export function isRemoteSiteImageSrc(src: string): boolean {
  return src.startsWith("https://");
}
