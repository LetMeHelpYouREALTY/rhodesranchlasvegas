import type { MetadataRoute } from "next";
import { siteImageAbsoluteUrl } from "@/lib/cloudflare-images";
import { WEEKDAY_SLUGS } from "@/lib/open-houses-weekdays";
import { heroImageIdForPath } from "@/lib/site-images";
import { siteContact } from "@/lib/site-contact";

function pageEntry(
  path: string,
  rest: Omit<MetadataRoute.Sitemap[number], "url" | "images">,
): MetadataRoute.Sitemap[number] {
  const base = siteContact.siteUrl.replace(/\/$/, "");
  const url = path === "/" ? base : `${base}${path}`;
  return {
    url,
    images: [siteImageAbsoluteUrl(heroImageIdForPath(path))],
    ...rest,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    pageEntry("/", { lastModified, changeFrequency: "weekly", priority: 1 }),
    pageEntry("/buyers", { lastModified, changeFrequency: "weekly", priority: 0.88 }),
    pageEntry("/buyers/process", { lastModified, changeFrequency: "monthly", priority: 0.82 }),
    pageEntry("/rhodes-ranch-las-vegas", {
      lastModified,
      changeFrequency: "weekly",
      priority: 0.92,
    }),
    pageEntry("/rhodes-ranch-lifestyle", {
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    }),
    pageEntry("/map", { lastModified, changeFrequency: "monthly", priority: 0.78 }),
    pageEntry("/locations", { lastModified, changeFrequency: "monthly", priority: 0.83 }),
    pageEntry("/search", { lastModified, changeFrequency: "daily", priority: 0.9 }),
    pageEntry("/rhodes-ranch-mls-listings", {
      lastModified,
      changeFrequency: "daily",
      priority: 0.91,
    }),
    pageEntry("/rhodes-ranch-new-listings", {
      lastModified,
      changeFrequency: "daily",
      priority: 0.88,
    }),
    pageEntry("/rhodes-ranch-homes-under-500k", {
      lastModified,
      changeFrequency: "daily",
      priority: 0.87,
    }),
    pageEntry("/rhodes-ranch-pool-homes", {
      lastModified,
      changeFrequency: "daily",
      priority: 0.87,
    }),
    pageEntry("/open-houses", { lastModified, changeFrequency: "daily", priority: 0.86 }),
    ...WEEKDAY_SLUGS.map((weekday) =>
      pageEntry(`/open-houses/${weekday}`, {
        lastModified,
        changeFrequency: "daily",
        priority: 0.84,
      }),
    ),
    pageEntry("/contact", { lastModified, changeFrequency: "monthly", priority: 0.8 }),
    pageEntry("/questions", { lastModified, changeFrequency: "monthly", priority: 0.84 }),
  ];
}
