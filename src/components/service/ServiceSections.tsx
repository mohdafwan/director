import Link from "next/link";
import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import type { Service } from "@/content/types";
import { getIndustry } from "@/content/industries";
import { getService } from "@/content/services";
import { projects } from "@/content/projects";
import { process } from "@/content/process";
import { site, whatsappHref } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { FaqList } from "@/components/ui/Accordion";
import { Section, SectionHeader, SpecCard, TechGrid } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

/* ── Hero ─────────────────────────────────────────────────────────────────── */

export function ServiceHero({ service }: { service: Service }) {
  return (
    <section className="relative overflow-hidden rule-b">
      <TechGrid className="opacity-50" />
      <div className="container-site relative pb-16 pt-10 lg:pb-24 lg:pt-14">
        <Breadcrumbs
          trail={[
            { name: "Capabilities", path: "/what-we-do" },
            { name: service.name, path: `/${service.slug}` },
          ]}
        />

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="t-label flex items-center gap-3 text-ink-2">
              <span aria-hidden className="h-px w-6 bg-accent" />
              {service.eyebrow}
            </p>
            <h1 className="t-h1 mt-6">{service.h1}</h1>
            <p className="t-lead mt-7 max-w-[62ch]">{service.lead}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg" withArrow>
                Talk to an engineer
              </Button>
              <Button
                href={whatsappHref(service.name.toLowerCase())}
                external
                variant="secondary"
                size="lg"
              >
                Ask on WhatsApp
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-border bg-surface p-6">
              <p className="t-label text-ink-3">On this page</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {[
                  ["The problem", "#problem"],
                  ["What we build", "#deliverables"],
                  ["How it works", "#how-it-works"],
                  ["Protocols & technologies", "#protocols"],
                  ["Works with your existing plant", "#retrofit"],
                  ["Use cases", "#use-cases"],
                  ["Questions", "#faq"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="flex items-center gap-2 text-[0.9375rem] text-ink-2 transition-colors hover:text-accent"
                    >
                      <span aria-hidden className="h-px w-3 bg-border-strong" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Problem ──────────────────────────────────────────────────────────────── */

export function ServiceProblem({ service }: { service: Service }) {
  return (
    <Section id="problem">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeader eyebrow="The problem" title={service.problem.title} />
            <p className="t-lead mt-5">{service.problem.body}</p>
          </Reveal>
        </div>
        <ul className="lg:col-span-7">
          {service.problem.symptoms.map((symptom, i) => (
            <Reveal key={symptom} delay={i * 50} as="li">
              <div className="flex gap-4 border-b border-border py-4 first:border-t">
                <span className="mt-1 shrink-0 font-mono text-[0.6875rem] text-fault">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="leading-relaxed text-ink-2">{symptom}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ── Deliverables ─────────────────────────────────────────────────────────── */

export function ServiceDeliverables({ service }: { service: Service }) {
  return (
    <Section id="deliverables" tone="surface">
      <Reveal>
        <SectionHeader
          eyebrow="What we build"
          title="Concrete deliverables"
          lead="Nouns, not adjectives. This is what actually gets handed over."
        />
      </Reveal>
      <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {service.deliverables.map((item, i) => (
          <Reveal key={item.title} delay={i * 55} as="li" className="h-full">
            <SpecCard className="flex h-full flex-col gap-3 p-6">
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="t-h4">{item.title}</h3>
              <p className="text-[0.9375rem] leading-relaxed text-ink-2">{item.body}</p>
            </SpecCard>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/* ── How it works ─────────────────────────────────────────────────────────── */

export function ServiceHowItWorks({ service }: { service: Service }) {
  return (
    <Section id="how-it-works">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionHeader
                eyebrow="How it works"
                title="The technical path, step by step"
                lead="Where the engineering decisions actually get made."
              />
            </Reveal>
          </div>
        </div>

        <ol className="lg:col-span-8">
          {service.howItWorks.map((step, i) => (
            <Reveal key={step.step} delay={i * 55} as="li">
              <div className="relative flex gap-6 border-b border-border py-7 first:border-t">
                <div className="flex shrink-0 flex-col items-center">
                  <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent">
                    {step.step}
                  </span>
                  {i < service.howItWorks.length - 1 && (
                    <span aria-hidden className="mt-3 w-px flex-1 bg-border" />
                  )}
                </div>
                <div>
                  <h3 className="t-h4">{step.title}</h3>
                  <p className="mt-2.5 max-w-[64ch] leading-relaxed text-ink-2">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ── Protocols — the section that wins the engineer ───────────────────────── */

export function ServiceProtocols({ service }: { service: Service }) {
  return (
    <Section id="protocols" tone="surface">
      <Reveal>
        <SectionHeader
          eyebrow="Protocols & technologies"
          title="Specifics, because vague answers cost you money later"
          lead="Chosen per site according to what is installed, not according to what we would prefer to work with."
        />
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-12 overflow-x-auto border border-border">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <caption className="sr-only">
              Protocols and technologies used for {service.name}
            </caption>
            <thead>
              <tr className="border-b border-border bg-bg">
                <th scope="col" className="t-label px-5 py-4 text-ink-3">
                  Technology
                </th>
                <th scope="col" className="t-label px-5 py-4 text-ink-3">
                  Where it is used
                </th>
                <th scope="col" className="t-label px-5 py-4 text-ink-3">
                  Engineering note
                </th>
              </tr>
            </thead>
            <tbody>
              {service.protocols.map((row) => (
                <tr
                  key={row.name}
                  className="border-b border-border last:border-b-0 hover:bg-surface-2"
                >
                  <th scope="row" className="px-5 py-4 align-top font-mono text-[0.8125rem] font-medium text-ink">
                    {row.name}
                  </th>
                  <td className="px-5 py-4 align-top text-[0.9375rem] text-ink-2">{row.use}</td>
                  <td className="px-5 py-4 align-top text-[0.9375rem] text-ink-3">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── Retrofit / brownfield ────────────────────────────────────────────────── */

export function ServiceRetrofit({ service }: { service: Service }) {
  return (
    <Section id="retrofit">
      <div className="grid grid-cols-1 gap-10 border border-border bg-surface p-7 lg:grid-cols-12 lg:gap-14 lg:p-12">
        <div className="lg:col-span-7">
          <p className="t-label flex items-center gap-2.5 text-ink-2">
            <ShieldCheck className="size-4 text-accent" aria-hidden />
            Brownfield
          </p>
          <h2 className="t-h2 mt-5 max-w-[20ch]">{service.retrofit.title}</h2>
          <p className="t-lead mt-5 max-w-[62ch]">{service.retrofit.body}</p>
        </div>
        <div className="lg:col-span-5">
          <p className="t-label text-ink-3">Works with</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {service.retrofit.worksWith.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 font-mono text-[0.8125rem] leading-relaxed text-ink-2"
              >
                <span aria-hidden className="mt-2 h-px w-2.5 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ── Use cases ────────────────────────────────────────────────────────────── */

export function ServiceUseCases({ service }: { service: Service }) {
  return (
    <Section id="use-cases" tone="surface">
      <Reveal>
        <SectionHeader
          eyebrow="Use cases"
          title="What people actually ask us for"
          lead="Each one is a situation followed by the outcome it produces — not a feature list."
        />
      </Reveal>
      <ul className="mt-12 grid grid-cols-1 gap-px bg-border md:grid-cols-2">
        {service.useCases.map((useCase, i) => (
          <Reveal key={useCase.title} delay={i * 50} as="li" className="h-full">
            <div className="flex h-full flex-col gap-4 bg-bg p-6 lg:p-7">
              <h3 className="t-h4">{useCase.title}</h3>
              <div className="flex flex-col gap-3">
                <p className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-3">
                  <span className="t-label mt-1 shrink-0 text-ink-3">Now</span>
                  {useCase.situation}
                </p>
                <p className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  <span className="t-label mt-1 shrink-0 text-accent">After</span>
                  {useCase.outcome}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/* ── Industries + related services (internal linking) ─────────────────────── */

export function ServiceLinks({ service }: { service: Service }) {
  const relatedIndustries = service.industries.map(getIndustry).filter(Boolean);
  const relatedServices = service.related.map(getService).filter(Boolean);

  return (
    <Section id="related">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <SectionHeader eyebrow="Industries" title={`Where ${service.name.toLowerCase()} is applied`} />
          </Reveal>
          <ul className="mt-8 flex flex-wrap gap-2">
            {relatedIndustries.map((industry) => (
              <li key={industry!.slug}>
                <Link
                  href={`/industries/${industry!.slug}`}
                  className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-[0.9375rem] text-ink-2 transition-colors duration-200 hover:border-[var(--accent-line)] hover:bg-[var(--accent-soft)] hover:text-ink"
                >
                  {industry!.name}
                  <ArrowUpRight className="size-3.5 text-ink-3" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Reveal>
            <SectionHeader eyebrow="Related" title="Usually delivered alongside" />
          </Reveal>
          <ul className="mt-8 flex flex-col">
            {relatedServices.map((related) => (
              <li key={related!.slug}>
                <Link
                  href={`/${related!.slug}`}
                  className="group flex items-center justify-between gap-4 border-b border-border py-4 first:border-t"
                >
                  <span>
                    <span className="block font-display text-[1.0625rem] font-semibold text-ink transition-colors group-hover:text-accent">
                      {related!.name}
                    </span>
                    <span className="block text-[0.9375rem] text-ink-3">{related!.summary}</span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="size-4 shrink-0 text-ink-3 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ── Condensed process + related demonstration ────────────────────────────── */

export function ServiceProcessAndProof({ service }: { service: Service }) {
  const related = projects.find((p) => p.services.includes(service.slug)) ?? projects[0];

  return (
    <Section id="process" tone="surface">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <SectionHeader
              eyebrow="Implementation"
              title="How a project runs"
              lead="Eight stages, each producing something you own. Full detail on the process page."
            />
          </Reveal>
          <ol className="mt-8 grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
            {process.map((stage) => (
              <li key={stage.index} className="bg-surface p-4">
                <span className="font-mono text-[0.6875rem] text-accent">{stage.index}</span>
                <p className="mt-1.5 font-display text-[0.9375rem] font-semibold text-ink">
                  {stage.name}
                </p>
                <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-ink-3">
                  {stage.duration}
                </p>
              </li>
            ))}
          </ol>
          <Button href="/how-we-work" variant="secondary" className="mt-8" withArrow>
            The full process
          </Button>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={80}>
            <SpecCard className="flex h-full flex-col gap-4 p-6 lg:p-7">
              <span className="t-label w-fit border border-border bg-bg px-2.5 py-1 text-ink-3">
                {related.kind}
              </span>
              <h3 className="t-h3">{related.name}</h3>
              <p className="leading-relaxed text-ink-2">{related.summary}</p>
              <Link
                href={`/projects/${related.slug}`}
                className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.9375rem] text-accent transition-colors hover:text-accent-hover"
              >
                Read the write-up
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </SpecCard>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ── FAQ + CTA ────────────────────────────────────────────────────────────── */

export function ServiceFaq({ service }: { service: Service }) {
  return (
    <Section id="faq">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionHeader eyebrow="Questions" title={`${service.name} — common questions`} />
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-8">
          <FaqList items={service.faq} />
        </div>
      </div>
    </Section>
  );
}

export function ServiceCta({ service }: { service: Service }) {
  return (
    <Section id="cta" tone="surface" className="overflow-hidden">
      <TechGrid className="opacity-40" />
      <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="t-h2 max-w-[20ch]">{service.cta.title}</h2>
          <p className="t-lead mt-5 max-w-[56ch]">{service.cta.body}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg" withArrow>
            {service.cta.label}
          </Button>
          <Button
            href={whatsappHref(service.name.toLowerCase())}
            external
            variant="secondary"
            size="lg"
          >
            WhatsApp {site.contact.phoneDisplay}
          </Button>
        </div>
      </div>
    </Section>
  );
}
