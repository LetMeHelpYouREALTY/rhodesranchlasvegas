/**
 * Rhodes Ranch community anchor for amenity maps and hyperlocal copy.
 * Center: Google Maps place centroid for "Rhodes Ranch, Spring Valley, NV" (matches site area-map embed in lib/env.ts).
 * Golf clubhouse: rhodesranchgolf.com — 20 E Rhodes Ranch Pkwy, Las Vegas, NV 89148.
 */
export const rhodesRanchCommunity = {
  name: "Rhodes Ranch",
  city: "Las Vegas",
  locality: "Spring Valley",
  region: "NV",
  postalCode: "89148",
  center: {
    latitude: 36.0692914,
    longitude: -115.296913,
  },
  /** Human-readable center source for PR / docs */
  centerSource:
    'Google Maps place "Rhodes Ranch, Spring Valley, NV" (same centroid as the site’s /map embed default).',
  fullLabel: "Rhodes Ranch, Spring Valley, Las Vegas",
} as const;

export type AmenityCategoryId =
  | "golf"
  | "parks"
  | "grocery"
  | "restaurants"
  | "cafes"
  | "healthcare"
  | "pharmacies"
  | "shopping"
  | "fitness"
  | "schools"
  | "parking";

export type AmenityCategory = {
  id: AmenityCategoryId;
  label: string;
  /** Places API (New) `includedPrimaryTypes` — all types in one searchNearby call */
  primaryTypes: string[];
  ariaLabel: string;
};

/** Category order tuned for guard-gated golf master-planned community (schools included). */
export const amenityCategories: AmenityCategory[] = [
  {
    id: "golf",
    label: "Golf",
    primaryTypes: ["golf_course"],
    ariaLabel: "Show golf courses near Rhodes Ranch",
  },
  {
    id: "parks",
    label: "Parks",
    primaryTypes: ["park"],
    ariaLabel: "Show parks near Rhodes Ranch",
  },
  {
    id: "grocery",
    label: "Grocery",
    primaryTypes: ["grocery_store", "supermarket"],
    ariaLabel: "Show grocery stores near Rhodes Ranch",
  },
  {
    id: "restaurants",
    label: "Restaurants",
    primaryTypes: ["restaurant"],
    ariaLabel: "Show restaurants near Rhodes Ranch",
  },
  {
    id: "cafes",
    label: "Cafes",
    primaryTypes: ["cafe"],
    ariaLabel: "Show cafes near Rhodes Ranch",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    primaryTypes: ["hospital", "doctor"],
    ariaLabel: "Show hospitals and doctors near Rhodes Ranch",
  },
  {
    id: "pharmacies",
    label: "Pharmacies",
    primaryTypes: ["pharmacy"],
    ariaLabel: "Show pharmacies near Rhodes Ranch",
  },
  {
    id: "shopping",
    label: "Shopping",
    primaryTypes: ["shopping_mall"],
    ariaLabel: "Show shopping near Rhodes Ranch",
  },
  {
    id: "fitness",
    label: "Fitness",
    primaryTypes: ["gym"],
    ariaLabel: "Show gyms and fitness near Rhodes Ranch",
  },
  {
    id: "schools",
    label: "Schools",
    primaryTypes: ["school"],
    ariaLabel: "Show schools near Rhodes Ranch",
  },
  {
    id: "parking",
    label: "Parking",
    primaryTypes: ["parking"],
    ariaLabel: "Show parking near Rhodes Ranch",
  },
];

export type CuratedAmenity = {
  name: string;
  category: AmenityCategoryId;
  /** schema.org @type */
  schemaType: string;
  /** Official business or agency page used to verify name and address */
  sourceUrl: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  note?: string;
};

/**
 * Verified anchors for fallback map list, on-page copy, and ItemList JSON-LD.
 * Omit ratings, distances, and hours unless sourced on an official site.
 */
export const curatedAmenities: CuratedAmenity[] = [
  {
    name: "Rhodes Ranch Golf Club",
    category: "golf",
    schemaType: "GolfCourse",
    sourceUrl: "https://rhodesranchgolf.com/",
    streetAddress: "20 E Rhodes Ranch Pkwy",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89148",
    note: "Ted Robinson design; tee times and clubhouse details on the club’s official site.",
  },
  {
    name: "Smith's Food and Drug",
    category: "grocery",
    schemaType: "GroceryStore",
    sourceUrl:
      "https://www.smithsfoodanddrug.com/stores/grocery/nv/las-vegas/w-warm-springs-rd-and-s-durango-dr/706/00315",
    streetAddress: "8525 W Warm Springs Rd",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89113",
    note: "Full-service grocery at the Warm Springs corridor near Rhodes Ranch.",
  },
  {
    name: "St. Rose Dominican Hospital — San Martín Campus",
    category: "healthcare",
    schemaType: "Hospital",
    sourceUrl:
      "https://locations.dignityhealth.org/dignity-health-st-rose-dominican-hospital-san-martin-campus-las-",
    streetAddress: "8280 W Warm Springs Rd",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89113",
  },
  {
    name: "Red Ridge Park",
    category: "parks",
    schemaType: "Park",
    sourceUrl: "https://parkslocator.clarkcountynv.gov/Search/ParkDetail?parkId=75",
    streetAddress: "7027 S El Capitan Way",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89148",
    note: "Clark County park with splash pad, disc golf, and ball fields.",
  },
  {
    name: "Cowabunga Canyon Waterpark",
    category: "parks",
    schemaType: "AmusementPark",
    sourceUrl: "https://cowabungavegas.com/canyon/hours-and-location/",
    streetAddress: "7055 S Fort Apache Rd",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89148",
    note: "Regional water park southwest of Rhodes Ranch (formerly Wet’n’Wild Las Vegas).",
  },
  {
    name: "Downtown Summerlin",
    category: "shopping",
    schemaType: "ShoppingCenter",
    sourceUrl: "https://summerlin.com/experience/directory/",
    streetAddress: "1980 Festival Plaza Dr",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89135",
    note: "Retail and dining cluster northwest of Rhodes Ranch.",
  },
  {
    name: "Harry Reid International Airport",
    category: "parking",
    schemaType: "Airport",
    sourceUrl: "https://www.harryreidairport.com/",
    streetAddress: "5757 Wayne Newton Blvd",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89119",
    note: "Primary Las Vegas valley airport; drive time varies with traffic (approximate).",
  },
];

export function curatedAmenityFullAddress(item: CuratedAmenity): string {
  return `${item.streetAddress}, ${item.addressLocality}, ${item.addressRegion} ${item.postalCode}`;
}

export function googleMapsEmbedFallbackUrl(): string {
  const { latitude, longitude } = rhodesRanchCommunity.center;
  return `https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`;
}

export function googleMapsDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}
