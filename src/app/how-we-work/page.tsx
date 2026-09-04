import type { Metadata } from "next";

import { process, engagementModels } from "@/content/process";
import { buildMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeader, SpecCard, TechGrid } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { FaqList } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import type { Faq } from "@/content/types";

export const metadata: Metadata = buildMetadata({
  title: "How We Work — Process & Engagement Models",
  description:
    "Our eight-stage industrial project process, from discovery and site audit through design, engineering, integration, deployment and optimisation.",
  path: "/how-we-work",
});

const faq: Faq[] = [
  {
    q: "Do you charge for the site audit?",
    a: "The first conversation is free. A physical site audit involves engineers travelling and a day or more of work, so it is normally charged — and where it leads to a project, that cost is credited against the first phase. You own the audit output regardless of whether you continue with us.",
  },
  {
    q: "What if the audit shows the project is not worth doing?",
    a: "Then we say so, and you have an audit document that tells you why. That is a better outcome for you than a project that produces a dashboard nobody opens, and it is a better outcome for us than a reference we would not want quoted.",
  },
  {
    q: "Can we stop after a phase?",
    a: "Yes, and each phase is scoped so that stopping leaves you with something complete and usable rather than a half-built system. That is the point of phasing.",
  },
  {
    q: "Who does the physical installation work?",
    a: "Depending on scope, our engineers, a local electrical contractor working to our drawings, or your own maintenance team with our supervision. We are explicit about who is doing what before the work starts, including who is responsible for the panel and for any hot work permits.",
  },
  {
    q: "What happens after handover?",
    a: "You receive full documentation, source code and credentials, and your team is trained. If you want ongoing support, that is a separate written arrangement with defined response times and scope. If you do not, the system is built so that you or another competent team can maintain it.",
  },
  {
    q: "How do you handle changes mid-project?",
    a: "Small changes within the agreed intent are absorbed. Changes that alter scope are quoted before being done, not after. The design document from stage three is what we both refer back to, which is precisely why we insist on producing it.",
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <JsonLd data={faqSchema(faq)} />

      <section className="relative overflow-hidden rule-b">
        <TechGrid className="opacity-50" />
        <div className="container-site relative pb-16 pt-10 lg:pb-20 lg:pt-14">
          <Breadcrumbs trail={[{ name: "How we work", path: "/how-we-work" }]} />
          <p className="t-label mt-10 flex items-center gap-3 text-ink-2">
            <span aria-hidden className="h-px w-6 bg-accent" />
            Process
          </p>
          <h1 className="t-h1 mt-6 max-w-[20ch]">Eight stages, and a way out after each one</h1>
          <p className="t-lead mt-7 max-w-[64ch]">
            Industrial projects fail in predictable ways: a scope nobody wrote down, a survey nobody
            did, a cut-over with no way back, and a system that goes live and is then never tuned.
            This process exists to remove each of those, and it is deliberately structured so you can
            stop at any boundary with something complete in hand.
          </p>
          <Button href="/contact" size="lg" className="mt-9" withArrow>
            Start with a conversation
          </Button>
        </div>
      </section>

      <Section bordered={false}>
        <ol>
          {process.map((stage, i) => (
            <Reveal key={stage.index} delay={i * 45} as="li">
              <div className="grid grid-cols-1 gap-6 border-b border-border py-9 first:border-t sm:grid-cols-12 sm:gap-8">
                <div className="sm:col-span-3">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.75rem] tracking-[0.14em] text-accent">
                      {stage.index}
                    </span>
                    <h2 className="t-h3">{stage.name}</h2>
                  </div>
                  <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-3">
                    {stage.duration}
                  </p>
                </div>
                <div className="sm:col-span-9">
                  <p className="max-w-[68ch] text-[1.0625rem] leading-relaxed text-ink-2">
                    {stage.body}
                  </p>
                  <div className="mt-5">
                    <p className="t-label text-ink-3">You receive</p>
                    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                      {stage.outputs.map((output) => (
                        <li
                          key={output}
                          className="flex items-center gap-2 font-mono text-[0.75rem] text-ink-2"
                        >
                          <span aria-hidden className="h-px w-3 bg-accent" />
                          {output}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="surface">
        <Reveal>
          <SectionHeader
            eyebrow="Engagement"
            title="Four ways to work with us"
            lead="Which one fits depends on how well defined the problem already is."
          />
        </Reveal>
        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {engagementModels.map((model, i) => (
            <Reveal key={model.title} delay={i * 60} as="li" className="h-full">
              <SpecCard className="flex h-full flex-col gap-3 p-6 lg:p-7">
                <h3 className="t-h3">{model.title}</h3>
                <p className="leading-relaxed text-ink-2">{model.body}</p>
                <p className="mt-auto flex items-center gap-2.5 pt-4 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-accent">
                  <span aria-hidden className="h-px w-4 bg-accent" />
                  {model.fit}
                </p>
              </SpecCard>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeader eyebrow="Questions" title="About working together" />
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={faq} />
          </div>
        </div>
      </Section>
    </>
  );
}
