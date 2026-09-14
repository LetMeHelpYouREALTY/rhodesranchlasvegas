import type { ReactNode } from "react";
import { SiteImage } from "@/components/media/SiteImage";
import { SITE_IMAGES, type SiteImageId } from "@/lib/site-images";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  imageId: SiteImageId;
  children: ReactNode;
  className?: string;
};

/**
 * Page H1 column + matching photograph (LCP on the image, heading stays in text for contrast).
 */
export function PageHero({ imageId, children, className }: PageHeroProps) {
  return (
    <header
      className={cn(
        "grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10",
        className,
      )}
    >
      <div className="min-w-0">{children}</div>
      <SiteImage
        id={imageId}
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        caption={SITE_IMAGES[imageId].heading}
      />
    </header>
  );
}
