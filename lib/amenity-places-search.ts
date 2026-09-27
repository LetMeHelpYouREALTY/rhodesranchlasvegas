/** One Places searchNearby per category per page session (cost control). */
const cache = new Map<string, Promise<google.maps.places.Place[]>>();

export function searchCategory(
  center: google.maps.LatLngLiteral,
  categoryId: string,
  types: string[],
): Promise<google.maps.places.Place[]> {
  let p = cache.get(categoryId);
  if (!p) {
    p = (async () => {
      const { Place } = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
      const { places } = await Place.searchNearby({
        fields: ["displayName", "location", "formattedAddress", "googleMapsURI"],
        locationRestriction: { center, radius: 5000 },
        includedPrimaryTypes: types,
        maxResultCount: 10,
        rankPreference: "POPULARITY" as google.maps.places.SearchNearbyRequest["rankPreference"],
      });
      return places ?? [];
    })();
    p.catch(() => cache.delete(categoryId));
    cache.set(categoryId, p);
  }
  return p;
}

export type AmenityMapPlace = {
  name: string;
  lat: number;
  lng: number;
  address?: string;
  mapsUri?: string;
};

export function placeToAmenityMapPlace(place: google.maps.places.Place): AmenityMapPlace | null {
  const loc = place.location;
  if (!loc) return null;
  const { lat, lng } = loc.toJSON();
  const name =
    typeof place.displayName === "string"
      ? place.displayName
      : place.displayName != null
        ? String(place.displayName)
        : "";
  if (!name) return null;
  return {
    name,
    lat,
    lng,
    address: place.formattedAddress ?? undefined,
    mapsUri: place.googleMapsURI ?? undefined,
  };
}
