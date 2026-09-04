import type { Metadata } from "next";

import { techGroups, securityPrinciples, aiLayer } from "@/content/technology";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/jsonld";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeader, SpecCard, TechGrid } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { FaqList } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import type { Faq } from "@/content/types";

export const metadata: Metadata = buildMetadata({
  title: "Technology, Protocols & Security",
  description:
    "The industrial protocols, controllers, SCADA platforms, edge hardware and software we work with — plus how the OT/IT boundary is segmented and who holds the credentials.",
  path: "/technology",
});

const faq: Faq[] = [
  {
    q: "OPC UA or MQTT — which should we use?",
    a: "They solve different problems and are frequently used together. OPC UA is a typed, self-describing, session-based protocol, ideal between controllers and supervisory systems inside the plant. MQTT is a lightweight publish/subscribe transport, ideal for getting data out of the plant over an unreliable link. A very common architecture is OPC UA from the PLC to the gateway, and MQTT with Sparkplug B from the gateway northward.",
  },
  {
    q: "Why Sparkplug B rather than plain MQTT?",
    a: "Plain MQTT gives you a transport but no conventions: no agreed payload format, no way to discover what a device publishes, and no way to distinguish 'nothing has changed' from 'the device is dead'. Sparkplug B adds a defined payload, birth and death certificates, and state awareness — so a silent device raises an alarm instead of looking healthy.",
  },
  {
    q: "Do you need to open a firewall port into our plant?",
    a: "No. Every connection is initiated outward from the plant. There is no inbound port, no port forwarding and no exposed service on the OT network. Where remote support access is required, it is through an explicitly agreed, authenticated and logged mechanism that you can revoke at any time.",
  },
  {
    q: "Can everything run on-premises with no cloud at all?",
    a: "Yes. Gateway, database, dashboards and alerting can all run on a server inside your plant, with no external connectivity. Many plants start this way. The trade-off is that multi-site consolidation and remote access become your infrastructure problem rather than ours, which is often exactly what a customer wants.",
  },
  {
    q: "What happens to the system if we stop working with you?",
    a: "It keeps running. You hold the credentials, the infrastructure and the source code, and the documentation is written so another competent team can take it over. We use mainstream technologies for exactly this reason. We would rather earn renewal than rely on lock-in.",
  },
];

export default function TechnologyPage() {
  return (
    <>
      <JsonLd data={faqSchema(faq)} />

      <section className="relative overflow-hidden rule-b">
        <TechGrid className="opacity-50" />
        <div className="container-site relative pb-16 pt-10 lg:pb-20 lg:pt-14">
          <Breadcrumbs trail={[{ name: "Technology", path: "/technology" }]} />
          <p className="t-label mt-10 flex items-center gap-3 text-ink-2">
            <span aria-hidden className="h-px w-6 bg-accent" />
            Technology
          </p>
          <h1 className="t-h1 mt-6 max-w-[20ch]">
            What we work with, and how the boundary is drawn
          </h1>
          <p className="t-lead mt-7 max-w-[64ch]">
            This page exists for the engineer who has been asked to evaluate us. It is a list of
            what we actually read, write, program and integrate — and, more importantly, how the
            control network is kept separate from everything else.
          </p>
        </div>
      </section>

      <Section bordered={false}>
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-2">
          {techGroups.map((group, i) => (
            <Reveal key={group.group} delay={(i % 2) * 60}>
              <div>
                <h2 className="t-h4 border-b border-border pb-3">{group.group}</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-3">{group.note}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border border-border bg-surface px-2.5 py-1.5 font-mono text-[0.75rem] text-ink-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <Reveal>
          <SectionHeader
            eyebrow="Security"
            title="Six principles we do not negotiate on"
            lead="These are the questions your IT and safety functions will ask. Here are the answers before they ask them."
          />
        </Reveal>
        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {securityPrinciples.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 55} as="li" className="h-full">
              <SpecCard className="flex h-full flex-col gap-3 p-6">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h4">{principle.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-ink-2">{principle.body}</p>
              </SpecCard>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ── AI layer — deliberately positioned as a layer, not an identity ── */}
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeader eyebrow={aiLayer.eyebrow} title={aiLayer.title} lead={aiLayer.lead} />
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-8 border-l-2 border-accent pl-5 leading-relaxed text-ink">
                {aiLayer.caution}
              </p>
            </Reveal>
          </div>
          <ul className="grid grid-cols-1 gap-px self-start bg-border sm:grid-cols-2 lg:col-span-7">
            {aiLayer.applications.map((app, i) => (
              <Reveal key={app.title} delay={i * 50} as="li">
                <div className="flex h-full flex-col gap-2 bg-bg p-5">
                  <h3 className="font-display text-[1.0625rem] font-semibold text-ink">
                    {app.title}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-2">{app.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeader eyebrow="Questions" title="Technical questions we get asked" />
            </Reveal>
            <Reveal delay={100}>
              <Button href="/contact" variant="secondary" className="mt-8" withArrow>
                Ask an engineer directly
              </Button>
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
