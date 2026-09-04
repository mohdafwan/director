import { Check } from "lucide-react";
import { hero } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { HeroSchematic } from "@/components/diagrams/HeroSchematic";

/**
 * Section 1 of 15.
 *
 * Answers who / what / who-for in under ten seconds. The category eyebrow sits
 * ABOVE the headline so the headline can be memorable without costing
 * comprehension or keyword presence (docs/02 §5.1).
 *
 * Server component. The H1 is in the initial HTML and paints immediately —
 * only its mask offset animates, so animation can never gate LCP.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Technical grid + vignette. Loud sections only. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="tech-grid grid-fade anim-grid absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,106,19,0.07),transparent_70%)]" />
      </div>

      <div className="container-site relative pb-16 pt-14 lg:pb-24 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ── Copy ──────────────────────────────────────────────────── */}
          <div className="lg:col-span-5">
            <p className="anim-eyebrow t-label flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-2">
              <span aria-hidden className="h-px w-6 shrink-0 bg-accent" />
              {hero.eyebrow}
            </p>

            <h1 className="t-display mt-7">
              {/* Split for a per-line mask reveal; the plain text is preserved
                  for assistive technology and for search engines. */}
              <span className="sr-only">{hero.headlinePlain}</span>
              <span aria-hidden>
                {hero.headline.map((line, i) => (
                  <span key={line} className="block overflow-hidden">
                    <span
                      className="anim-line block"
                      style={{ animationDelay: `${240 + i * 90}ms` }}
                    >
                      {i === hero.headline.length - 1 ? (
                        <>
                          We make them{" "}
                          <span className="text-accent">tell you.</span>
                        </>
                      ) : (
                        line
                      )}
                    </span>
                  </span>
                ))}
              </span>
            </h1>

            <p className="anim-sub t-lead mt-7 max-w-[54ch]">{hero.sub}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                href={hero.primaryCta.href}
                size="lg"
                withArrow
                className="anim-cta"
              >
                {hero.primaryCta.label}
              </Button>
              <Button
                href={hero.secondaryCta.href}
                variant="secondary"
                size="lg"
                className="anim-cta-2"
              >
                {hero.secondaryCta.label}
              </Button>
            </div>

            <ul className="anim-trust mt-10 flex flex-col gap-2.5">
              {hero.trust.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-2">
                  <Check className="mt-1 size-3.5 shrink-0 text-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Schematic ─────────────────────────────────────────────── */}
          <div className="lg:col-span-7 lg:pt-4">
            <HeroSchematic />
          </div>
        </div>
      </div>
    </section>
  );
}
