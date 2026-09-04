import { Plus } from "lucide-react";
import type { Faq } from "@/content/types";

/**
 * FAQ list built on native <details>/<summary>.
 *
 * No JavaScript at all: it works before hydration, it is keyboard operable and
 * screen-reader correct for free, and browser find-in-page can open a closed
 * answer. The rotation is a CSS transform on the marker icon.
 */
export function FaqList({ items, className }: { items: readonly Faq[]; className?: string }) {
  return (
    <div className={className}>
      {items.map((item) => (
        <details
          key={item.q}
          className="group border-b border-border first:border-t [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left">
            <h3 className="font-display text-[1.0625rem] font-semibold leading-snug text-ink transition-colors duration-150 group-hover:text-accent lg:text-[1.125rem]">
              {item.q}
            </h3>
            <Plus
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-ink-3 transition-transform duration-200 ease-out group-open:rotate-45 group-hover:text-accent"
            />
          </summary>
          <div className="pb-6 pr-10">
            <p className="max-w-[72ch] leading-relaxed text-ink-2">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
