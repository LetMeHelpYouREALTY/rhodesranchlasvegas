"use client";

import { useEffect } from "react";
import { siteContact } from "@/lib/site-contact";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold text-emerald-950">Something went wrong</h1>
      <p className="mt-3 max-w-md text-sm text-slate-700">
        Please try again. If the problem continues, call using the number below or the site header /
        footer.
      </p>
      <p className="mt-4 max-w-md text-sm text-stone-700">
        <a
          href={siteContact.phoneTelHref}
          className="font-semibold text-emerald-900 hover:underline"
        >
          {siteContact.phoneDisplay}
        </a>
        <span className="block text-xs text-stone-500 sm:inline sm:ml-2">
          · {siteContact.fullAddressLine}
        </span>
        <span className="mt-1 block text-xs text-stone-500">
          {siteContact.hoursSummaryLine}
        </span>
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"
      >
        Try again
      </button>
    </div>
  );
}
