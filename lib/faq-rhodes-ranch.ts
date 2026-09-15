import type { FaqItem } from "@/lib/schema";
import { publicEnv } from "@/lib/env";
import { siteContact } from "@/lib/site-contact";

/**
 * Static FAQ copy for AEO; keep answers accurate—no dollar amounts for HOA or fees unless sourced.
 */
export const rhodesRanchFaq: FaqItem[] = [
  {
    question: "Where is Rhodes Ranch Las Vegas?",
    answer:
      "Rhodes Ranch is in southwest Las Vegas, generally associated with zip code 89148 in the Spring Valley area of unincorporated Clark County.",
  },
  {
    question: "How far is Rhodes Ranch from the Las Vegas Strip?",
    answer:
      "Drive times are often in the 15- to 25-minute range depending on traffic patterns and where you start on the Strip.",
  },
  {
    question: "What amenities and layout does Rhodes Ranch include?",
    answer:
      "Rhodes Ranch is a guard-gated, golf-centered community with recreation facilities. Home style, lot size, HOA rules, and commute times can vary by section, so touring specific streets is the best way to evaluate fit.",
  },
  {
    question: "Is Rhodes Ranch in Las Vegas bankrupt?",
    answer:
      "Community financial or legal status can change over time, so avoid relying on rumors. For current, verifiable information, review official HOA documents and public records and consult qualified legal or financial professionals when needed.",
  },
  {
    question: "Is there a quick way to open Google Search for Rhodes Ranch Las Vegas?",
    answer: `Yes. Use the “Rhodes Ranch Las Vegas on Google” (or “Google Search”) link in the office block, site footer, or the Rhodes Ranch hub page—it opens the same saved Google Search view (${publicEnv.googleSearchShareUrl}) so you can compare Google’s results with our on-site home search and maps.`,
  },
  {
    question: "Does this website match the Google Business Profile for Rhodes Ranch Las Vegas?",
    answer: `Yes. The business name, address, phone, hours, and service area on this site are written to align with the Google Business Profile for ${siteContact.businessName}. For live reviews, directions, and the public listing on Google Maps, use the “Reviews and directions on Google” link in the office block on this page or open the Maps link from the footer.`,
  },
  {
    question: "Is Rhodes Ranch a gated community?",
    answer:
      "Yes. Rhodes Ranch is a guard-gated master-planned community in southwest Las Vegas (89148) with resort-style amenities and a central golf course.",
  },
  {
    question: "What is Rhodes Ranch Golf Club?",
    answer:
      "Rhodes Ranch Golf Club is a Ted Robinson–designed course that opened in 1997. Public information about tee times, membership, and events is available on the official Rhodes Ranch Golf Club website.",
  },
  {
    question: "What are the HOA fees at Rhodes Ranch?",
    answer:
      "HOA assessments change over time and depend on the home and section. For current fees and billing, contact the Rhodes Ranch homeowners association or your real estate professional for verified documents during a purchase.",
  },
  {
    question: "What are golf membership options at Rhodes Ranch?",
    answer:
      "Membership categories and pricing are set by Rhodes Ranch Golf Club. Review current options directly with the club or on their official website before you rely on them for budgeting.",
  },
  {
    question: "What real estate options exist in Rhodes Ranch?",
    answer:
      "The community includes single-family homes across a range of sizes and floor plans. Inventory and pricing change daily—use the home search on this site or ask Dr. Jan Duffy or Chance Fuller for a curated list that matches your criteria.",
  },
  {
    question: "Where can I find open houses for Rhodes Ranch Las Vegas homes?",
    answer: `${siteContact.secondaryContactName} (${siteContact.secondaryContactTitle}) maintains an interactive Google Map of upcoming open houses and tour stops in Rhodes Ranch, Spring Valley, and southwest Las Vegas—the map appears on the homepage and on our Open houses hub. For day-by-day planning and an MLS open house search, use ${siteContact.siteUrl.replace(/\/$/, "")}/open-houses. Inventory and times change; call ${siteContact.phoneDisplay} or use the contact page for private showings.`,
  },
];
