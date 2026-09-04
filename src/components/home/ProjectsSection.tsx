import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { projects } from "@/content/projects";
import { Section, SectionHeader, SpecCard } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Section 10 of 15 — proof, honestly labelled.
 *
 * [COMPANY NAME] is new and has no customer case studies. Rather than
 * fabricating them, we publish what is real: demonstration builds and
 * reference architectures, with the distinction stated on every card and an
 * explicit note explaining why. In a market full of inflated claims, being
 * visibly honest is itself a differentiator (docs/01 §3.1).
 */
export function ProjectsSection() {
  return (
    <Section id="projects" tone="surface">
      <Reveal>
        <SectionHeader
          eyebrow="Projects"
          title="We have no customer case studies yet. Here is what we do have."
          lead="This company is new. Rather than borrow credibility we have not earned, we publish the work that exists: demonstration rigs we have actually built, and reference architectures we would propose — both labelled as such, so you can judge the engineering rather than the marketing."
        />
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-8 flex items-start gap-3 border border-border bg-bg p-5">
          <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
          <p className="max-w-[78ch] text-[0.9375rem] leading-relaxed text-ink-2">
            Nothing on this website is a fabricated client, testimonial, certification, award or
            result. When real customer projects exist, they will be published separately, with the
            customer&rsquo;s written permission, and the distinction from these demonstrations will
            stay visible.
          </p>
        </div>
      </Reveal>

      <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 70} as="li" className="h-full">
            <SpecCard as="article" className="h-full">
              <Link href={`/projects/${project.slug}`} className="flex h-full flex-col gap-4 p-6 lg:p-7">
                <div className="flex items-start justify-between gap-3">
                  <span className="t-label border border-border bg-bg px-2.5 py-1 text-ink-3">
                    {project.kind}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 shrink-0 text-ink-3 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </div>

                <h3 className="t-h3">{project.name}</h3>
                <p className="leading-relaxed text-ink-2">{project.summary}</p>

                <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {project.stack.slice(0, 4).map((tech) => (
                    <li
                      key={tech}
                      className="border border-border px-2 py-1 font-mono text-[0.6875rem] text-ink-3"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </Link>
            </SpecCard>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={120}>
        <Button href="/projects" variant="secondary" className="mt-10" withArrow>
          All demonstrations and architectures
        </Button>
      </Reveal>
    </Section>
  );
}
