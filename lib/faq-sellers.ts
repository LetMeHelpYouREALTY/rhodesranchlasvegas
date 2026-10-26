/**
 * Seller / listing FAQ for `/sell-your-rhodes-ranch-home` (paired with FAQPage JSON-LD).
 */

import type { FaqItem } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

export const sellerFaq: FaqItem[] = [
  {
    question: "How do I learn what my Rhodes Ranch home is worth?",
    answer:
      "Start with a listing consultation—not an online estimate alone. Dr. Jan Duffy reviews recent closed sales in your section of Rhodes Ranch, your upgrades, and how guard-gated access and golf-course positioning affect buyer demand. You can book on the calendar on this page or call the office number listed below.",
  },
  {
    question: "What does listing preparation usually include in 89148?",
    answer:
      "We walk the home with you to prioritize repairs, staging, and photography that help buyers understand layout and condition. The goal is a clear presentation that matches how Rhodes Ranch buyers shop—without over-investing in changes that will not show up in offers.",
  },
  {
    question: "How are Rhodes Ranch homes marketed?",
    answer:
      "Marketing combines MLS exposure, professional media, and targeted outreach to buyers already searching southwest Las Vegas and relocating to Nevada. Dr. Jan Duffy coordinates showings that respect community access rules and keeps you informed as feedback arrives.",
  },
  {
    question: "Who handles negotiations and contract paperwork?",
    answer: `${siteContact.agentName} (${siteContact.agentTitle}) leads pricing strategy, offer review, and negotiation through closing. ${siteContact.legalBrokerage} provides transaction support; you receive plain-language updates at each milestone.`,
  },
  {
    question: "Can I sell in Rhodes Ranch and buy another home at the same time?",
    answer:
      "Yes. Many clients coordinate a sale with a purchase in Rhodes Ranch or nearby southwest Las Vegas communities. Share your ideal timeline when you book so we can align listing dates with your buyer search—often with support from the buyer specialist on our team.",
  },
];
