import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { industries, getIndustry } from "@/content/industries";
import { getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, serviceSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeader, SpecCard, TechGrid } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { FaqList } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { whatsappHref } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return buildMetadata({
    title: industry.title,
    description: industry.description,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const relatedServices = industry.services.map(getService).filter(Boolean);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `${industry.name} automation and monitoring`,
          description: industry.description,
          path: `/industries/${industry.slug}`,
          serviceType: `Industrial automation for ${industry.name}`,
        })}
      />
      <JsonLd data={faqSchema(industry.faq)} />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rule-b">
        <TechGrid className="opacity-50" />
        <div className="container-site relative pb-16 pt-10 lg:pb-20 lg:pt-14">
          <Breadcrumbs
            trail={[
              { name: "Industries", path: "/industries" },
              { name: industry.name, path: `/industries/${industry.slug}` },
            ]}
          />
          <p className="t-label mt-10 flex items-center gap-3 text-ink-2">
            <span aria-hidden className="h-px w-6 bg-accent" />
            {industry.short}
          </p>
          <h1 className="t-h1 mt-6 max-w-[18ch]">{industry.h1}</h1>
          <p className="t-lead mt-7 max-w-[64ch]">{industry.lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg" withArrow>
              Talk to an engineer
            </Button>
            <Button
              href={whatsappHref(`${industry.name.toLowerCase()} monitoring`)}
              external
              variant="secondary"
              size="lg"
            >
              Ask on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* ── Problems ────────────────────────────────────────────────────── */}
      <Section bordered={false}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeader
                eyebrow="What goes wrong"
                title={`Typical problems in ${industry.name.toLowerCase()}`}
                lead="If more than two of these are familiar, there is a first project here worth doing."
              />
            </Reveal>
          </div>
          <ul className="lg:col-span-7">
            {industry.problems.map((problem, i) => (
              <Reveal key={problem} delay={i * 50} as="li">
                <div className="flex gap-4 border-b border-border py-4 first:border-t">
                  <span className="mt-1 shrink-0 font-mono text-[0.6875rem] text-fault">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="leading-relaxed text-ink-2">{problem}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── Solutions ───────────────────────────────────────────────────── */}
      <Section tone="surface">
        <Reveal>
          <SectionHeader
            eyebrow="What we build"
            title={`Solutions for ${industry.name.toLowerCase()}`}
          />
        </Reveal>
        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industry.solutions.map((solution, i) => (
            <Reveal key={solution.title} delay={i * 55} as="li" className="h-full">
              <SpecCard className="flex h-full flex-col gap-3 p-6">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h4">{solution.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-ink-2">{solution.body}</p>
              </SpecCard>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ── Technology + outcomes ───────────────────────────────────────── */}
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <SectionHeader eyebrow="Technology" title="What is typically involved" />
            </Reveal>
            <ul className="mt-8 flex flex-col gap-2.5">
              {industry.technology.map((tech) => (
                <li
                  key={tech}
                  className="flex items-start gap-2.5 font-mono text-[0.8125rem] leading-relaxed text-ink-2"
                >
                  <span aria-hidden className="mt-2 h-px w-2.5 shrink-0 bg-data" />
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Reveal>
              <SectionHeader
                eyebrow="Outcomes"
                title="What changes"
                lead="Described rather than quantified — we do not publish numbers we have not measured for you."
              />
            </Reveal>
            <ul className="mt-8 flex flex-col gap-2.5">
              {industry.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2.5 leading-relaxed text-ink-2">
                  <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-accent" />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Related services ────────────────────────────────────────────── */}
      <Section tone="surface">
        <Reveal>
          <SectionHeader eyebrow="Capabilities" title="Most relevant here" />
        </Reveal>
        <ul className="mt-10 flex flex-col">
          {relatedServices.map((service) => (
            <li key={service!.slug}>
              <Link
                href={`/${service!.slug}`}
                className="group flex items-center justify-between gap-6 border-b border-border py-5 first:border-t"
              >
                <span>
                  <span className="block font-display text-lg font-semibold text-ink transition-colors group-hover:text-accent">
                    {service!.name}
                  </span>
                  <span className="block text-[0.9375rem] text-ink-3">{service!.summary}</span>
                </span>
                <ArrowRight
                  aria-hidden
                  className="size-4 shrink-0 text-ink-3 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── FAQ + CTA ───────────────────────────────────────────────────── */}
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeader eyebrow="Questions" title={`${industry.name} — common questions`} />
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={industry.faq} />
          </div>
        </div>
      </Section>

      <Section tone="surface" className="overflow-hidden">
        <TechGrid className="opacity-40" />
        <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="t-h2 max-w-[22ch]">
              Tell us about your {industry.name.toLowerCase()} plant
            </h2>
            <p className="t-lead mt-5 max-w-[56ch]">
              What runs on your floor, and what you cannot currently answer. We will tell you what
              is readable today and what a first phase would involve.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg" withArrow>
              Talk to an engineer
            </Button>
            <Button href="/estimate" variant="secondary" size="lg">
              Get an estimate
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
