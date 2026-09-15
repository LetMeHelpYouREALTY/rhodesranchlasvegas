/**
 * Public environment configuration (NEXT_PUBLIC_*).
 * Set values in `.env.local` (local) and Vercel Project Settings → Environment Variables (production).
 * Never commit secrets; use server-only env vars for API keys in route handlers / Server Actions.
 */

function env(name: string, fallback: string): string {
  const v = process.env[name];
  return typeof v === "string" && v.trim() !== "" ? v.trim() : fallback;
}

function envOptional(name: string): string | undefined {
  const v = process.env[name];
  return typeof v === "string" && v.trim() !== "" ? v.trim() : undefined;
}

/** Normalize canonical site URL (no trailing slash) for metadataBase and JSON-LD. */
export function normalizeSiteUrl(raw: string): string {
  let u = raw.trim();
  if (!u.startsWith("http://") && !u.startsWith("https://")) {
    u = `https://${u}`;
  }
  return u.replace(/\/$/, "");
}

function envNumber(name: string, fallback: number): number {
  const v = envOptional(name);
  if (v === undefined) return fallback;
  const n = Number.parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
}

/** Tel: href from E.164 (e.g. +17026026878 → tel:+17026026878). */
export function telHrefFromE164(e164: string): string {
  const trimmed = e164.trim();
  if (trimmed.startsWith("tel:")) return trimmed;
  return `tel:${trimmed}`;
}

/** SMS href for GBP “Chat” / text (e.g. +17026026878 → sms:+17026026878). */
export function smsHrefFromE164(e164: string): string {
  let n = e164.trim();
  if (n.toLowerCase().startsWith("sms:")) return n;
  if (n.toLowerCase().startsWith("tel:")) n = n.slice(4);
  const digits = n.startsWith("+") ? n : `+${n.replace(/\D/g, "")}`;
  return `sms:${digits}`;
}

/**
 * Google My Maps embed — Las Vegas open house tour (replace `mid` when you publish a new My Map).
 * Default for open-houses and key-locations map URLs unless `NEXT_PUBLIC_LOCATIONS_MAP_EMBED_URL` overrides the latter.
 */
const DEFAULT_GOOGLE_MYM_MAP_EMBED_URL =
  "https://www.google.com/maps/d/embed?mid=12gQ1w5bzxrQ41HSGCdEJWFfhMtSkBwI&ehbc=2E312F";

/**
 * All public site configuration used by NAP, metadata, maps, and widgets.
 * Defaults match production Rhodes Ranch / Dr. Jan Duffy branding; override per deploy.
 */
export const publicEnv = {
  siteUrl: normalizeSiteUrl(
    env("NEXT_PUBLIC_SITE_URL", "https://www.rhodesranchlasvegas.com"),
  ),

  /**
   * Google Search Console HTML tag verification (`<meta name="google-site-verification" content="…">`).
   * Paste the **content** value from GSC → Settings → Ownership verification → HTML tag.
   */
  googleSiteVerification: (() => {
    const v = envOptional("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION");
    if (!v) return undefined;
    const t = v.trim();
    if (t.length < 6 || t.length > 256 || /[<>"'\s]/.test(t)) return undefined;
    return t;
  })(),

  /**
   * Bing Webmaster Tools — HTML meta verification (`<meta name="msvalidate.01" content="…">`).
   * Paste the **content** value from Bing → My site → Add site → HTML meta tag.
   */
  bingSiteVerification: (() => {
    const v = envOptional("NEXT_PUBLIC_BING_SITE_VERIFICATION");
    if (!v) return undefined;
    const t = v.trim();
    if (t.length < 8 || t.length > 256 || /[<>"'\s]/.test(t)) return undefined;
    return t;
  })(),

  /**
   * Google Search share link (e.g. share.google/... for “Rhodes Ranch Las Vegas”).
   * Used in NAP, footer, and key pages; override in Vercel to swap campaigns.
   */
  googleSearchShareUrl: (() => {
    const fallback = "https://share.google/pSOTtFR1dDF1BnTGt";
    const v = envOptional("NEXT_PUBLIC_GOOGLE_SEARCH_SHARE_URL");
    if (!v) return fallback;
    const t = v.trim();
    if (!/^https:\/\//i.test(t) || t.length > 2048) return fallback;
    return t;
  })(),

  /**
   * GA4 Web data stream — Measurement ID (Google tag).
   * Admin reference: stream name `rhodesranchlasvegas`, numeric stream ID `14412088623`, URL must match `NEXT_PUBLIC_SITE_URL` (https://www.rhodesranchlasvegas.com, no typos).
   * Invalid `NEXT_PUBLIC_GA_MEASUREMENT_ID` env values are ignored so production keeps this default.
   */
  googleAnalyticsMeasurementId: ((): string => {
    const fromEnv = envOptional("NEXT_PUBLIC_GA_MEASUREMENT_ID")?.trim();
    const fallback = "G-GR8HHKX1NL";
    if (fromEnv && /^G-[A-Z0-9]{4,15}$/i.test(fromEnv)) return fromEnv;
    return fallback;
  })(),

  agentName: env("NEXT_PUBLIC_AGENT_NAME", "Dr. Jan Duffy"),
  /** Matches Google Business Profile business name (visible NAP + JSON-LD). */
  businessName: env(
    "NEXT_PUBLIC_BUSINESS_NAME",
    "Rhodes Ranch Las Vegas | Homes by Dr. Jan Duffy",
  ),
  legalBrokerage: env(
    "NEXT_PUBLIC_BROKERAGE_NAME",
    "Berkshire Hathaway HomeServices Nevada Properties",
  ),
  license: env("NEXT_PUBLIC_LICENSE_NUMBER", "S.0197614.LLC"),
  agentTitle: env("NEXT_PUBLIC_AGENT_TITLE", "Listing Agent Specialist"),
  /** Primary inbox (Dr. Jan Duffy); align with GBP / site NAP. */
  email: env(
    "NEXT_PUBLIC_CONTACT_EMAIL",
    "DrDuffySells@RhodesRanchLasVegas.com",
  ),
  /** Team / secondary inbox (e.g. Chance). */
  secondaryContactEmail: env(
    "NEXT_PUBLIC_SECONDARY_CONTACT_EMAIL",
    "ChanceSells@RhodesRanchLasVegas.com",
  ),
  secondaryContactName: env(
    "NEXT_PUBLIC_SECONDARY_CONTACT_NAME",
    "Chance Fuller",
  ),
  secondaryContactTitle: env(
    "NEXT_PUBLIC_SECONDARY_CONTACT_TITLE",
    "Home Buyer Specialist",
  ),

  phoneE164: env("NEXT_PUBLIC_PHONE_E164", "+17026026878"),
  phoneDisplay: env("NEXT_PUBLIC_PHONE_DISPLAY", "(702) 602-6878"),

  /**
   * Override for `sms:` links (Google Business Profile). If unset, derived from `NEXT_PUBLIC_PHONE_E164`.
   */
  phoneSmsHref: (() => {
    const explicit = envOptional("NEXT_PUBLIC_PHONE_SMS_HREF");
    if (explicit) {
      const t = explicit.trim();
      if (/^sms:\+[1-9]\d{6,14}$/i.test(t)) return t;
    }
    return smsHrefFromE164(env("NEXT_PUBLIC_PHONE_E164", "+17026026878"));
  })(),

  /**
   * Mirrors Google Business Profile “About your business” (visible copy + JSON-LD seed).
   * Override in Vercel to stay in sync with GBP edits.
   */
  gbpBusinessDescription: env(
    "NEXT_PUBLIC_GBP_BUSINESS_DESCRIPTION",
    "Rhodes Ranch Las Vegas is your local real estate resource for Rhodes Ranch, Spring Valley, and southwest Las Vegas. Whether you're buying or selling, you get expert guidance on pricing, marketing, negotiations, and paperwork. Buyers receive personalized home search, tour coordination, and clear next steps. Sellers get a strategy built for your specific neighborhood. Clear communication, professional representation, and deep knowledge of the communities that matter to you.",
  ),

  addressStreet: env(
    "NEXT_PUBLIC_ADDRESS_STREET",
    "7272 S El Capitan Way",
  ),
  addressLocality: env("NEXT_PUBLIC_ADDRESS_CITY", "Las Vegas"),
  addressRegion: env("NEXT_PUBLIC_ADDRESS_STATE", "NV"),
  postalCode: env("NEXT_PUBLIC_ADDRESS_ZIP", "89148"),
  addressCountry: env("NEXT_PUBLIC_ADDRESS_COUNTRY", "US"),

  geoLatitude: envNumber("NEXT_PUBLIC_GEO_LATITUDE", 36.05581),
  geoLongitude: envNumber("NEXT_PUBLIC_GEO_LONGITUDE", -115.28788),

  /** Google Business Profile “service area” string (align with GBP). */
  serviceAreaDescription: env(
    "NEXT_PUBLIC_SERVICE_AREA",
    "Rhodes Ranch, Spring Valley, NV, USA",
  ),
  hoursSummaryLine: env(
    "NEXT_PUBLIC_HOURS_SUMMARY",
    "Open daily 9:00 a.m.–6:00 p.m. (Las Vegas time).",
  ),

  /**
   * Short line shown with NAP (mirrors GBP attributes). Set empty in Vercel to hide: NEXT_PUBLIC_GBP_HIGHLIGHT_ATTRIBUTES_LINE=
   */
  gbpHighlightAttributesLine: (() => {
    const raw = process.env.NEXT_PUBLIC_GBP_HIGHLIGHT_ATTRIBUTES_LINE;
    if (typeof raw === "string" && raw.trim() === "") return "";
    if (typeof raw === "string" && raw.trim() !== "") return raw.trim();
    return "Women-owned · Veteran-owned";
  })(),

  /**
   * Opening/closing times for JSON-LD — applied to all days listed in `siteContact.openingHoursSpecification`
   * (Google Business Profile: Sun–Sat same hours).
   */
  officeWeekdayOpens: env("NEXT_PUBLIC_OFFICE_WEEKDAY_OPENS", "09:00"),
  officeWeekdayCloses: env("NEXT_PUBLIC_OFFICE_WEEKDAY_CLOSES", "18:00"),

  /**
   * Full Google Maps embed URL (optional). If unset, built from NEXT_PUBLIC_MAP_QUERY or address fields.
   */
  mapEmbedUrl: envOptional("NEXT_PUBLIC_MAP_EMBED_URL"),

  /**
   * Google My Maps embed for open house tours (Share → Embed a map).
   * Homepage, `/open-houses`, and (by default) `/locations` “Key locations”.
   */
  openHousesMapEmbedUrl: env(
    "NEXT_PUBLIC_OPEN_HOUSES_MAP_EMBED_URL",
    DEFAULT_GOOGLE_MYM_MAP_EMBED_URL,
  ),

  /**
   * Google My Maps for “Key locations” on `/locations` (and linked from `/contact`).
   * Defaults to the same embed as open houses; set `NEXT_PUBLIC_LOCATIONS_MAP_EMBED_URL` for a
   * separate office-only or multi-tour map.
   */
  locationsMapEmbedUrl: ((): string | undefined => {
    const raw = envOptional("NEXT_PUBLIC_LOCATIONS_MAP_EMBED_URL")?.trim();
    if (raw) {
      if (!raw.startsWith("https://www.google.com/maps/d/embed")) return undefined;
      return raw;
    }
    return DEFAULT_GOOGLE_MYM_MAP_EMBED_URL;
  })(),

  /**
   * Query for maps.google.com embed when NEXT_PUBLIC_MAP_EMBED_URL is not set.
   * Defaults to office address line + city, state, zip.
   */
  mapQuery: envOptional("NEXT_PUBLIC_MAP_QUERY"),

  /**
   * Google Maps embed for the Rhodes Ranch / Spring Valley community area (dedicated /map page).
   */
  rhodesRanchAreaMapEmbedUrl: (() => {
    const raw = env(
      "NEXT_PUBLIC_RHODES_RANCH_AREA_MAP_EMBED_URL",
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51599.877125736304!2d-115.29691299999999!3d36.0692914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8b8649f2725ab%3A0xa8bfb93b8b3b3a06!2sRhodes%20Ranch%2C%20Spring%20Valley%2C%20NV!5e0!3m2!1sen!2sus!4v1774989906439!5m2!1sen!2sus",
    );
    if (!raw.startsWith("https://www.google.com/maps/embed")) {
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51599.877125736304!2d-115.29691299999999!3d36.0692914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8b8649f2725ab%3A0xa8bfb93b8b3b3a06!2sRhodes%20Ranch%2C%20Spring%20Valley%2C%20NV!5e0!3m2!1sen!2sus!4v1774989906439!5m2!1sen!2sus";
    }
    return raw;
  })(),

  realScoutAgentId: (() => {
    const raw = env(
      "NEXT_PUBLIC_REALSCOUT_AGENT_ID",
      "QWdlbnQtMjI1MDUw",
    );
    // Typical RealScout encoded id is base64-like; reject quotes/angle brackets for attribute safety.
    if (!/^[A-Za-z0-9+/=_-]{4,128}$/.test(raw)) {
      return "QWdlbnQtMjI1MDUw";
    }
    return raw;
  })(),

  /**
   * Office listings UMD script (must stay on em.realscout.com per RealScout embed docs).
   * Override only if RealScout provides a new path; keep CSP script-src in sync.
   */
  realScoutWidgetScriptSrc: (() => {
    const fallback =
      "https://em.realscout.com/widgets/realscout-web-components.umd.js";
    const raw = envOptional("NEXT_PUBLIC_REALSCOUT_SCRIPT_URL") ?? fallback;
    if (!/^https:\/\/em\.realscout\.com\/[\w./-]+\.js$/.test(raw)) return fallback;
    return raw;
  })(),
  /** RealScout sort token; restricted to safe characters for use in widget HTML attributes. */
  realScoutSortOrder: (() => {
    const raw = env("NEXT_PUBLIC_REALSCOUT_SORT_ORDER", "NEWEST");
    if (!/^[A-Za-z0-9_-]{1,32}$/.test(raw)) return "NEWEST";
    return raw;
  })(),
  realScoutListingsPerPage: (() => {
    const raw = env("NEXT_PUBLIC_REALSCOUT_LISTINGS_PER_PAGE", "12");
    const n = Number.parseInt(raw, 10);
    if (!Number.isFinite(n) || n < 1 || n > 48) return "12";
    return String(n);
  })(),

  /**
   * minimal = agent + sort + listings-per-page (most reliable; avoids empty grid from tight filters).
   * full = also listing-status, property-types, price-min, price-max.
   */
  realScoutWidgetMode: (() => {
    const raw = env("NEXT_PUBLIC_REALSCOUT_WIDGET_MODE", "minimal").toLowerCase();
    return raw === "full" ? "full" : "minimal";
  })(),

  /** Office listings filter: listing status (e.g. For Sale). */
  realScoutListingStatus: (() => {
    const raw = env("NEXT_PUBLIC_REALSCOUT_LISTING_STATUS", "For Sale");
    if (!/^[\w\s\-]{1,64}$/.test(raw)) return "For Sale";
    return raw;
  })(),

  /**
   * Status token for `/open-houses/*` RealScout strip (must match your MLS/RealScout labels).
   * If the grid is empty, try "For Sale" or your board’s open-house label in Vercel.
   */
  realScoutOpenHouseListingStatus: (() => {
    const raw = env("NEXT_PUBLIC_REALSCOUT_OPEN_HOUSE_LISTING_STATUS", "Open House");
    if (!/^[\w\s\-]{1,64}$/.test(raw)) return "Open House";
    return raw;
  })(),

  /** Comma-led property type token for the widget (e.g. ,SFR for single-family). */
  realScoutPropertyTypes: (() => {
    const raw = env("NEXT_PUBLIC_REALSCOUT_PROPERTY_TYPES", ",SFR");
    if (!/^[,A-Za-z0-9_-]{1,32}$/.test(raw)) return ",SFR";
    return raw;
  })(),

  /**
   * List price floor (USD) for the office listings widget—targets buyers/sellers, not rentals.
   * ~$350k+ matches typical single-family purchase band in southwest Las Vegas / Rhodes Ranch area.
   */
  realScoutPriceMin: (() => {
    const raw = env("NEXT_PUBLIC_REALSCOUT_PRICE_MIN", "350000");
    if (!/^\d{1,12}$/.test(raw)) return "350000";
    return raw;
  })(),

  /** List price ceiling (USD); keeps luxury inventory while avoiding unusable outliers. */
  realScoutPriceMax: (() => {
    const raw = env("NEXT_PUBLIC_REALSCOUT_PRICE_MAX", "15000000");
    if (!/^\d{1,12}$/.test(raw)) return "15000000";
    return raw;
  })(),
  /** Default metadata / OG brand line */
  siteBrandShort: env("NEXT_PUBLIC_SITE_BRAND_SHORT", "Rhodes Ranch Las Vegas"),
  /**
   * Optional homepage / default meta subline (Rhodes Ranch Las Vegas homes + E-E-A-T).
   * Override in Vercel without code changes.
   */
  seoSiteTagline: env(
    "NEXT_PUBLIC_SEO_SITE_TAGLINE",
    "Rhodes Ranch Las Vegas homes — local REALTOR® expertise in 89148.",
  ),

  /**
   * Calendly event URL (15-min consultation). Must be https://calendly.com/...
   * Post-deploy: Google Search Console → URL Inspection for /contact and /search; confirm no CSP blocks.
   */
  calendlyEventUrl: (() => {
    const fallback =
      "https://calendly.com/drjanduffy/dr-duffy-private-15-min-conversation";
    const raw = env("NEXT_PUBLIC_CALENDLY_EVENT_URL", fallback);
    const isCalendlyHost = (hostname: string) => {
      const h = hostname.toLowerCase();
      return h === "calendly.com" || h.endsWith(".calendly.com");
    };
    try {
      const u = new URL(raw);
      if (u.protocol === "https:" && isCalendlyHost(u.hostname)) {
        return u.toString().replace(/\/$/, "") || fallback;
      }
    } catch {
      /* fall through */
    }
    return fallback;
  })(),

  /** Matches site themeColor / emerald brand (override via NEXT_PUBLIC_CALENDLY_BADGE_COLOR). */
  calendlyBadgeColor: (() => {
    const raw = env("NEXT_PUBLIC_CALENDLY_BADGE_COLOR", "#14532d");
    return /^#[0-9A-Fa-f]{6}$/.test(raw) ? raw : "#14532d";
  })(),

  calendlyBadgeTextColor: (() => {
    const raw = env("NEXT_PUBLIC_CALENDLY_BADGE_TEXT_COLOR", "#ffffff");
    return /^#[0-9A-Fa-f]{6}$/.test(raw) ? raw : "#ffffff";
  })(),

  calendlyBadgeLabel: env(
    "NEXT_PUBLIC_CALENDLY_BADGE_LABEL",
    "Schedule with Dr. Jan Duffy",
  ),

  /**
   * Google Maps JavaScript API key (Directions, map on /contact and /rhodes-ranch-las-vegas).
   * Set in Vercel (Project or inherited Team env) as a `NEXT_PUBLIC_*` var so it is available to the client bundle.
   * After adding or changing the value, trigger a new deployment — Next bakes `NEXT_PUBLIC_*` in at build time.
   * Enable “Maps JavaScript API” and “Directions API”; restrict the key by HTTP referrer to this site.
   * Primary: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — optional alias: `NEXT_PUBLIC_GOOGLE_MAPS_PLATFORM_KEY`.
   */
  googleMapsApiKey: ((): string | undefined => {
    const raw =
      envOptional("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY")?.trim() ||
      envOptional("NEXT_PUBLIC_GOOGLE_MAPS_PLATFORM_KEY")?.trim();
    if (!raw) return undefined;
    if (raw.length < 30 || raw.length > 256) return undefined;
    if (!/^AIza[0-9A-Za-z\-_]+$/.test(raw)) return undefined;
    return raw;
  })(),

  /**
   * Google Maps / Business Profile public place or short link (reviews + pin).
   * Paste from GBP “Share” (https://maps.google.com/..., https://www.google.com/maps/place/..., or https://g.page/...).
   * When unset, the site builds a Maps search URL from NAP (footer + contact).
   */
  googleBusinessProfileMapsUrl: ((): string | undefined => {
    const raw = envOptional("NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_MAPS_URL")?.trim();
    if (!raw) return undefined;
    try {
      const u = new URL(raw);
      if (u.protocol !== "https:") return undefined;
      const h = u.hostname.toLowerCase();
      const allowed =
        h === "maps.google.com" ||
        h === "www.google.com" ||
        h === "g.page" ||
        h.endsWith(".g.page") ||
        h === "maps.app.goo.gl" ||
        h === "goo.gl";
      if (!allowed) return undefined;
      return u.toString();
    } catch {
      return undefined;
    }
  })(),

  /**
   * Google Business Profile “write a review” (or g.page/.../review) link from GBP → request reviews.
   * When set (or when using the project default), “View Google reviews” and footer review CTAs use this; Directions and “View on Google Maps” use {@link publicEnv.googleBusinessProfileMapsUrl}.
   * Override: `NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_REVIEW_URL`.
   */
  googleBusinessProfileReviewUrl: ((): string | undefined => {
    const fromEnv = envOptional("NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_REVIEW_URL")?.trim();
    const raw =
      fromEnv && fromEnv.length > 0
        ? fromEnv
        : "https://g.page/r/CYB8-3JNkbuyEBI/review";
    try {
      const u = new URL(raw);
      if (u.protocol !== "https:") return undefined;
      const h = u.hostname.toLowerCase();
      const allowed =
        h === "maps.google.com" ||
        h === "www.google.com" ||
        h === "g.page" ||
        h.endsWith(".g.page") ||
        h === "maps.app.goo.gl" ||
        h === "goo.gl";
      if (!allowed) return undefined;
      return u.toString();
    } catch {
      return undefined;
    }
  })(),

  /**
   * `sameAs` profile URLs for RealEstateAgent JSON-LD (E-E-A-T). Comma- or space-separated HTTPS URLs, max 8.
   * When unset, defaults to GBP-linked LinkedIn + Facebook company pages.
   */
  schemaSameAs: ((): readonly string[] => {
    const raw =
      envOptional("NEXT_PUBLIC_SCHEMA_SAME_AS")?.trim() ||
      "https://www.linkedin.com/company/rhodesranchlasvegas/,https://www.facebook.com/rhodesranchlasvegashomes";
    const parts = raw
      .split(/[,;\s]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const out: string[] = [];
    for (const p of parts) {
      if (out.length >= 8) break;
      try {
        const u = new URL(p);
        if (u.protocol === "https:" && u.hostname.includes(".")) {
          out.push(u.toString().replace(/\/$/, "") || p);
        }
      } catch {
        /* skip invalid */
      }
    }
    return out;
  })(),

  /**
   * Cloudflare Images account hash (imagedelivery.net/<hash>/<id>/<variant>).
   * Primary CDN for heading photos; git copies in public/images/ remain the backup.
   * Do not orange-cloud the Vercel hostname — this uses imagedelivery.net instead.
   */
  cloudflareImagesAccountHash: (() => {
    const raw = envOptional("NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH")?.trim();
    if (!raw) return undefined;
    if (!/^[A-Za-z0-9_-]{8,128}$/.test(raw)) return undefined;
    return raw;
  })(),

  /** Named variant on Cloudflare Images (default `public`). */
  cloudflareImagesVariant: (() => {
    const raw = env("NEXT_PUBLIC_CLOUDFLARE_IMAGES_VARIANT", "public");
    if (!/^[A-Za-z0-9_-]{1,64}$/.test(raw)) return "public";
    return raw;
  })(),
} as const;
