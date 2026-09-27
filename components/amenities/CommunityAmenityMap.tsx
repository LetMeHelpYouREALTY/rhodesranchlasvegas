"use client";

import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CuratedAmenityList } from "@/components/amenities/CuratedAmenityList";
import {
  placeToAmenityMapPlace,
  searchCategory,
  type AmenityMapPlace,
} from "@/lib/amenity-places-search";
import { loadGoogleMaps, mapsAuthFailed } from "@/lib/google-maps-loader";
import {
  amenityCategories,
  googleMapsEmbedFallbackUrl,
  rhodesRanchCommunity,
  type AmenityCategoryId,
} from "@/lib/rhodes-ranch-community";

const MAP_HEIGHT_CLASS = "min-h-[22rem] h-[28rem] sm:h-[32rem]";

type CommunityAmenityMapProps = {
  defaultCategory?: AmenityCategoryId;
  showCategoryFilters?: boolean;
  showCuratedBesideFallback?: boolean;
  mapAriaLabel?: string;
  /** Pass from a Server Component so Next inlines NEXT_PUBLIC_* at build time. */
  googleMapsApiKey?: string;
  googleMapsMapId?: string;
};

function resolveClientMapsApiKey(prop?: string): string | undefined {
  const fromProp = prop?.trim();
  if (fromProp) return fromProp;
  const literal = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (typeof literal === "string" && literal.trim() !== "") return literal.trim();
  return undefined;
}

function resolveClientMapsMapId(prop?: string): string | undefined {
  const fromProp = prop?.trim();
  if (fromProp) return fromProp;
  const literal = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
  if (typeof literal === "string" && literal.trim() !== "") return literal.trim();
  return undefined;
}

function buildInfoWindowContent(place: AmenityMapPlace): HTMLElement {
  const root = document.createElement("div");
  root.style.maxWidth = "220px";
  root.style.padding = "4px 2px";

  const title = document.createElement("strong");
  title.style.fontSize = "14px";
  title.textContent = place.name;
  root.appendChild(title);

  if (place.address) {
    const addr = document.createElement("p");
    addr.style.margin = "4px 0 0";
    addr.style.fontSize = "13px";
    addr.style.color = "#444";
    addr.textContent = place.address;
    root.appendChild(addr);
  }

  const link = document.createElement("a");
  link.style.marginTop = "8px";
  link.style.display = "inline-block";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Directions";
  const dest =
    place.mapsUri ??
    `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
  link.href = dest;
  root.appendChild(link);

  return root;
}

function buildCommunityInfoWindowContent(): HTMLElement {
  const root = document.createElement("div");
  root.style.maxWidth = "220px";
  root.style.padding = "4px 2px";

  const title = document.createElement("strong");
  title.style.fontSize = "14px";
  title.textContent = rhodesRanchCommunity.name;
  root.appendChild(title);

  const body = document.createElement("p");
  body.style.margin = "4px 0 0";
  body.style.fontSize = "13px";
  body.style.color = "#444";
  body.textContent = `Guard-gated master-planned community — ${rhodesRanchCommunity.locality}, ${rhodesRanchCommunity.city}`;
  root.appendChild(body);

  return root;
}

export function CommunityAmenityMap({
  defaultCategory = "grocery",
  showCategoryFilters = true,
  showCuratedBesideFallback = true,
  mapAriaLabel = "Interactive map of amenities near Rhodes Ranch",
  googleMapsApiKey,
  googleMapsMapId,
}: CommunityAmenityMapProps) {
  const apiKey = resolveClientMapsApiKey(googleMapsApiKey);
  const mapId = resolveClientMapsMapId(googleMapsMapId);
  const center = useMemo<google.maps.LatLngLiteral>(
    () => ({
      lat: rhodesRanchCommunity.center.latitude,
      lng: rhodesRanchCommunity.center.longitude,
    }),
    [],
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const communityMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const [inView, setInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState<AmenityCategoryId>(defaultCategory);
  const activeCategoryRef = useRef<AmenityCategoryId>(defaultCategory);
  const [useFallback, setUseFallback] = useState(() => mapsAuthFailed || !apiKey);
  const [showCuratedList, setShowCuratedList] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const enterFallback = useCallback(() => {
    if (mapRef.current) {
      mapRef.current = null;
    }
    for (const m of markersRef.current) {
      m.setMap(null);
    }
    markersRef.current = [];
    communityMarkerRef.current?.setMap(null);
    communityMarkerRef.current = null;
    infoWindowRef.current?.close();
    infoWindowRef.current = null;
    if (mapContainerRef.current) {
      mapContainerRef.current.replaceChildren();
    }
    setUseFallback(true);
    setShowCuratedList(true);
  }, []);

  useEffect(() => {
    const onAuthFailure = () => enterFallback();
    window.addEventListener("gmaps:auth-failure", onAuthFailure);
    return () => window.removeEventListener("gmaps:auth-failure", onAuthFailure);
  }, [enterFallback]);

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
      if (!map || useFallback) return;

      const category = amenityCategories.find((c) => c.id === categoryId);
      if (!category) return;

      clearMarkers();
      setShowCuratedList(false);
      setStatusMessage("Loading nearby places…");

      try {
        const placesRaw = await searchCategory(center, categoryId, category.primaryTypes);
        const places = placesRaw
          .map(placeToAmenityMapPlace)
          .filter((p): p is AmenityMapPlace => p != null);

        const infoWindow =
          infoWindowRef.current ?? new google.maps.InfoWindow();
        infoWindowRef.current = infoWindow;

        for (const place of places) {
          const marker = new google.maps.Marker({
            position: { lat: place.lat, lng: place.lng },
            map,
            title: place.name,
          });
          marker.addListener("click", () => {
            infoWindow.setContent(buildInfoWindowContent(place));
            infoWindow.open({ map, anchor: marker });
          });
          markersRef.current.push(marker);
        }

        if (places.length === 0) {
          setShowCuratedList(true);
          setStatusMessage("Featured places near Rhodes Ranch for this category.");
        } else {
          setStatusMessage(`${places.length} places shown (confirm hours with each business).`);
        }
      } catch {
        setShowCuratedList(true);
        setStatusMessage("Featured places near Rhodes Ranch for this category.");
      }
    },
    [center, clearMarkers, useFallback],
  );

  const renderPlacesRef = useRef(renderPlaces);

  useEffect(() => {
    activeCategoryRef.current = activeCategory;
  }, [activeCategory]);

  useEffect(() => {
    renderPlacesRef.current = renderPlaces;
  }, [renderPlaces]);

  useEffect(() => {
    if (!inView || !apiKey || useFallback || mapsAuthFailed) return;
    const container = mapContainerRef.current;
    if (!container || mapRef.current) return;

    let cancelled = false;

    loadGoogleMaps(apiKey)
      .then(async () => {
        if (cancelled || mapsAuthFailed) return;
        if (!mapContainerRef.current) {
          enterFallback();
          return;
        }

        const mapOptions: google.maps.MapOptions = {
          center,
          zoom: 13,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        };
        if (mapId) {
          mapOptions.mapId = mapId;
        }

        const map = new google.maps.Map(mapContainerRef.current, mapOptions);
        mapRef.current = map;

        const communityMarker = new google.maps.Marker({
          position: center,
          map,
          title: rhodesRanchCommunity.name,
          zIndex: 1000,
        });
        communityMarker.addListener("click", () => {
          const iw = infoWindowRef.current ?? new google.maps.InfoWindow();
          infoWindowRef.current = iw;
          iw.setContent(buildCommunityInfoWindowContent());
          iw.open({ map, anchor: communityMarker });
        });
        communityMarkerRef.current = communityMarker;

        await renderPlacesRef.current(activeCategoryRef.current);
      })
      .catch(() => {
        if (!cancelled) enterFallback();
      });

    return () => {
      cancelled = true;
    };
  }, [apiKey, center, enterFallback, inView, mapId, useFallback]);

  const selectCategory = (categoryId: AmenityCategoryId) => {
    setActiveCategory(categoryId);
    if (useFallback) {
      setShowCuratedList(true);
      return;
    }
    if (mapRef.current) {
      void renderPlaces(categoryId);
    }
  };

  const embedUrl = googleMapsEmbedFallbackUrl();

  return (
    <div ref={rootRef} className="space-y-4">
      {showCategoryFilters ? (
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
              src={embedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          {showCuratedBesideFallback ? (
            <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm ring-1 ring-stone-900/5">
              <h3 className="font-display text-lg font-semibold text-emerald-950">
                Featured places near {rhodesRanchCommunity.name}
              </h3>
              <p className="mt-1 text-sm text-stone-600">
                Curated anchors buyers ask about—confirm hours with each business.
              </p>
              <CuratedAmenityList className="mt-4" compact categoryFilter={activeCategory} />
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
          {showCuratedList ? (
            <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm ring-1 ring-stone-900/5">
              <h3 className="font-display text-lg font-semibold text-emerald-950">
                Featured places near {rhodesRanchCommunity.name}
              </h3>
              <CuratedAmenityList className="mt-4" compact categoryFilter={activeCategory} />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
