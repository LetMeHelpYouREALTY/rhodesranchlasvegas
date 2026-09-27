import type { FaqItem } from "@/lib/schema";
import { rhodesRanchCommunity } from "@/lib/rhodes-ranch-community";
import { siteContact } from "@/lib/site-contact";

const community = rhodesRanchCommunity.name;

export const nearbyAmenitiesFaq: FaqItem[] = [
  {
    question: `What grocery stores are near ${community}?`,
    answer: `Smith's at 8525 W Warm Springs Rd is the full-service grocery many Rhodes Ranch buyers use along the Warm Springs corridor; confirm today's hours on the operator's site. Winco and other southwest valley grocers are a short drive—use the map on this page to compare options.`,
  },
  {
    question: `How far is ${community} from the Las Vegas Strip?`,
    answer: `${community} sits about six miles southwest of the central Las Vegas Strip; in light traffic many drivers reach major Strip resorts in roughly 15–25 minutes, but rush-hour times vary.`,
  },
  {
    question: `Are there hospitals near ${community}?`,
    answer: `St. Rose Dominican Hospital — San Martín Campus is on W Warm Springs Rd near the Rhodes Ranch frontage roads, with additional valley hospitals farther north or east depending on your route.`,
  },
  {
    question: `Does ${community} have golf on site?`,
    answer: `Yes. Rhodes Ranch Golf Club (20 E Rhodes Ranch Pkwy) is the 18-hole Ted Robinson course at the center of the community; tee times and membership rules are set by the club.`,
  },
  {
    question: `What parks and recreation are close to ${community}?`,
    answer: `Inside the gates, residents use trails, pools, and the recreation center operated by the community. Nearby public parks include Red Ridge Park, and regional options include Wet'n'Wild Las Vegas and Red Rock Canyon for bigger outdoor days.`,
  },
  {
    question: `How long does it take to reach Harry Reid International Airport from ${community}?`,
    answer: `Harry Reid International Airport is southeast of Rhodes Ranch; approximate drive time is often 20–35 minutes depending on time of day and whether you use the 215 Beltway or surface streets.`,
  },
  {
    question: `Where do buyers shop for retail and dining beyond the gates?`,
    answer: `Downtown Summerlin and other southwest corridors (Charleston, Rainbow, Fort Apache) host major retail and restaurants; many Rhodes Ranch residents also use the Warm Springs / Fort Apache retail strip near the community entrance.`,
  },
  {
    question: `Who helps with ${community} home tours and commute questions?`,
    answer: `${siteContact.agentName} (${siteContact.agentTitle}) and ${siteContact.secondaryContactName} (${siteContact.secondaryContactTitle}) with ${siteContact.legalBrokerage} cover ${siteContact.serviceAreaDescription}—call ${siteContact.phoneDisplay} or use the contact page to plan showings with amenity and commute context.`,
  },
];
