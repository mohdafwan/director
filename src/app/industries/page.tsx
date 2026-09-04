import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { industries } from "@/content/industries";
import { buildMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SpecCard, TechGrid } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Industries We Work In",
  description:
    "Industrial IoT, automation and monitoring for manufacturing, automotive, pharmaceutical, food and beverage, textile, packaging, chemical, energy and logistics.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={itemListSchema(
          industries.map((i) => ({
            name: i.name,
            path: `/industries/${i.slug}`,
            description: i.short,
          })),
        )}
      />

      <section className="relative overflow-hidden rule-b">
        <TechGrid className="opacity-50" />
        <div className="container-site relative pb-16 pt-10 lg:pb-20 lg:pt-14">
          <Breadcrumbs trail={[{ name: "Industries", path: "/industries" }]} />
          <p className="t-label mt-10 flex items-center gap-3 text-ink-2">
            <span aria-hidden className="h-px w-6 bg-accent" />
            Industries
          </p>
          <h1 className="t-h1 mt-6 max-w-[22ch]">
            The engineering is similar. The process knowledge is not.
          </h1>
          <p className="t-lead mt-7 max-w-[64ch]">
            Reading a PLC is the same in every sector. Knowing what a CIP cycle should look like,
            why a loom stops, what an automotive OEM audit will ask for, or which parameter a
            regulator cares about is not — and that knowledge is the difference between a project
            that lands and a year of expensive learning.
          </p>
          <Button href="/contact" size="lg" className="mt-9" withArrow>
            Tell us what you make
          </Button>
        </div>
      </section>

      <Section bordered={false}>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <Reveal key={industry.slug} delay={(i % 3) * 60} as="li" className="h-full">
              <SpecCard className="h-full">
                <Link
                  href={`/industries/${industry.slug}`}
                  className="flex h-full flex-col gap-3 p-6 lg:p-7"
                >
                  <span className="flex items-start justify-between gap-3">
                    <h2 className="t-h3">{industry.name}</h2>
                    <ArrowUpRight
                      aria-hidden
                      className="mt-1.5 size-4 shrink-0 text-ink-3 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </span>
                  <p className="font-mono text-[0.75rem] uppercase tracking-[0.08em] text-ink-3">
                    {industry.short}
                  </p>
                  <p className="leading-relaxed text-ink-2">
                    {industry.problems[0]}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
                    {industry.services.slice(0, 3).map((slug) => (
                      <li
                        key={slug}
                        className="border border-border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.06em] text-ink-3"
                      >
                        {slug.replace(/-/g, " ")}
                      </li>
                    ))}
                  </ul>
                </Link>
              </SpecCard>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
