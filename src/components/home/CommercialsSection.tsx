import { commercials } from "@/content/home";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Section 13 of 15 — commercials.
 *
 * No price table: a number without a scope is worthless to the buyer and
 * dishonest from us. Instead we publish the cost drivers, which lets a plant
 * manager size the job themselves before speaking to anyone — and which
 * converts better than a fake "from ₹X" anchor.
 */
export function CommercialsSection() {
  return (
    <Section id="commercials">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeader
              eyebrow={commercials.eyebrow}
              title={commercials.title}
              lead={commercials.lead}
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 border-l-2 border-accent pl-5 leading-relaxed text-ink">
              {commercials.note}
            </p>
          </Reveal>
          <Reveal delay={160}>
            <Button href={commercials.cta.href} size="lg" className="mt-8" withArrow>
              {commercials.cta.label}
            </Button>
          </Reveal>
        </div>

        <ul className="grid grid-cols-1 gap-px self-start bg-border sm:grid-cols-2 lg:col-span-7">
          {commercials.drivers.map((driver, i) => (
            <Reveal key={driver.title} delay={i * 45} as="li">
              <div className="flex h-full flex-col gap-2 bg-bg p-5">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[1.0625rem] font-semibold text-ink">
                  {driver.title}
                </h3>
                <p className="text-[0.9375rem] leading-relaxed text-ink-2">{driver.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
