import type { FaqItem } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

const siteRoot = siteContact.siteUrl.replace(/\/$/, "");

/**
 * Query-shaped FAQ for the dedicated Rhodes Ranch MLS listings landing page.
 * Keep claims factual and avoid unsourced market-stat guarantees.
 */
export const rhodesMlsFaq: FaqItem[] = [
  {
    question: "Where is Rhodes Ranch in Las Vegas?",
    answer:
      "Rhodes Ranch is in southwest Las Vegas and is commonly associated with zip code 89148 in the Spring Valley area of unincorporated Clark County.",
  },
  {
    question: "How far is Rhodes Ranch from the Las Vegas Strip?",
    answer:
      "Typical drive times are often around 15 to 25 minutes depending on traffic, route, and your exact destination on the Strip.",
  },
  {
    question: "Are these Rhodes Ranch MLS listings updated regularly?",
    answer:
      "Yes. Listing status, pricing, and availability refresh as the MLS feed updates, but all homes remain subject to change and broker confirmation.",
  },
  {
    question: "Can I filter for pool homes, price point, and newer listings?",
    answer: `Yes. Start with this page, then use our focused filters and routes for Pool Homes (${siteRoot}/rhodes-ranch-pool-homes), Homes Under $500k (${siteRoot}/rhodes-ranch-homes-under-500k), and New Listings (${siteRoot}/rhodes-ranch-new-listings).`,
  },
  {
    question: "How do I schedule a private showing in a guard-gated section?",
    answer: `Call ${siteContact.phoneDisplay} or use ${siteRoot}/contact#schedule. We coordinate showing windows and access steps for gated entries where required.`,
  },
  {
    question: "What amenities and layout does Rhodes Ranch include?",
    answer:
      "Rhodes Ranch is a guard-gated, golf-centered community with recreation facilities. Home style, lot size, and HOA rules vary by section, so a focused tour is the best way to evaluate fit.",
  },
];
