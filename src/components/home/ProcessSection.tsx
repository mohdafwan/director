import { process } from "@/content/process";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/** Section 9 of 15 — how we engage, and how the risk is bounded. */
export function ProcessSection() {
  return (
    <Section id="process">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionHeader
                eyebrow="How we work"
                title="Eight stages, and a way out after each one"
                lead="Every phase produces something you own and can act on. If stage two says the project is not worth doing, we tell you at stage two."
              />
            </Reveal>
            <Reveal delay={120}>
              <Button href="/how-we-work" variant="secondary" className="mt-8" withArrow>
                Process and engagement models
              </Button>
            </Reveal>
          </div>
        </div>

        <ol className="lg:col-span-8">
          {process.map((stage, i) => (
            <Reveal key={stage.index} delay={i * 50} as="li">
              <div className="group grid grid-cols-1 gap-4 border-b border-border py-7 first:border-t sm:grid-cols-12 sm:gap-6">
                <div className="sm:col-span-3">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent">
                      {stage.index}
                    </span>
                    <h3 className="t-h4">{stage.name}</h3>
                  </div>
                  <p className="mt-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-3">
                    {stage.duration}
                  </p>
                </div>

                <div className="sm:col-span-9">
                  <p className="max-w-[64ch] leading-relaxed text-ink-2">{stage.body}</p>
                  <ul className="mt-3.5 flex flex-wrap gap-x-4 gap-y-1.5">
                    {stage.outputs.map((output) => (
                      <li
                        key={output}
                        className="flex items-center gap-2 font-mono text-[0.75rem] text-ink-3"
                      >
                        <span aria-hidden className="h-px w-2.5 bg-border-strong" />
                        {output}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
