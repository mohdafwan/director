import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services, spineLabels, spineOrder } from "@/content/services";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/** Section 7 of 15 — the full capability set, grouped by the spine. */
export function WhatWeBuild() {
  return (
    <Section id="what-we-build">
      <Reveal>
        <SectionHeader
          eyebrow="What we build"
          title="Twelve capabilities, one engineering team"
          lead="Grouped by where they sit on the path. Most engagements start in one column and expand into the next — which is why they are delivered by the same people rather than handed between vendors."
        />
      </Reveal>

      <div className="mt-14 border-t border-border">
        {spineOrder.map((stage, si) => {
          const items = services.filter((s) => s.spine === stage);
          return (
            <Reveal key={stage} delay={si * 60}>
              <div className="grid grid-cols-1 gap-6 border-b border-border py-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-3">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent">
                      {String(si + 1).padStart(2, "0")}
                    </span>
                    <h3 className="t-h3">{spineLabels[stage].label}</h3>
                  </div>
                  <p className="mt-2 font-mono text-[0.75rem] text-ink-3">
                    {spineLabels[stage].blurb}
                  </p>
                </div>

                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-9">
                  {items.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/${service.slug}`}
                        className="group flex h-full flex-col gap-2 border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-line)] hover:bg-surface-2"
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span className="t-h4 text-ink">{service.name}</span>
                          <ArrowUpRight
                            aria-hidden
                            className="mt-1 size-4 shrink-0 text-ink-3 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                          />
                        </span>
                        <span className="text-[0.9375rem] leading-relaxed text-ink-2">
                          {service.summary}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={120}>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button href="/what-we-do" variant="secondary" withArrow>
            All capabilities in detail
          </Button>
          <p className="text-[0.9375rem] text-ink-3">
            Not sure which applies? Most plants start with machine monitoring on one line.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
