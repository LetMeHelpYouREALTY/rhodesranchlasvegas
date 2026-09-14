import Link from "next/link";
import type { BreadcrumbCrumb } from "@/lib/schema";
import { cn } from "@/lib/utils";

type PageBreadcrumbsProps = {
  items: BreadcrumbCrumb[];
  className?: string;
};

/** Visible breadcrumbs that should match BreadcrumbList JSON-LD on the same page. */
export function PageBreadcrumbs({ items, className }: PageBreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6 text-sm text-stone-600", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.path}-${item.name}`} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-stone-400">
                  /
                </span>
              ) : null}
              {last ? (
                <span className="font-medium text-stone-800">{item.name}</span>
              ) : (
                <Link href={item.path} className="text-emerald-900 underline-offset-2 hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
