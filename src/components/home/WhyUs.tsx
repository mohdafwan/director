import { whyUs } from "@/content/home";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 11 of 15 — the OT/IT intersection.
 *
 * Moved later than the brief's draft order on purpose: a differentiator stated
 * early is a slogan; stated after the visitor has read the architecture, the
 * protocols and the process, it is a conclusion they reach themselves
 * (docs/02 §5.1, departure 3).
 */
export function WhyUs() {
  return (
    <Section id="why-us">
      <Reveal>
        <SectionHeader eyebrow={whyUs.eyebrow} title={whyUs.title} lead={whyUs.lead} />
      </Reveal>

      {/* Two columns of limitation, meeting in the middle. */}
      <div className="mt-14 grid grid-cols-1 items-stretch gap-px bg-border lg:grid-cols-[1fr_auto_1fr]">
        <Reveal className="h-full">
          <div className="flex h-full flex-col gap-4 bg-surface p-7 lg:p-9">
            <p className="t-label text-ink-3">{whyUs.columns[0].label}</p>
            <p className="leading-relaxed text-ink-2">{whyUs.columns[0].body}</p>
            <p className="mt-auto flex items-center gap-2.5 pt-4 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-fault">
              <span aria-hidden className="h-px w-4 bg-fault" />
              {whyUs.columns[0].limit}
            </p>
          </div>
        </Reveal>

        <Reveal delay={100} className="h-full">
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-bg px-8 py-8 lg:w-40">
            <span aria-hidden className="text-2xl leading-none text-accent">
              &#8901;&#8901;&#8901;
            </span>
            <span className="t-label text-center text-accent">We work here</span>
          </div>
        </Reveal>

        <Reveal delay={60} className="h-full">
          <div className="flex h-full flex-col gap-4 bg-surface p-7 lg:p-9">
            <p className="t-label text-ink-3">{whyUs.columns[1].label}</p>
            <p className="leading-relaxed text-ink-2">{whyUs.columns[1].body}</p>
            <p className="mt-auto flex items-center gap-2.5 pt-4 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-fault">
              <span aria-hidden className="h-px w-4 bg-fault" />
              {whyUs.columns[1].limit}
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={80}>
        <div className="border border-t-0 border-border bg-bg-elevated p-7 lg:p-9">
          <h3 className="t-h3 text-accent">{whyUs.intersection.title}</h3>
          <p className="mt-4 max-w-[78ch] text-[1.0625rem] leading-relaxed text-ink-2">
            {whyUs.intersection.body}
          </p>
        </div>
      </Reveal>

      <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
        {whyUs.points.map((point, i) => (
          <Reveal key={point.title} delay={i * 60} as="li">
            <div className="border-t border-border pt-5">
              <h4 className="t-h4">{point.title}</h4>
              <p className="mt-2.5 max-w-[52ch] leading-relaxed text-ink-2">{point.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
