/** Load the Google Maps JavaScript API once (client-only). */
export function loadGoogleMapsJs(
  apiKey: string,
  libraries: string[] = ["places"],
): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps loads only in the browser"));
  }

  const w = window as GoogleMapsWindow;
  if (w.google?.maps) {
    return Promise.resolve();
  }

  const libParam = libraries.length > 0 ? `&libraries=${libraries.join(",")}` : "";
  const src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}${libParam}&loading=async`;

  return new Promise((resolve, reject) => {
    const existing = document.getElementById("google-maps-js") as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Could not load Google Maps")),
        { once: true },
      );
      if (w.google?.maps) resolve();
      return;
    }

    const s = document.createElement("script");
    s.id = "google-maps-js";
    s.async = true;
    s.defer = true;
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Could not load Google Maps"));
    document.head.appendChild(s);
  });
}

export type GoogleMapsWindow = Window & {
  google?: {
    maps: {
      Map: new (el: HTMLElement, opts: Record<string, unknown>) => GoogleMap;
      LatLng: new (lat: number, lng: number) => GoogleLatLng;
      LatLngBounds: new () => GoogleLatLngBounds;
      InfoWindow: new (opts?: Record<string, unknown>) => GoogleInfoWindow;
      Marker: new (opts?: Record<string, unknown>) => GoogleMarker;
      importLibrary: (name: string) => Promise<unknown>;
      places?: {
        PlacesService: new (map: GoogleMap) => GooglePlacesService;
        PlacesServiceStatus: { OK: string };
      };
    };
  };
};

export type GoogleLatLng = { lat: () => number; lng: () => number };
export type GoogleLatLngBounds = {
  extend: (latLng: GoogleLatLng | { lat: number; lng: number }) => void;
};
export type GoogleMap = {
  setCenter: (c: { lat: number; lng: number }) => void;
  fitBounds: (b: GoogleLatLngBounds, padding?: number) => void;
};
export type GoogleMarker = {
  setMap: (map: object | null) => void;
  addListener: (event: string, fn: () => void) => void;
};
export type GoogleInfoWindow = {
  setContent: (html: string) => void;
  open: (opts: { map: GoogleMap; anchor?: GoogleMarker }) => void;
  close: () => void;
};

export type NearbyPlaceResult = {
  name: string;
  lat: number;
  lng: number;
  address?: string;
  rating?: number;
};

export type GooglePlacesService = {
  nearbySearch: (
    request: {
      location: GoogleLatLng | { lat: number; lng: number };
      radius: number;
      type?: string;
    },
    callback: (
      results: Array<{
        name?: string;
        geometry?: { location?: { lat: () => number; lng: () => number } };
        vicinity?: string;
        formatted_address?: string;
        rating?: number;
      }> | null,
      status: string,
    ) => void,
  ) => void;
};
