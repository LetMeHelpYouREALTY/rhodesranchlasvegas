import Link from "next/link";
import { GbpActionBar } from "@/components/gbp/GbpActionBar";
import { SectionFigure } from "@/components/media/SectionFigure";
import type { SiteImageId } from "@/lib/site-images";
import { siteContact } from "@/lib/site-contact";

type ListingTourSectionProps = {
  heading: string;
  headingId: string;
  body: string;
  imageId?: SiteImageId;
};

/**
 * Heading-matched photo + GBP Call / Directions / Reviews for listing and tour pages.
 */
export function ListingTourSection({
  heading,
  headingId,
  body,
  imageId = "section-private-tour",
}: ListingTourSectionProps) {
  return (
    <section
      className="mt-14 rounded-2xl border border-stone-200/90 bg-gradient-to-br from-white via-white to-emerald-50/40 p-6 shadow-[0_8px_30px_rgb(0_0_0_/0.06)] ring-1 ring-stone-900/5 sm:p-8"
      aria-labelledby={headingId}
    >
      <div className="grid gap-6 md:grid-cols-2 md:items-center">
        <div>
          <h2
            id={headingId}
            className="font-display text-2xl font-semibold tracking-tight text-emerald-950"
          >
            {heading}
          </h2>
          <p className="mt-3 leading-relaxed text-stone-700">{body}</p>
          <GbpActionBar />
          <p className="mt-4 text-sm text-stone-600">
            Or{" "}
            <Link
              href="/contact#schedule"
              className="font-semibold text-emerald-900 underline-offset-2 hover:underline"
            >
              schedule a private conversation
            </Link>{" "}
            with {siteContact.agentName} or {siteContact.secondaryContactName}. Office:{" "}
            {siteContact.fullAddressLine}.
          </p>
        </div>
        <SectionFigure imageId={imageId} caption={heading} />
      </div>
    </section>
  );
}
