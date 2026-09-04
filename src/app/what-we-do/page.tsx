import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { services, spineLabels, spineOrder } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SpecCard, TechGrid } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Capabilities — Industrial IoT, Automation & Software",
  description:
    "Our full capability set: industrial IoT, PLC programming, SCADA, HMI, machine monitoring, predictive maintenance, custom software and system integration.",
  path: "/what-we-do",
});

export default function WhatWeDoPage() {
  return (
    <>
      <JsonLd
        data={itemListSchema(
          services.map((s) => ({ name: s.name, path: `/${s.slug}`, description: s.summary })),
        )}
      />

      <section className="relative overflow-hidden rule-b">
        <TechGrid className="opacity-50" />
        <div className="container-site relative pb-16 pt-10 lg:pb-20 lg:pt-14">
          <Breadcrumbs trail={[{ name: "Capabilities", path: "/what-we-do" }]} />
          <p className="t-label mt-10 flex items-center gap-3 text-ink-2">
            <span aria-hidden className="h-px w-6 bg-accent" />
            Capabilities
          </p>
          <h1 className="t-h1 mt-6 max-w-[20ch]">
            Twelve capabilities along one path
          </h1>
          <p className="t-lead mt-7 max-w-[64ch]">
            Grouped by where they sit between the machine and the decision. Most plants engage in
            one column and expand into the next — which works because the same team delivers all
            five, rather than handing the project between vendors at the point where projects
            usually fail.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg" withArrow>
              Talk to an engineer
            </Button>
            <Button href="/estimate" variant="secondary" size="lg">
              Get a project estimate
            </Button>
          </div>
        </div>
      </section>

      {spineOrder.map((stage, si) => {
        const items = services.filter((s) => s.spine === stage);
        return (
          <Section key={stage} tone={si % 2 === 1 ? "surface" : "bg"} bordered={si > 0}>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-3">
                <div className="lg:sticky lg:top-28">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent">
                      {String(si + 1).padStart(2, "0")}
                    </span>
                    <h2 className="t-h2">{spineLabels[stage].label}</h2>
                  </div>
                  <p className="mt-3 font-mono text-[0.8125rem] text-ink-3">
                    {spineLabels[stage].blurb}
                  </p>
                </div>
              </div>

              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-9">
                {items.map((service, i) => (
                  <Reveal key={service.slug} delay={i * 60} as="li" className="h-full">
                    <SpecCard className="h-full">
                      <Link href={`/${service.slug}`} className="flex h-full flex-col gap-3 p-6 lg:p-7">
                        <span className="flex items-start justify-between gap-3">
                          <h3 className="t-h3">{service.name}</h3>
                          <ArrowUpRight
                            aria-hidden
                            className="mt-1.5 size-4 shrink-0 text-ink-3 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                          />
                        </span>
                        <p className="leading-relaxed text-ink-2">{service.summary}</p>
                        <p className="mt-auto pt-3 font-mono text-[0.75rem] text-ink-3">
                          {service.protocols
                            .slice(0, 3)
                            .map((p) => p.name)
                            .join(" · ")}
                        </p>
                      </Link>
                    </SpecCard>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Section>
        );
      })}
    </>
  );
}
