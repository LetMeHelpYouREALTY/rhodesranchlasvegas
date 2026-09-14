import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";
import { siteContact } from "@/lib/site-contact";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteContact.businessName,
    short_name: publicEnv.siteBrandShort,
    description: `${siteContact.agentName} — Rhodes Ranch and Las Vegas ${siteContact.address.postalCode} real estate.`,
    start_url: "/",
    display: "browser",
    background_color: "#fafaf9",
    theme_color: "#14532d",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
