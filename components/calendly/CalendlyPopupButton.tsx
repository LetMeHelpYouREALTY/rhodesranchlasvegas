"use client";

import type { ComponentProps } from "react";
import { usePathname } from "next/navigation";
import { ensureCalendlyReady } from "@/lib/calendly-load";
import { calendlyUrlFor } from "@/lib/calendly-url";
import { cn } from "@/lib/utils";

type CalendlyPopupButtonProps = ComponentProps<"button">;

/** Opens Calendly popup overlay (event picked by page intent). */
export function CalendlyPopupButton({
  className,
  children,
  type = "button",
  onClick,
  ...rest
}: CalendlyPopupButtonProps) {
  const pathname = usePathname() || "/";
  return (
    <button
      {...rest}
      type={type}
      className={cn(className)}
      onClick={async (e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        try {
          await ensureCalendlyReady();
          window.Calendly?.initPopupWidget({ url: calendlyUrlFor(pathname, "popup") });
        } catch {
          // Fallback: user can still use /contact or phone.
        }
      }}
    >
      {children}
    </button>
  );
}
