"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { SiteImage } from "@/components/media/SiteImage";
import { publicEnv } from "@/lib/env";
import {
  googleMapsDirectionsWebUrl,
  type GoogleMapsWebTravelMode,
} from "@/lib/google-maps-directions";
import { siteContact } from "@/lib/site-contact";

const DESTINATION = siteContact.fullAddressLine;
const CENTER = {
  lat: siteContact.geo.latitude,
  lng: siteContact.geo.longitude,
} as const;

const TRAVEL_MODES: {
  id: "DRIVING" | "TRANSIT" | "WALKING" | "BICYCLING";
  label: string;
  web: GoogleMapsWebTravelMode;
}[] = [
  { id: "DRIVING", label: "Driving", web: "driving" },
  { id: "TRANSIT", label: "Transit", web: "transit" },
  { id: "WALKING", label: "Walking", web: "walking" },
  { id: "BICYCLING", label: "Bicycling", web: "bicycling" },
];

function loadMapsScript(apiKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const w = window as unknown as { google?: { maps?: unknown } };
  if (w.google?.maps) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const id = "google-maps-js";
    if (document.getElementById(id)) {
      const check = () => {
        const ww = window as unknown as { google?: { maps?: unknown } };
        if (ww.google?.maps) resolve();
        else setTimeout(check, 50);
      };
      check();
      return;
    }
    const s = document.createElement("script");
    s.id = id;
    s.async = true;
    s.defer = true;
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}`;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Could not load Google Maps"));
    document.head.appendChild(s);
  });
}

function DirectionsFallback() {
  return (
    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
      {TRAVEL_MODES.map((m) => (
        <li key={m.id}>
          <a
            href={googleMapsDirectionsWebUrl({ destination: DESTINATION, travelMode: m.web })}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[3rem] items-center justify-center rounded-xl border border-stone-200/90 bg-white px-4 py-3 text-center text-sm font-semibold text-emerald-950 shadow-sm ring-1 ring-stone-900/5 transition hover:border-emerald-800/30 hover:bg-emerald-50/60"
          >
            {m.label} — open in Google Maps
          </a>
        </li>
      ))}
    </ul>
  );
}

export function DirectionsToOffice() {
  const apiKey = publicEnv.googleMapsApiKey;
  const baseId = useId();
  const inputId = `${baseId}-origin`;
  const mapRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const dirServiceRef = useRef<unknown>(null);
  const dirRendererRef = useRef<unknown>(null);

  const [origin, setOrigin] = useState("");
  const [mode, setMode] = useState<(typeof TRAVEL_MODES)[number]>(TRAVEL_MODES[0]!);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!apiKey || !mapRef.current) return;
    let cancelled = false;
    (async () => {
      try {
        await loadMapsScript(apiKey);
        if (cancelled || !mapRef.current) return;
        const w = window as unknown as {
          google: {
            maps: {
              Map: new (el: HTMLElement, opts: object) => unknown;
              DirectionsService: new () => {
                route: (
                  req: object,
                  cb: (r: object | null, s: string) => void,
                ) => void;
              };
              DirectionsRenderer: new (options?: {
                map?: unknown;
                suppressMarkers?: boolean;
              }) => {
                setMap: (m: unknown) => void;
                setPanel: (el: HTMLElement) => void;
                setDirections: (r: object) => void;
              };
              TravelMode: Record<string, string>;
            };
          };
        };
        if (!w.google?.maps) return;
        const g = w.google.maps;
        const map = new g.Map(mapRef.current, {
          center: CENTER,
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
        });
        const directionsService = new g.DirectionsService();
        const directionsRenderer = new g.DirectionsRenderer({
          map,
          suppressMarkers: false,
        });
        if (panelRef.current) directionsRenderer.setPanel(panelRef.current);
        dirServiceRef.current = directionsService;
        dirRendererRef.current = directionsRenderer;
        if (!cancelled) setMapReady(true);
      } catch {
        if (!cancelled) setError("Could not load the map. Use the links below to open Google Maps.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiKey]);

  const runRoute = useCallback(() => {
    setError(null);
    if (!apiKey) return;
    if (!origin.trim()) {
      setError("Enter a starting address, neighborhood, or place name.");
      return;
    }
    const w = window as unknown as {
      google: { maps: { TravelMode: Record<string, unknown> } };
    };
    if (!w.google?.maps) return;
    const service = dirServiceRef.current as {
      route: (req: object, cb: (r: object | null, s: string) => void) => void;
    } | null;
    const renderer = dirRendererRef.current as { setDirections: (r: object) => void } | null;
    if (!service || !renderer) return;
    const travelMode = w.google.maps.TravelMode[mode.id];
    if (travelMode == null) {
      setError("This travel mode is not available. Try another mode or use Google Maps below.");
      return;
    }
    setLoading(true);
    service.route(
      {
        origin: origin.trim(),
        destination: DESTINATION,
        travelMode,
        region: "US",
      },
      (result, status) => {
        setLoading(false);
        if (status === "OK" && result) {
          renderer.setDirections(result as object);
        } else {
          setError(
            status === "ZERO_RESULTS"
              ? "No route found for that start and mode. Try another address or open Google Maps below."
              : `Directions request failed (${status}). Try a different start point or use the links below.`,
          );
        }
      },
    );
  }, [apiKey, mode, origin]);

  return (
    <section
      className="rounded-2xl border border-stone-200/90 bg-gradient-to-b from-white to-stone-50/50 p-6 shadow-[0_8px_30px_rgb(0_0_0_/0.05)] ring-1 ring-stone-900/5 sm:p-8"
      aria-labelledby={`${baseId}-heading`}
    >
      <h3
        id={`${baseId}-heading`}
        className="font-display text-2xl font-semibold tracking-tight text-emerald-950"
      >
        Plan your visit — directions
      </h3>
      <SiteImage
        id="section-key-locations"
        sizes="(max-width: 768px) 100vw, 480px"
        caption="Plan your visit — directions"
        className="mt-4 max-w-xl"
      />
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
        {apiKey
          ? "Enter where you are starting from and pick a travel mode. Estimated time and distance appear from Google’s Directions service when a route is available."
          : "Open turn-by-turn directions in Google Maps for our office. Pick a mode below; in Maps, add your starting point to see travel time. To show routes on this page, add a Maps JavaScript API key (see .env.example)."}
      </p>
      {apiKey && !mapReady && !error && (
        <p className="mt-3 text-sm text-stone-500" aria-live="polite">
          Loading map from Google…
        </p>
      )}
      {error ? (
        <p className="mt-3 text-sm text-amber-900" role="alert">
          {error}
        </p>
      ) : null}
      {apiKey && (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div
            ref={mapRef}
            className="min-h-[240px] w-full overflow-hidden rounded-xl border border-stone-200/90 bg-stone-100 lg:min-h-[360px]"
            title="Map preview"
            aria-label="Map showing directions to the office"
          />
          <div
            ref={panelRef}
            className="max-h-[min(24rem,50vh)] min-h-[200px] overflow-y-auto rounded-xl border border-stone-200/90 bg-white p-3 text-sm text-stone-800 shadow-inner"
          />
        </div>
      )}
      {apiKey && (
        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor={inputId}
              className="text-sm font-medium text-stone-800"
            >
              Starting from
            </label>
            <input
              id={inputId}
              type="text"
              name="origin"
              autoComplete="street-address"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. Downtown Summerlin, or your street address"
              className="mt-1.5 w-full max-w-lg rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 shadow-sm placeholder:text-stone-400 focus:border-emerald-800/40 focus:outline-none focus:ring-2 focus:ring-emerald-800/20"
            />
          </div>
          <fieldset>
            <legend className="text-sm font-medium text-stone-800">Travel mode</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {TRAVEL_MODES.map((m) => (
                <label
                  key={m.id}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-stone-200/90 bg-white px-3.5 py-1.5 text-sm font-medium text-stone-800 has-[:checked]:border-emerald-800/40 has-[:checked]:bg-emerald-50/80 has-[:checked]:text-emerald-950"
                >
                  <input
                    type="radio"
                    name={`${baseId}-travelmode`}
                    className="sr-only"
                    checked={mode.id === m.id}
                    onChange={() => {
                      setMode(m);
                    }}
                  />
                  {m.label}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={runRoute}
              disabled={loading || (!!apiKey && !mapReady)}
              className="rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white shadow shadow-emerald-950/20 ring-1 ring-white/10 transition hover:bg-emerald-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Calculating…" : "Show route and travel time"}
            </button>
            <span className="text-xs text-stone-500">
              Destination: {siteContact.address.streetAddress} ({siteContact.businessName})
            </span>
          </div>
        </div>
      )}
      {!apiKey && (
        <p className="mt-2 text-sm font-medium text-stone-800">
          Office address: {DESTINATION}
        </p>
      )}

      <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-stone-500">
        {apiKey ? "Or open in Google Maps" : "Get directions in Google Maps"}
      </h3>
      <DirectionsFallback />
    </section>
  );
}
