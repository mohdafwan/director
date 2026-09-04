import { techGroups } from "@/content/technology";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Section 12 of 15 — the engineer's checklist.
 *
 * Two marquee rows of protocols and platforms. The marquee is duplicated
 * inline and translated -50%, so it loops seamlessly with one transform and no
 * JavaScript. It stops entirely under prefers-reduced-motion, where it becomes
 * a static, scrollable row.
 */
export function TechnologySection() {
  const rows = [
    techGroups[0].items.concat(techGroups[1].items.slice(0, 8)),
    techGroups[2].items.concat(techGroups[5].items.slice(0, 8)),
  ];

  return (
    <Section id="technology" tone="surface" className="overflow-hidden">
      <Reveal>
        <SectionHeader
          eyebrow="Technology"
          title="What we actually work with"
          lead="Not a badge wall. These are the protocols, controllers and platforms we read, write, program and integrate — chosen per site according to what is installed, not according to what we prefer."
        />
      </Reveal>

      <div
        className="relative mt-12 flex flex-col gap-3"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        {rows.map((items, r) => (
          <div key={r} className="flex overflow-hidden">
            <ul
              className="marquee-track flex shrink-0 gap-3 pr-3 motion-reduce:animate-none"
              style={{
                ["--marquee-dur" as string]: r === 0 ? "58s" : "72s",
                animationDirection: r === 1 ? "reverse" : "normal",
              }}
              aria-hidden={r === 1}
            >
              {[...items, ...items].map((item, i) => (
                <li
                  key={`${item}-${i}`}
                  className="whitespace-nowrap border border-border bg-bg px-4 py-2.5 font-mono text-[0.8125rem] text-ink-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Reveal delay={100}>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button href="/technology" variant="secondary" withArrow>
            Full technology and security notes
          </Button>
          <p className="max-w-[46ch] text-[0.9375rem] text-ink-3">
            Including how the OT/IT boundary is segmented and who holds the credentials.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
