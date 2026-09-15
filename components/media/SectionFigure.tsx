import { SiteImage } from "@/components/media/SiteImage";
import { SITE_IMAGES, type SiteImageId } from "@/lib/site-images";
import { cn } from "@/lib/utils";

type SectionFigureProps = {
  imageId: SiteImageId;
  /** Visible caption; defaults to the catalog heading for that asset. */
  caption?: string;
  className?: string;
  sizes?: string;
};

/** Photograph beside an h2/h3 — caption repeats the section topic for image SEO. */
export function SectionFigure({
  imageId,
  caption,
  className,
  sizes = "(max-width: 768px) 100vw, 480px",
}: SectionFigureProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <SiteImage
        id={imageId}
        sizes={sizes}
        caption={caption ?? SITE_IMAGES[imageId].heading}
      />
    </div>
  );
}
