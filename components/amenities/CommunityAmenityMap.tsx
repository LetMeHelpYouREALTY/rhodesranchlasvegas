"use client";

import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { CuratedAmenityList } from "@/components/amenities/CuratedAmenityList";
import { publicEnv } from "@/lib/env";
import {
  loadGoogleMapsJs,
  type GoogleMapsWindow,
  type GoogleMarker,
  type NearbyPlaceResult,
} from "@/lib/google-maps-js";
import {
  amenityCategories,
  googleMapsEmbedFallbackUrl,
  rhodesRanchCommunity,
  type AmenityCategoryId,
} from "@/lib/rhodes-ranch-community";

const MAP_HEIGHT_CLASS = "min-h-[22rem] h-[28rem] sm:h-[32rem]";
const SEARCH_RADIUS_M = 8000;

/** Opaque handle returned by `google.maps.Map` — typed loosely to avoid bundling @types/google.maps. */
type GoogleMapHandle = object;
type GoogleInfoWindowHandle = {
  setContent: (html: string) => void;
  open: (opts: { map: GoogleMapHandle; anchor?: GoogleMarker }) => void;
};

type CommunityAmenityMapProps = {
  defaultCategory?: AmenityCategoryId;
  showCategoryFilters?: boolean;
  /** Show curated list beside/below fallback */
  showCuratedBesideFallback?: boolean;
  mapAriaLabel?: string;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function infoWindowHtml(place: NearbyPlaceResult): string {
  const rating =
    place.rating != null ? `<p style="margin:4px 0 0;font-size:13px">Rating: ${place.rating}</p>` : "";
  const address = place.address
    ? `<p style="margin:4px 0 0;font-size:13px;color:#444">${escapeHtml(place.address)}</p>`
    : "";
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
  return `<div style="max-width:220px;padding:4px 2px">
    <strong style="font-size:14px">${escapeHtml(place.name)}</strong>
    ${rating}
    ${address}
    <p style="margin:8px 0 0"><a href="${dirUrl}" target="_blank" rel="noopener noreferrer">Directions</a></p>
  </div>`;
}

function communityMarkerHtml(): string {
  return `<div style="max-width:220px;padding:4px 2px">
    <strong style="font-size:14px">${escapeHtml(rhodesRanchCommunity.name)}</strong>
    <p style="margin:4px 0 0;font-size:13px;color:#444">Guard-gated master-planned community — ${escapeHtml(rhodesRanchCommunity.locality)}, ${escapeHtml(rhodesRanchCommunity.city)}</p>
  </div>`;
}

async function searchNearbyPlaces(
  categoryId: AmenityCategoryId,
  center: { lat: number; lng: number },
  map: GoogleMapHandle,
): Promise<NearbyPlaceResult[]> {
  const w = window as GoogleMapsWindow;
  const g = w.google?.maps;
  if (!g) return [];

  const category = amenityCategories.find((c) => c.id === categoryId);
  if (!category) return [];

  const primaryType = category.primaryTypes[0];

  try {
    const lib = (await g.importLibrary("places")) as {
      Place?: {
        searchNearby: (req: Record<string, unknown>) => Promise<{
          places?: Array<{
            displayName?: string;
            location?: { lat: () => number; lng: () => number };
            formattedAddress?: string;
            rating?: number;
          }>;
        }>;
      };
    };
    const Place = lib.Place;
    if (Place?.searchNearby) {
      const { places } = await Place.searchNearby({
        fields: ["displayName", "location", "formattedAddress", "rating"],
        locationRestriction: {
          center,
          radius: SEARCH_RADIUS_M,
        },
        includedPrimaryTypes: category.primaryTypes,
        maxResultCount: 20,
      });
      if (places?.length) {
        const out: NearbyPlaceResult[] = [];
        for (const p of places) {
          const lat = p.location?.lat();
          const lng = p.location?.lng();
          if (lat == null || lng == null || !p.displayName) continue;
          out.push({
            name: p.displayName,
            lat,
            lng,
            address: p.formattedAddress,
            rating: p.rating,
          });
        }
        return out;
      }
    }
  } catch {
    /* fall through to legacy PlacesService */
  }

  const placesService = g.places?.PlacesService;
  const statusOk = g.places?.PlacesServiceStatus?.OK ?? "OK";
  if (!placesService) return [];

  return new Promise((resolve) => {
    const service = new placesService(map as never);
    service.nearbySearch(
      {
        location: new g.LatLng(center.lat, center.lng),
        radius: SEARCH_RADIUS_M,
        type: primaryType,
      },
      (results, status) => {
        if (status !== statusOk || !results?.length) {
          resolve([]);
          return;
        }
        const mapped: NearbyPlaceResult[] = [];
        for (const r of results) {
          const lat = r.geometry?.location?.lat();
          const lng = r.geometry?.location?.lng();
          if (lat == null || lng == null || !r.name) continue;
          mapped.push({
            name: r.name,
            lat,
            lng,
            address: r.vicinity ?? r.formatted_address,
            rating: r.rating,
          });
        }
        resolve(mapped);
      },
    );
  });
}

export function CommunityAmenityMap({
  defaultCategory = "grocery",
  showCategoryFilters = true,
  showCuratedBesideFallback = true,
  mapAriaLabel = "Interactive map of amenities near Rhodes Ranch",
}: CommunityAmenityMapProps) {
  const apiKey = publicEnv.googleMapsApiKey;
  const mapId = publicEnv.googleMapsMapId;
  const center = {
    lat: rhodesRanchCommunity.center.latitude,
    lng: rhodesRanchCommunity.center.longitude,
  };

  const rootRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<GoogleMapHandle | null>(null);
  const markersRef = useRef<GoogleMarker[]>([]);
  const communityMarkerRef = useRef<GoogleMarker | null>(null);
  const infoWindowRef = useRef<GoogleInfoWindowHandle | null>(null);

  const [inView, setInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState<AmenityCategoryId>(defaultCategory);
  const activeCategoryRef = useRef<AmenityCategoryId>(defaultCategory);
  const [loadFailed, setLoadFailed] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      startTransition(() => setInView(true));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );
    obs.observe(root);
    return () => obs.disconnect();
  }, []);

  const clearMarkers = useCallback(() => {
    for (const m of markersRef.current) {
      m.setMap(null);
    }
    markersRef.current = [];
  }, []);

  const renderPlaces = useCallback(
    async (categoryId: AmenityCategoryId) => {
      const map = mapRef.current;
      const w = window as GoogleMapsWindow;
      const g = w.google?.maps;
      if (!map || !g) return;

      clearMarkers();
      setStatusMessage("Loading nearby places…");

      const places = await searchNearbyPlaces(categoryId, center, map);
      const infoWindow: GoogleInfoWindowHandle =
        infoWindowRef.current ?? (new g.InfoWindow() as GoogleInfoWindowHandle);
      infoWindowRef.current = infoWindow;

      for (const place of places) {
        const marker = new g.Marker({
          position: { lat: place.lat, lng: place.lng },
          map,
          title: place.name,
        });
        marker.addListener("click", () => {
          infoWindow.setContent(infoWindowHtml(place));
          infoWindow.open({ map, anchor: marker });
        });
        markersRef.current.push(marker);
      }

      if (places.length === 0) {
        setStatusMessage("No results for this filter—try another category or see the curated list.");
      } else {
        setStatusMessage(`${places.length} places shown (verify hours with each business).`);
      }
    },
    [center.lat, center.lng, clearMarkers],
  );

  const renderPlacesRef = useRef(renderPlaces);

  useEffect(() => {
    activeCategoryRef.current = activeCategory;
  }, [activeCategory]);

  useEffect(() => {
    renderPlacesRef.current = renderPlaces;
  }, [renderPlaces]);

  useEffect(() => {
    if (!inView || !apiKey || loadFailed) return;
    const container = mapContainerRef.current;
    if (!container || mapRef.current) return;

    let cancelled = false;

    loadGoogleMapsJs(apiKey, ["places"])
      .then(() => {
        if (cancelled) return;
        const w = window as GoogleMapsWindow;
        const g = w.google?.maps;
        if (!g || !mapContainerRef.current) {
          setLoadFailed(true);
          return;
        }

        const mapOptions: Record<string, unknown> = {
          center,
          zoom: 13,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        };
        if (mapId) {
          mapOptions.mapId = mapId;
        }

        const map = new g.Map(mapContainerRef.current, mapOptions);
        mapRef.current = map;

        const communityMarker = new g.Marker({
          position: center,
          map,
          title: rhodesRanchCommunity.name,
          zIndex: 1000,
        });
        communityMarker.addListener("click", () => {
          const iw: GoogleInfoWindowHandle =
            infoWindowRef.current ?? (new g.InfoWindow() as GoogleInfoWindowHandle);
          infoWindowRef.current = iw;
          iw.setContent(communityMarkerHtml());
          iw.open({ map, anchor: communityMarker });
        });
        communityMarkerRef.current = communityMarker;

        void renderPlacesRef.current(activeCategoryRef.current);
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [apiKey, center.lat, center.lng, inView, loadFailed, mapId]);

  const selectCategory = (categoryId: AmenityCategoryId) => {
    setActiveCategory(categoryId);
    if (mapRef.current) {
      void renderPlaces(categoryId);
    }
  };

  const useFallback = !apiKey || loadFailed;

  return (
    <div ref={rootRef} className="space-y-4">
      {showCategoryFilters && !useFallback ? (
        <div
          className="flex flex-wrap gap-2"
          role="toolbar"
          aria-label="Filter amenities on the map"
        >
          {amenityCategories.map((cat) => {
            const pressed = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={pressed}
                aria-label={cat.ariaLabel}
                onClick={() => selectCategory(cat.id)}
                className={
                  pressed
                    ? "rounded-full bg-emerald-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm"
                    : "rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-800 hover:border-emerald-800/40 hover:bg-emerald-50/80"
                }
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      ) : null}

      {useFallback ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <div
            className={`overflow-hidden rounded-2xl border border-stone-200/90 bg-stone-100 shadow-inner ring-1 ring-stone-900/5 ${MAP_HEIGHT_CLASS}`}
          >
            <iframe
              title="Map of Rhodes Ranch, Spring Valley, Las Vegas"
              src={googleMapsEmbedFallbackUrl()}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          {showCuratedBesideFallback ? (
            <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm ring-1 ring-stone-900/5">
              <h3 className="font-display text-lg font-semibold text-emerald-950">
                Curated nearby places
              </h3>
              <p className="mt-1 text-sm text-stone-600">
                Shown when the interactive map API key is not set. Add{" "}
                <code className="text-xs">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in Vercel for live
                Places search.
              </p>
              <CuratedAmenityList className="mt-4" compact />
            </div>
          ) : null}
        </div>
      ) : (
        <>
          <div
            className={`relative overflow-hidden rounded-2xl border border-stone-200/90 bg-stone-100 shadow-inner ring-1 ring-stone-900/5 ${MAP_HEIGHT_CLASS}`}
            role="region"
            aria-label={mapAriaLabel}
          >
            {!inView ? (
              <div
                className="flex h-full items-center justify-center text-sm text-stone-600"
                aria-live="polite"
              >
                Map loads when you scroll here…
              </div>
            ) : null}
            <div ref={mapContainerRef} className="h-full w-full" tabIndex={0} />
          </div>
          {statusMessage ? (
            <p className="text-sm text-stone-600" aria-live="polite">{statusMessage}</p>
          ) : null}
        </>
      )}
    </div>
  );
}
