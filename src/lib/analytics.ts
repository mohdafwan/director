import { site } from "@/config/site";

/**
 * Thin analytics wrapper.
 *
 * No-ops until a GA4 measurement ID is set in `src/config/site.ts`, so the site
 * ships without a tag and without errors. Event names match the conversion
 * tracking plan in docs/02-SITEMAP-AND-UX.md §9.4.
 *
 * Only `generate_lead` should be imported as a Google Ads conversion, and only
 * after server-side validation — so bidding optimises on qualified enquiries
 * rather than on form spam.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | "cta_click"
  | "contact_call_click"
  | "contact_whatsapp_click"
  | "form_start"
  | "estimate_step_view"
  | "estimate_submit"
  | "generate_lead"
  | "demo_interact";

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  if (!site.analytics.ga4Id) return;
  window.gtag?.("event", event, params);
}

/**
 * Delegated click tracking for the `data-analytics` attributes used across the
 * layout (phone links, WhatsApp links, sticky bar). One listener for the whole
 * document rather than a handler per element.
 */
export function initClickTracking(): () => void {
  const handler = (e: Event) => {
    const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-analytics]");
    if (!target) return;
    const name = target.dataset.analytics as AnalyticsEvent | undefined;
    if (!name) return;
    track(name, { page: window.location.pathname, label: target.textContent?.trim().slice(0, 60) });
  };
  document.addEventListener("click", handler, { capture: true });
  return () => document.removeEventListener("click", handler, { capture: true });
}
