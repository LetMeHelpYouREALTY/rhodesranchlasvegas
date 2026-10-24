/** Calendly embed script (`assets.calendly.com/assets/external/widget.js`) — minimal surface. */

export type CalendlyBadgeOptions = {
  url: string;
  text: string;
  color: string;
  textColor: string;
  branding: boolean;
};

export type CalendlyPopupOptions = {
  url: string;
};

export type CalendlyInlineOptions = {
  url: string;
  parentElement: HTMLElement;
};

declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (options: CalendlyBadgeOptions) => void;
      initPopupWidget: (options: CalendlyPopupOptions) => void;
      initInlineWidget: (options: CalendlyInlineOptions) => void;
      destroyBadgeWidget?: () => void;
    };
  }
}

export {};
