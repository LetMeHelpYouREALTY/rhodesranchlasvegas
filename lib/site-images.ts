/**
 * Heading-matched photography catalog for GBP / Maps / Search engagement.
 * File stems match Cloudflare Images custom IDs and `public/images/{id}.webp`.
 */

export const SITE_IMAGES = {
  "hero-homes": {
    alt: "Aerial view of Rhodes Ranch Las Vegas homes around the golf course in Spring Valley 89148",
    width: 1280,
    height: 720,
    heading: "Rhodes Ranch Las Vegas Homes",
  },
  "hero-buyers": {
    alt: "Southwest Las Vegas home exterior with desert landscaping near Rhodes Ranch 89148",
    width: 1280,
    height: 720,
    heading: "Buy a home in Rhodes Ranch Las Vegas",
  },
  "hero-golf": {
    alt: "Rhodes Ranch Golf Club fairways and desert mountains in southwest Las Vegas",
    width: 1280,
    height: 720,
    heading: "Living in Rhodes Ranch: Golf and the Club",
  },
  "hero-pool": {
    alt: "Resort-style backyard pool at a Rhodes Ranch Las Vegas home in 89148",
    width: 1280,
    height: 720,
    heading: "Rhodes Ranch Pool Homes for Sale",
  },
  "hero-starter-home": {
    alt: "Single-family stucco home in southwest Las Vegas near Rhodes Ranch, listed in a lower price band",
    width: 1280,
    height: 720,
    heading: "Rhodes Ranch Homes Under $500k",
  },
  "hero-new-listing": {
    alt: "Newly listed Las Vegas home at dusk with warm interior lights in a golf community",
    width: 1280,
    height: 720,
    heading: "Rhodes Ranch New Listings",
  },
  "hero-living-room": {
    alt: "Luxury living room with golf-course views in a Rhodes Ranch Las Vegas home",
    width: 1280,
    height: 720,
    heading: "Rhodes Ranch MLS Listings and Homes for Sale",
  },
  "hero-open-house": {
    alt: "Open house entry at a southwest Las Vegas home in the Rhodes Ranch area",
    width: 1280,
    height: 720,
    heading: "Rhodes Ranch and Las Vegas open houses by day",
  },
  "hero-office": {
    alt: "Berkshire Hathaway HomeServices Nevada Properties office exterior at 7272 S El Capitan Way, Las Vegas",
    width: 1280,
    height: 720,
    heading: "Office and contact",
  },
  "hero-aerial-map": {
    alt: "Aerial orientation of Rhodes Ranch and Spring Valley in southwest Las Vegas 89148",
    width: 1280,
    height: 720,
    heading: "Rhodes Ranch and Spring Valley area map",
  },
  "hero-consultation": {
    alt: "Real estate consultation table with neighborhood map at the Rhodes Ranch Las Vegas office",
    width: 1280,
    height: 720,
    heading: "Contact the Rhodes Ranch Las Vegas team",
  },
  "section-rec": {
    alt: "Rhodes Ranch recreation center lobby with fitness spaces and desert light",
    width: 1152,
    height: 864,
    heading: "Recreation Center and Indoor Amenities",
  },
  "section-trails": {
    alt: "Walking path through Rhodes Ranch with golf fairways and desert mountains",
    width: 1152,
    height: 864,
    heading: "Outdoor amenities and nearby open space",
  },
  "section-selling-kitchen": {
    alt: "Staged chef kitchen prepared for a Rhodes Ranch Las Vegas listing",
    width: 1152,
    height: 864,
    heading: "Thinking about selling in Rhodes Ranch?",
  },
  "section-keys-closing": {
    alt: "House keys on a counter at closing for a Las Vegas home purchase",
    width: 1152,
    height: 864,
    heading: "From search to keys: what Las Vegas buyers typically do",
  },
  "og-share": {
    alt: "Rhodes Ranch Las Vegas golf community aerial for social sharing",
    width: 1280,
    height: 720,
    heading: "Rhodes Ranch Las Vegas",
  },
} as const;

export type SiteImageId = keyof typeof SITE_IMAGES;

export const SITE_IMAGE_IDS = Object.keys(SITE_IMAGES) as SiteImageId[];

/** Hero photograph for each indexable route (used by sitemap + Open Graph). */
export const ROUTE_HERO_IMAGE = {
  "/": "hero-homes",
  "/buyers": "hero-buyers",
  "/buyers/process": "section-keys-closing",
  "/rhodes-ranch-las-vegas": "hero-homes",
  "/rhodes-ranch-lifestyle": "hero-golf",
  "/rhodes-ranch-mls-listings": "hero-living-room",
  "/rhodes-ranch-new-listings": "hero-new-listing",
  "/rhodes-ranch-homes-under-500k": "hero-starter-home",
  "/rhodes-ranch-pool-homes": "hero-pool",
  "/search": "hero-living-room",
  "/open-houses": "hero-open-house",
  "/map": "hero-aerial-map",
  "/locations": "hero-office",
  "/contact": "hero-consultation",
  "/questions": "hero-consultation",
} as const satisfies Record<string, SiteImageId>;

export type HeroRoutePath = keyof typeof ROUTE_HERO_IMAGE;

export function isHeroRoutePath(path: string): path is HeroRoutePath {
  return path in ROUTE_HERO_IMAGE;
}

export function heroImageIdForPath(path: string): SiteImageId {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized.startsWith("/open-houses/")) return "hero-open-house";
  if (isHeroRoutePath(normalized)) return ROUTE_HERO_IMAGE[normalized];
  return "hero-homes";
}
