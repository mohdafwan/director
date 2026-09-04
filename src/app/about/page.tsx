import type { Metadata } from "next";

import { site } from "@/config/site";
import { whyUs } from "@/content/home";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeader, SpecCard, TechGrid } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "About — Why This Company Exists",
  description:
    "Why we started an industrial digital transformation company: the gap between automation firms that stop at the panel and software firms that never reach the machine.",
  path: "/about",
});

const principles = [
  {
    title: "We say what we do not know",
    body: "There are platforms we have not worked on and disciplines — functional safety certification, for one — where we are not the right party. Saying so before a contract is signed costs us occasional work and saves everybody a great deal of pain.",
  },
  {
    title: "We publish the engineering, not the adjectives",
    body: "This site contains architectures, protocol tables and constraints instead of a logo wall. That is partly because we have no logos to show yet, and mostly because an engineer evaluating a vendor learns nothing from a logo wall.",
  },
  {
    title: "We build so you can leave",
    body: "Source code, schema, credentials and documentation, on infrastructure you own, using mainstream technologies. Lock-in is a way of keeping customers who want to go. We would rather not need it.",
  },
  {
    title: "We start small on purpose",
    body: "A first project on one line, with a fixed scope and a fixed price. It limits your risk when you have no reason yet to trust us, and it means the second project is scoped from measurement rather than assumption.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden rule-b">
        <TechGrid className="opacity-50" />
        <div className="container-site relative pb-16 pt-10 lg:pb-20 lg:pt-14">
          <Breadcrumbs trail={[{ name: "About", path: "/about" }]} />
          <p className="t-label mt-10 flex items-center gap-3 text-ink-2">
            <span aria-hidden className="h-px w-6 bg-accent" />
            About
          </p>
          <h1 className="t-h1 mt-6 max-w-[20ch]">
            There is a line in every industrial project, and nobody stands on both sides of it
          </h1>
          <p className="t-lead mt-7 max-w-[64ch]">
            That line is the reason this company exists. It is the point where the automation work
            ends and the software work begins — and in most projects it is where responsibility
            quietly disappears.
          </p>
        </div>
      </section>

      {/* ── The problem we started from ─────────────────────────────────── */}
      <Section bordered={false}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeader eyebrow="Why we exist" title="The gap" />
            </Reveal>
          </div>
          <div className="prose-industrial lg:col-span-8">
            <p>
              Walk into almost any factory in India and you will find machines, PLCs, drives,
              meters and sensors that all work, all produce information, and none of which talk to
              each other. The plant is fully instrumented and completely invisible. Everyone knows
              time is being lost; nobody can say where.
            </p>
            <p>
              The obvious response is to hire someone to connect it all up. And here the buyer runs
              into a market that is split cleanly in two. On one side are automation companies and
              system integrators — genuinely good at panels, PLC code, SCADA and commissioning, and
              almost universally weak at software. They will deliver a control system that works and
              tells nobody anything. On the other side are software companies and IoT platform
              startups — good at cloud, dashboards and applications, and completely unequipped to
              stand in a live panel. They have never heard of Profinet, they do not know why reading
              that particular tag on a running line is a bad idea, and they will not find out until
              they do it.
            </p>
            <p>
              So the buyer hires both. And then spends the project managing an interface between two
              vendors who each believe the problem is on the other side of it. The automation firm
              says the data is on the PLC. The software firm says it never arrived. Both are telling
              the truth, and nobody owns the gap between them.
            </p>
            <p>
              <strong className="text-ink">
                We started {site.name} to be one team standing on both sides of that line.
              </strong>{" "}
              The same people who write the PLC logic design the tag model, build the API and ship
              the application. Not because it is a nicer way to work, but because it removes the
              specific place where these projects go wrong.
            </p>
          </div>
        </div>
      </Section>

      {/* ── The intersection ────────────────────────────────────────────── */}
      <Section tone="surface">
        <Reveal>
          <SectionHeader eyebrow="The position" title={whyUs.title} lead={whyUs.lead} />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-px bg-border lg:grid-cols-2">
          {whyUs.columns.map((column) => (
            <div key={column.label} className="flex flex-col gap-4 bg-bg p-7 lg:p-9">
              <p className="t-label text-ink-3">{column.label}</p>
              <p className="leading-relaxed text-ink-2">{column.body}</p>
              <p className="mt-auto flex items-center gap-2.5 pt-4 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-fault">
                <span aria-hidden className="h-px w-4 bg-fault" />
                {column.limit}
              </p>
            </div>
          ))}
        </div>
        <div className="border border-t-0 border-border bg-bg-elevated p-7 lg:p-9">
          <h3 className="t-h3 text-accent">{whyUs.intersection.title}</h3>
          <p className="mt-4 max-w-[78ch] text-[1.0625rem] leading-relaxed text-ink-2">
            {whyUs.intersection.body}
          </p>
        </div>
      </Section>

      {/* ── Principles ──────────────────────────────────────────────────── */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="How we operate"
            title="Four commitments, including two that cost us money"
          />
        </Reveal>
        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {principles.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 60} as="li" className="h-full">
              <SpecCard className="flex h-full flex-col gap-3 p-6 lg:p-7">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h3">{principle.title}</h3>
                <p className="leading-relaxed text-ink-2">{principle.body}</p>
              </SpecCard>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ── Team ────────────────────────────────────────────────────────── */}
      <Section tone="surface">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeader
                eyebrow="The team"
                title="Who you will actually be talking to"
                lead="On a project this size you deal with the engineers, not an account manager."
              />
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {/* Placeholder block. Fill with the real founder bio — experience,
                platforms, sectors, qualifications. Do NOT invent credentials. */}
            <div className="border border-dashed border-border-strong bg-bg p-7">
              <p className="t-label text-ink-3">To be completed</p>
              <h3 className="t-h3 mt-3">{site.founder}</h3>
              <p className="mt-1 font-mono text-[0.8125rem] text-ink-3">{site.founderRole}</p>
              <p className="mt-5 leading-relaxed text-ink-2">
                This section is intentionally left as a placeholder. It should carry a real
                biography: actual years of experience, the platforms genuinely worked on, the
                sectors genuinely delivered into, and any qualifications actually held. For a new
                company, founder credibility is the strongest asset available — and it only works if
                every line of it is true and checkable.
              </p>
              <p className="mt-4 font-mono text-[0.8125rem] leading-relaxed text-ink-3">
                Edit: src/app/about/page.tsx · names and roles: src/config/site.ts
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="overflow-hidden">
        <TechGrid className="opacity-40" />
        <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="t-h2 max-w-[22ch]">Judge us on the engineering</h2>
            <p className="t-lead mt-5 max-w-[56ch]">
              Read a service page, look at the architectures, then ask us the question you think we
              will struggle with. That is a better test than any credential we could put on this
              page.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg" withArrow>
              Talk to an engineer
            </Button>
            <Button href="/technology" variant="secondary" size="lg">
              Technology & security
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
