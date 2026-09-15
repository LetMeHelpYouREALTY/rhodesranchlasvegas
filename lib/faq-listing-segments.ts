import type { FaqItem } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

const siteRoot = siteContact.siteUrl.replace(/\/$/, "");

/** Unique FAQ for the new-listings intent page (do not clone the MLS hub FAQ verbatim). */
export const newListingsFaq: FaqItem[] = [
  {
    question: "What counts as a new listing on this Rhodes Ranch page?",
    answer:
      "This page is for homes that recently entered the MLS feed for Rhodes Ranch and nearby 89148. Status can change the same day—confirm availability before you drive.",
  },
  {
    question: "How fast should I tour a newly listed home in a gated section?",
    answer: `Call ${siteContact.phoneDisplay} as soon as a card looks like a fit. Guard-gated access often needs a showing window, so same-day tours are not always possible without notice.`,
  },
  {
    question: "How do I get alerts for new Rhodes Ranch listings?",
    answer: `Use the search tools on this page, then ${siteRoot}/contact#schedule so ${siteContact.secondaryContactName} can set a buyer-focused alert that matches your budget and must-haves.`,
  },
  {
    question: "Where is the office if I want to review new listings in person?",
    answer: `${siteContact.businessName} is at ${siteContact.fullAddressLine}. Hours: ${siteContact.hoursSummaryLine} Phone ${siteContact.phoneDisplay}.`,
  },
];

/** Unique FAQ for the under-$500k intent page. */
export const homesUnder500kFaq: FaqItem[] = [
  {
    question: "Are homes under $500k inside Rhodes Ranch or nearby 89148?",
    answer:
      "Inventory in this price band shifts. Some results are in Rhodes Ranch sections; others are nearby southwest Las Vegas. Use the map on this page and verify the community name on each listing card.",
  },
  {
    question: "Why does a home disappear from the under-$500k list?",
    answer:
      "Price changes, pending status, or withdrawn listings drop a home out of this filter. Save the MLS number and call before you plan a showing.",
  },
  {
    question: "Can I still tour if I am pre-approved above $500k?",
    answer: `Yes. This page is a starting filter, not a cap on what you can buy. ${siteContact.secondaryContactName} can mix this band with nearby comps on a private short list.`,
  },
  {
    question: "How do I book a showing for a lower-price-band home?",
    answer: `Call or text ${siteContact.phoneDisplay}, or use ${siteRoot}/contact#schedule. Gated entries may need an appointment even for listed homes.`,
  },
];

/** Unique FAQ for the pool-homes intent page. */
export const poolHomesFaq: FaqItem[] = [
  {
    question: "Does this page show private backyard pools or community pools?",
    answer:
      "The feed is a starting point for pool-oriented search. Confirm whether a listing has a private pool, spa, or only recreation-center access in the remarks and photos before you tour.",
  },
  {
    question: "How do I confirm pool equipment, permits, and HOA rules?",
    answer:
      "Listing remarks are not a substitute for documents. During diligence, request HOA rules, any pool permits, and a home inspection that covers equipment and safety barriers.",
  },
  {
    question: "Can I compare pool homes with other Rhodes Ranch inventory?",
    answer: `Yes. Start here, then open full MLS search at ${siteRoot}/rhodes-ranch-mls-listings or ask ${siteContact.agentName} for a side-by-side short list.`,
  },
  {
    question: "How do I schedule a private walk-through of a pool home?",
    answer: `Call ${siteContact.phoneDisplay} or use ${siteRoot}/contact#schedule. We coordinate gated access and timing so you can inspect the yard in daylight.`,
  },
];

/** Unique FAQ for weekday open-house pages. */
export const weekdayOpenHouseFaq: FaqItem[] = [
  {
    question: "Do these MLS cards guarantee the home is open on this weekday?",
    answer:
      "No. Confirm the date and hours on each listing card, then refresh before you leave. Hosts can cancel or change windows without notice.",
  },
  {
    question: "How do I get into a guard-gated Rhodes Ranch open house?",
    answer: `Bring ID and the listing address. If the card asks for RSVP, call ${siteContact.phoneDisplay} so we can confirm access with the listing side.`,
  },
  {
    question: "Where is the weekend tour map?",
    answer: `The live Google Map of open house stops is on ${siteRoot}/open-houses. ${siteContact.secondaryContactName} maintains that map.`,
  },
];
