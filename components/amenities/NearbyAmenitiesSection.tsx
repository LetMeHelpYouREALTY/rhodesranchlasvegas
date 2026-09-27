import Link from "next/link";
import { CommunityAmenityMap } from "@/components/amenities/CommunityAmenityMap";
import { rhodesRanchCommunity } from "@/lib/rhodes-ranch-community";

type NearbyAmenitiesSectionProps = {
  /** h2 on dedicated routes; h3 on hub pages with multiple h2 sections */
  titleLevel?: 2 | 3;
  className?: string;
  defaultCategory?: "grocery" | "golf" | "restaurants";
};

export function NearbyAmenitiesSection({
  titleLevel = 3,
  className = "mt-10",
  defaultCategory = "grocery",
}: NearbyAmenitiesSectionProps) {
  const TitleTag: "h2" | "h3" = titleLevel === 2 ? "h2" : "h3";
  const headingId = "nearby-amenities-section-heading";

  return (
    <section
      className={`rounded-2xl border border-stone-200/90 bg-gradient-to-br from-white via-white to-emerald-50/30 p-6 shadow-[0_8px_30px_rgb(0_0_0_/0.06)] ring-1 ring-stone-900/5 sm:p-8 ${className}`}
      aria-labelledby={headingId}
    >
      <TitleTag
        id={headingId}
        className="font-display text-2xl font-semibold tracking-tight text-emerald-950 sm:text-[1.65rem]"
      >
        Life near {rhodesRanchCommunity.name}: what&apos;s nearby
      </TitleTag>
      <p className="mt-3 max-w-3xl text-stone-700">
        Explore grocery, golf, healthcare, dining, and more around guard-gated{" "}
        {rhodesRanchCommunity.fullLabel}. Filter the map, then open the full guide for commute
        context and buyer FAQs.
      </p>
      <div className="mt-6">
        <CommunityAmenityMap
          defaultCategory={defaultCategory}
          showCuratedBesideFallback={false}
        />
      </div>
      <p className="mt-5">
        <Link
          href="/nearby-amenities"
          className="text-sm font-semibold text-emerald-900 underline-offset-2 hover:underline"
        >
          Full nearby amenities guide for {rhodesRanchCommunity.name}, {rhodesRanchCommunity.city}
        </Link>
      </p>
    </section>
  );
}
