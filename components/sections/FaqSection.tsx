import type { FaqItem } from "@/lib/schema";
import { SectionFigure } from "@/components/media/SectionFigure";
import type { SiteImageId } from "@/lib/site-images";

type FaqSectionProps = {
  id: string;
  heading: string;
  items: FaqItem[];
  /**
   * h2: dedicated FAQ routes (e.g. /questions). h3: hub pages where max three h2/slot is reserved for page-level sections.
   */
  titleLevel?: 2 | 3;
  imageId?: SiteImageId;
};

export function FaqSection({
  id,
  heading,
  items,
  titleLevel = 3,
  imageId,
}: FaqSectionProps) {
  const TitleTag: "h2" | "h3" = titleLevel === 2 ? "h2" : "h3";
  const QuestionTag: "h3" | "h4" = titleLevel === 2 ? "h3" : "h4";
  return (
    <section aria-labelledby={id} className="space-y-6">
      {imageId ? (
        <SectionFigure imageId={imageId} caption={heading} className="max-w-xl" />
      ) : null}
      <TitleTag
        id={id}
        className="font-display text-2xl font-semibold tracking-tight text-emerald-950"
      >
        {heading}
      </TitleTag>
      <div className="space-y-6">
        {items.map((item) => (
          <article
            key={item.question}
            className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_4px_20px_rgb(0_0_0_/0.04)] ring-1 ring-stone-900/5"
          >
            <QuestionTag className="text-lg font-medium text-stone-900">{item.question}</QuestionTag>
            <p className="mt-2 text-sm leading-relaxed text-stone-700">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
