"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries } from "@/content/industries";
import { cn } from "@/lib/utils";

/**
 * Section 8 of 15 — industry explorer.
 *
 * Desktop: a chip rail with an animated active indicator and a detail panel.
 * Mobile: the same rail becomes a horizontally-snapping scroller, which is a
 * far better touch pattern than a hover grid or an accordion stack.
 */
export function IndustriesExplorer() {
  const [activeSlug, setActiveSlug] = useState(industries[0].slug);
  const active = industries.find((i) => i.slug === activeSlug) ?? industries[0];

  return (
    <section id="industries" className="section-y rule-t bg-bg-elevated">
      <div className="container-site">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="t-label flex items-center gap-3 text-ink-2">
              <span aria-hidden className="h-px w-6 bg-accent" />
              Industries
            </p>
            <h2 className="t-h2 mt-5 max-w-[22ch]">The engineering is similar. The process knowledge is not.</h2>
          </div>
          <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-2">
            Reading a PLC is the same everywhere. Knowing what a CIP cycle should look like, why a
            loom stops, or what an OEM audit will ask for is not — and that is where projects
            succeed or waste a year.
          </p>
        </div>

        {/* ── Chip rail ─────────────────────────────────────────────────── */}
        <div
          role="tablist"
          aria-label="Industries"
          className="mt-12 flex snap-x gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {industries.map((industry) => {
            const isActive = industry.slug === activeSlug;
            return (
              <button
                key={industry.slug}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls="industry-panel"
                onClick={() => setActiveSlug(industry.slug)}
                className={cn(
                  "shrink-0 snap-start whitespace-nowrap rounded-md border px-4 py-2.5 text-[0.875rem] transition-colors duration-200",
                  isActive
                    ? "border-[var(--accent-line)] bg-[var(--accent-soft)] text-ink"
                    : "border-border text-ink-2 hover:border-border-strong hover:text-ink",
                )}
              >
                {industry.name}
              </button>
            );
          })}
        </div>

        {/* ── Detail panel ──────────────────────────────────────────────── */}
        <div
          id="industry-panel"
          role="tabpanel"
          className="grid grid-cols-1 gap-px border border-border bg-border lg:grid-cols-3"
        >
          <div className="bg-surface p-6 lg:p-8">
            <h3 className="t-h3">{active.name}</h3>
            <p className="mt-4 leading-relaxed text-ink-2">{active.lead}</p>
            <Link
              href={`/industries/${active.slug}`}
              className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] text-accent transition-colors hover:text-accent-hover"
            >
              {active.name} in detail
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>

          <div className="bg-surface p-6 lg:p-8">
            <p className="t-label text-ink-3">Typical problems</p>
            <ul className="mt-4 flex flex-col gap-3">
              {active.problems.slice(0, 4).map((p) => (
                <li key={p} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
                  <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-fault" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface p-6 lg:p-8">
            <p className="t-label text-ink-3">What we build for it</p>
            <ul className="mt-4 flex flex-col gap-3">
              {active.solutions.slice(0, 4).map((s) => (
                <li key={s.title} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
                  <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                  {s.title}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {active.services.slice(0, 3).map((slug) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="rounded-sm border border-border px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-3 transition-colors hover:border-[var(--accent-line)] hover:text-accent"
                >
                  {slug.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
