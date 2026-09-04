import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Placeholder wordmark.
 *
 * The mark is a stylised signal path — three rising nodes joined by a line,
 * reading as "machine → edge → insight". It is deliberately simple and
 * monochrome-safe so it survives on a panel label, an invoice and a favicon.
 *
 * Replace with the final logo asset when brand design is complete; the layout
 * around it does not need to change.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <path
          d="M3 20 L9.5 20 L13 13 L16.5 6 L23 6"
          stroke="var(--color-accent)"
          strokeWidth="1.75"
          strokeLinecap="square"
        />
        <rect x="1.5" y="18.5" width="3" height="3" fill="var(--color-accent)" />
        <rect x="11.5" y="11.5" width="3" height="3" fill="var(--color-ink)" />
        <rect x="21.5" y="4.5" width="3" height="3" fill="var(--color-data)" />
      </svg>
      <span className="font-display text-[1.0625rem] font-bold tracking-tight text-ink">
        {site.wordmark}
      </span>
    </span>
  );
}
