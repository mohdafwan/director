import { problem } from "@/content/home";
import { Section, SectionHeader, SpecCard } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

/** Section 3 of 15 — recognition. "They are describing my plant." */
export function ProblemSection() {
  return (
    <Section id="problem">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeader eyebrow={problem.eyebrow} title={problem.title} lead={problem.lead} />
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 border-l-2 border-accent pl-5 text-[1.0625rem] leading-relaxed text-ink">
              {problem.close}
            </p>
          </Reveal>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
          {problem.symptoms.map((symptom, i) => (
            <Reveal key={symptom.code} delay={i * 70} as="li" className="h-full">
              <SpecCard className="flex h-full flex-col gap-3 p-6">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent">
                  {symptom.code}
                </span>
                <h3 className="t-h4">{symptom.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-ink-2">{symptom.body}</p>
              </SpecCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
