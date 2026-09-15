import type { FaqItem } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

const siteRoot = siteContact.siteUrl.replace(/\/$/, "");

/**
 * Dedicated Q&A hub (`/questions`) for AEO—question-shaped headings with direct first-sentence answers.
 * Keep distinct from `faq-rhodes-ranch`, `faq-buyers`, and `faq-contact` to avoid thin duplicate blocks.
 */
export const aeoFaq: FaqItem[] = [
  {
    question: "Where is Rhodes Ranch in Las Vegas?",
    answer:
      "Rhodes Ranch is in the southwest Las Vegas valley and is commonly associated with zip code 89148 in the Spring Valley area of unincorporated Clark County.",
  },
  {
    question: "Where is Rhodes Ranch Las Vegas NV?",
    answer: `For practical navigation, use ${siteContact.fullAddressLine} as your nearby office reference point and then search/listing maps for Rhodes Ranch in 89148.`,
  },
  {
    question: "How far is Rhodes Ranch from the Las Vegas Strip?",
    answer:
      "It is generally about a 15- to 25-minute drive depending on traffic, your exact start point on the Strip, and time of day.",
  },
  {
    question: "What amenities and layout does Rhodes Ranch include?",
    answer:
      "Rhodes Ranch is a guard-gated, golf-centered community with recreation amenities and planned residential sections. Fit depends on your budget, commute, and preferred home style, so touring at different times of day is useful.",
  },
  {
    question: "Who is Dr. Jan Duffy and what does Rhodes Ranch Las Vegas Real Estate Division do?",
    answer: `${siteContact.agentName} is the ${siteContact.agentTitle} with ${siteContact.legalBrokerage}, Nevada license ${siteContact.license}. The Rhodes Ranch Las Vegas Real Estate Division focuses on listing strategy, pricing, and marketing for sellers, and coordinates with ${siteContact.secondaryContactName} (${siteContact.secondaryContactTitle}) for purchase-side search and showings in ${siteContact.serviceAreaDescription}.`,
  },
  {
    question: "What is the difference between a listing agent specialist and a buyer specialist on this team?",
    answer: `The listing side emphasizes pricing, presentation, marketing, and negotiation when you sell. The buyer specialist focuses on search filters, tours, offers, and staying aligned with your lender through closing. Many clients work with both when they buy and sell in the same chapter—tell us your goals and we will align roles.`,
  },
  {
    question: "What Las Vegas zip code is Rhodes Ranch—and is it in Spring Valley?",
    answer:
      "Rhodes Ranch is in southwest Las Vegas and is commonly associated with the 89148 zip code. Spring Valley is a broader unincorporated Clark County area name you will see on maps and searches; when in doubt, match addresses and MLS map pins to the home you are considering.",
  },
  {
    question: "How do I search homes for sale in Rhodes Ranch (89148) from this website?",
    answer: `Use the Home search on this site to filter by price, beds, baths, and more. For a short list that matches lifestyle and commute goals—not only square footage—call ${siteContact.phoneDisplay} or email the buyer inbox so we can refine results for Rhodes Ranch and nearby southwest Las Vegas neighborhoods.`,
  },
  {
    question: "How do open houses work in Rhodes Ranch guard-gated neighborhoods?",
    answer: `Open house times and access rules change by listing and community. Use our Open houses hub (${siteRoot}/open-houses) for day-by-day planning and the weekend map, then confirm the time on the listing before you drive. For a private tour, contact us so we can coordinate guard-gate entry where required.`,
  },
  {
    question: "Do I need a REALTOR® to tour homes in the Rhodes Ranch area?",
    answer:
      "Many listings—especially in guard-gated communities—are shown by appointment or with agent coordination. Reaching out before you tour helps avoid wasted trips and keeps access compliant with community rules.",
  },
  {
    question: "What neighborhoods does your team serve beyond Rhodes Ranch?",
    answer: `We work with buyers and sellers across ${siteContact.serviceAreaDescription}, including Spring Valley and nearby southwest Las Vegas communities. If your search expands, tell us your commute and school priorities so we can adjust map search and showings.`,
  },
  {
    question: "Is there a nearby community in Las Vegas as big as the Rhodes Ranch guard-gated community?",
    answer:
      "Several large master-planned communities exist across the Las Vegas valley, but community size, guard-gate structure, amenities, and HOA setup differ by neighborhood. The best approach is to compare current listings, maps, and rules side by side based on your priorities.",
  },
  {
    question: "Can I work with your team if I am buying and selling in the same year?",
    answer:
      "Yes. Share your timing, financing plan, and whether you need to close in a certain order. We coordinate listing preparation with your purchase search so milestones line up as well as market conditions allow—your lender and title partners still drive financing and escrow timelines.",
  },
  {
    question: "How do I reach your office for a private showing or listing consultation?",
    answer: `Our office is at ${siteContact.fullAddressLine}; phone ${siteContact.phoneDisplay}. Use the Contact page for Calendly scheduling, or call or text for faster coordination. Listing questions go to ${siteContact.email}; buyer-side questions go to ${siteContact.secondaryEmail}.`,
  },
  {
    question: "What should I read next if I am new to buying a home in Las Vegas?",
    answer: `Start with the Home buyer guide (${siteRoot}/buyers) and the Las Vegas home buying process overview (${siteRoot}/buyers/process). When you are ready to see homes, pair the on-site search (${siteRoot}/search) with a conversation about budget and must-haves.`,
  },
];
