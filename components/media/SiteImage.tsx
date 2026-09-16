"use client";

import { useState } from "react";
import Image from "next/image";
import {
  isRemoteSiteImageSrc,
  localSiteImagePath,
  siteImageSrc,
} from "@/lib/cloudflare-images";
import { SITE_IMAGES, type SiteImageId } from "@/lib/site-images";
import { cn } from "@/lib/utils";

type SiteImageProps = {
  id: SiteImageId;
  /** Override default heading-matched alt (keep location/service language). */
  alt?: string;
  /** Hero / LCP: eager load + high fetch priority (Next.js 16; `priority` is deprecated). */
  priority?: boolean;
  sizes?: string;
  className?: string;
  caption?: string;
};

/**
 * Heading-matched photograph. Serves Cloudflare hosted Images when the account hash is set;
 * otherwise the git-backed file in `public/images/` (Vercel Image Optimization).
 * If a hosted URL 404s (upload still pending), fall back to the git copy.
 */
export function SiteImage({
  id,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 640px",
  className,
  caption,
}: SiteImageProps) {
  const meta = SITE_IMAGES[id];
  const remoteOrLocal = siteImageSrc(id);
  const local = localSiteImagePath(id);
  const [src, setSrc] = useState(remoteOrLocal);

  const image = (
    <Image
      src={src}
      alt={alt ?? meta.alt}
      width={meta.width}
      height={meta.height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      unoptimized={isRemoteSiteImageSrc(src)}
      onError={() => {
        if (src !== local) setSrc(local);
      }}
      className={cn(
        "h-auto w-full rounded-2xl object-cover shadow-[0_8px_30px_rgb(0_0_0_/0.08)] ring-1 ring-stone-900/5",
        className,
      )}
    />
  );

  if (!caption) return image;

  return (
    <figure className="space-y-2">
      {image}
      <figcaption className="text-xs leading-relaxed text-stone-500">{caption}</figcaption>
    </figure>
  );
}
