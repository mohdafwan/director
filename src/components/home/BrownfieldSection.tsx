import { Cpu } from "lucide-react";
import { brownfield } from "@/content/home";
import { Section, SectionHeader, TechGrid } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Section 4 of 15 — the objection killer, placed early on purpose.
 *
 * "This will mean buying new machines" is the primary purchase blocker for the
 * primary persona. Objection handling belongs before the pitch, not after it
 * (docs/02 §5.1, departure 1).
 */
export function BrownfieldSection() {
  return (
    <Section id="brownfield" tone="surface" className="overflow-hidden">
      <TechGrid className="opacity-40" />

      <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeader
              eyebrow={brownfield.eyebrow}
              title={brownfield.title}
              lead={brownfield.lead}
            />
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-10 border border-border bg-bg p-6">
              <p className="t-label flex items-center gap-2 text-ink-3">
                <Cpu className="size-3.5 text-accent" aria-hidden />
                Already works with
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {brownfield.worksWith.map((item) => (
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
          </Reveal>

          <Reveal delay={200}>
            <Button href="/industrial-iot" variant="secondary" className="mt-6" withArrow>
              How the retrofit works
            </Button>
          </Reveal>
        </div>

        <ol className="lg:col-span-7">
          {brownfield.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 70} as="li">
              <div className="flex gap-5 border-b border-border py-7 first:pt-0 last:border-b-0">
                <span className="mt-1 shrink-0 font-mono text-[0.6875rem] tracking-[0.14em] text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="t-h4">{point.title}</h3>
                  <p className="mt-2.5 max-w-[62ch] leading-relaxed text-ink-2">{point.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
