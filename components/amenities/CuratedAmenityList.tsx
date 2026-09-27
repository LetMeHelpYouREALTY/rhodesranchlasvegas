import {
  amenityCategories,
  curatedAmenities,
  curatedAmenityFullAddress,
  type AmenityCategoryId,
} from "@/lib/rhodes-ranch-community";

type CuratedAmenityListProps = {
  categoryFilter?: AmenityCategoryId;
  className?: string;
  compact?: boolean;
};

function directionsHrefForAddress(address: string): string {
  return (
    "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address)
  );
}

export function CuratedAmenityList({
  categoryFilter,
  className = "",
  compact = false,
}: CuratedAmenityListProps) {
  const items = categoryFilter
    ? curatedAmenities.filter((a) => a.category === categoryFilter)
    : curatedAmenities;

  const byCategory = amenityCategories
    .map((cat) => ({
      cat,
      places: items.filter((p) => p.category === cat.id),
    }))
    .filter((g) => g.places.length > 0);

  if (items.length === 0) return null;

  return (
    <div className={className}>
      <ul className={compact ? "space-y-3" : "space-y-6"}>
        {byCategory.map(({ cat, places }) => (
          <li key={cat.id}>
            {!categoryFilter ? (
              <h3
                className={
                  compact
                    ? "text-sm font-semibold text-emerald-950"
                    : "font-display text-lg font-semibold text-emerald-950"
                }
              >
                {cat.label}
              </h3>
            ) : null}
            <ul className={compact ? "mt-1 space-y-2" : "mt-3 space-y-3"}>
              {places.map((place) => {
                const address = curatedAmenityFullAddress(place);
                return (
                  <li
                    key={place.name}
                    className={
                      compact
                        ? "text-sm text-stone-700"
                        : "rounded-xl border border-stone-200/80 bg-white p-4 shadow-sm ring-1 ring-stone-900/5"
                    }
                  >
                    <p className="font-medium text-stone-900">{place.name}</p>
                    <p className="mt-0.5 text-stone-600">{address}</p>
                    {place.note ? (
                      <p className="mt-1 text-sm text-stone-600">{place.note}</p>
                    ) : null}
                    <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      <a
                        href={directionsHrefForAddress(address)}
                        className="text-sm font-semibold text-emerald-900 underline-offset-2 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Directions in Google Maps
                      </a>
                      <a
                        href={place.sourceUrl}
                        className="text-sm font-semibold text-stone-700 underline-offset-2 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Official site
                      </a>
                    </p>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
