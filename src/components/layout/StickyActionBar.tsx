"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { telHref, whatsappHref } from "@/config/site";

/**
 * Persistent mobile action bar — Call · WhatsApp · Estimate.
 *
 * The single highest-ROI conversion element on the site for the Indian B2B
 * market, where WhatsApp is the default business channel and most plant-side
 * browsing happens on a phone. Below 1024px only. Hidden on the estimate flow
 * itself, where it would compete with the form.
 */
export function StickyActionBar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/estimate")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg-elevated/95 backdrop-blur-lg lg:hidden">
      <div className="grid grid-cols-3 divide-x divide-[color:var(--color-border)]">
        <a
          href={telHref}
          className="flex h-14 flex-col items-center justify-center gap-0.5 text-ink-2 active:bg-surface"
          data-analytics="contact_call_click"
        >
          <Phone className="size-4" aria-hidden />
          <span className="t-label">Call</span>
        </a>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 flex-col items-center justify-center gap-0.5 text-ink-2 active:bg-surface"
          data-analytics="contact_whatsapp_click"
        >
          <MessageCircle className="size-4" aria-hidden />
          <span className="t-label">WhatsApp</span>
        </a>
        <Link
          href="/estimate"
          className="flex h-14 flex-col items-center justify-center gap-0.5 bg-accent text-ink-inverse"
          data-analytics="cta_click"
        >
          <FileText className="size-4" aria-hidden />
          <span className="t-label">Estimate</span>
        </Link>
      </div>
    </div>
  );
}
