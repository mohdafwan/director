import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { insights, publishedInsights } from "@/content/insights";
import { getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SpecCard, TechGrid } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Insights — Industrial Engineering Notes",
  description:
    "Practical engineering notes on industrial IoT, protocols, PLC migration, OEE, edge computing and plant data architecture.",
  path: "/insights",
});

export default function InsightsPage() {
  const planned = insights.filter((i) => i.status === "planned");

  return (
    <>
      <section className="relative overflow-hidden rule-b">
        <TechGrid className="opacity-50" />
        <div className="container-site relative pb-16 pt-10 lg:pb-20 lg:pt-14">
          <Breadcrumbs trail={[{ name: "Insights", path: "/insights" }]} />
          <p className="t-label mt-10 flex items-center gap-3 text-ink-2">
            <span aria-hidden className="h-px w-6 bg-accent" />
            Insights
          </p>
          <h1 className="t-h1 mt-6 max-w-[20ch]">Engineering notes, not thought leadership</h1>
          <p className="t-lead mt-7 max-w-[64ch]">
            Each of these answers one question properly — the kind an automation engineer actually
            searches for at eleven at night. Written by the people who do the work, and published
            whether or not it leads to an enquiry.
          </p>
        </div>
      </section>

      {publishedInsights.length > 0 && (
        <Section bordered={false}>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {publishedInsights.map((insight, i) => (
              <Reveal key={insight.slug} delay={(i % 2) * 60} as="li" className="h-full">
                <SpecCard as="article" className="h-full">
                  <Link href={`/insights/${insight.slug}`} className="flex h-full flex-col gap-3 p-6 lg:p-7">
                    <span className="flex items-start justify-between gap-3">
                      <h2 className="t-h4">{insight.title}</h2>
                      <ArrowUpRight
                        aria-hidden
                        className="mt-1 size-4 shrink-0 text-ink-3 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </span>
                    <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                      {insight.description}
                    </p>
                  </Link>
                </SpecCard>
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {/* The editorial pipeline is shown honestly rather than padded out with
          placeholder posts that look published. */}
      <Section bordered={publishedInsights.length > 0} tone="surface">
        <div className="flex flex-col gap-3">
          <p className="t-label flex items-center gap-3 text-ink-2">
            <span aria-hidden className="h-px w-6 bg-border-strong" />
            In the pipeline
          </p>
          <h2 className="t-h2 max-w-[22ch]">
            {publishedInsights.length === 0
              ? "Nothing published yet — here is what is being written"
              : "Coming next"}
          </h2>
          <p className="t-lead max-w-[62ch]">
            We would rather show the plan than pad this page with posts that were not written by an
            engineer. Two per month. If one of these is a question you need answered now, ask us
            directly and we will answer it before it is published.
          </p>
        </div>

        <ul className="mt-12 border-t border-border">
          {planned.map((insight) => {
            const service = getService(insight.relatedService);
            return (
              <li
                key={insight.slug}
                className="grid grid-cols-1 gap-3 border-b border-border py-6 sm:grid-cols-12 sm:gap-6"
              >
                <div className="sm:col-span-9">
                  <h3 className="font-display text-[1.0625rem] font-semibold leading-snug text-ink-2">
                    {insight.title}
                  </h3>
                  <p className="mt-1.5 max-w-[70ch] text-[0.9375rem] leading-relaxed text-ink-3">
                    {insight.description}
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:col-span-3 sm:justify-end">
                  <span className="t-label border border-border px-2.5 py-1 text-ink-3">
                    Planned
                  </span>
                  {service && (
                    <Link
                      href={`/${service.slug}`}
                      className="t-label text-ink-3 transition-colors hover:text-accent"
                    >
                      {service.name}
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button href="/contact" size="lg" withArrow>
            Ask the question directly
          </Button>
          <p className="max-w-[44ch] text-[0.9375rem] text-ink-3">
            An engineer will answer it, whether or not there is a project in it.
          </p>
        </div>
      </Section>
    </>
  );
}
