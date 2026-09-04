import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";

import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SpecCard, TechGrid } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Engineering Demonstrations & Reference Architectures",
  description:
    "We are a new company with no customer case studies yet. Instead we publish the demonstration rigs we have built and the reference architectures we would propose.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={itemListSchema(
          projects.map((p) => ({
            name: p.name,
            path: `/projects/${p.slug}`,
            description: p.summary,
          })),
        )}
      />

      <section className="relative overflow-hidden rule-b">
        <TechGrid className="opacity-50" />
        <div className="container-site relative pb-16 pt-10 lg:pb-20 lg:pt-14">
          <Breadcrumbs trail={[{ name: "Projects", path: "/projects" }]} />
          <p className="t-label mt-10 flex items-center gap-3 text-ink-2">
            <span aria-hidden className="h-px w-6 bg-accent" />
            Projects
          </p>
          <h1 className="t-h1 mt-6 max-w-[22ch]">
            No client logos. Published engineering instead.
          </h1>
          <p className="t-lead mt-7 max-w-[66ch]">
            This company is new, so there are no customer case studies on this page — and there
            will not be invented ones. What is here is real: demonstration rigs we have actually
            built, and reference architectures we would propose for situations we are asked about
            regularly. Both are labelled, and both can be judged on the engineering rather than on
            the claims.
          </p>

          <div className="mt-8 flex max-w-[74ch] items-start gap-3 border border-border bg-surface p-5">
            <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
            <p className="text-[0.9375rem] leading-relaxed text-ink-2">
              When customer projects exist, they will be published separately with written
              permission, and the distinction from these demonstrations will remain visible. No
              fabricated clients, testimonials, certifications, awards or results appear anywhere on
              this site.
            </p>
          </div>
        </div>
      </section>

      <Section bordered={false}>
        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 70} as="li" className="h-full">
              <SpecCard as="article" className="h-full">
                <Link href={`/projects/${project.slug}`} className="flex h-full flex-col gap-4 p-6 lg:p-8">
                  <div className="flex items-start justify-between gap-3">
                    <span className="t-label border border-border bg-bg px-2.5 py-1 text-ink-3">
                      {project.kind}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 shrink-0 text-ink-3 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </div>
                  <h2 className="t-h3">{project.name}</h2>
                  <p className="leading-relaxed text-ink-2">{project.summary}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
                    {project.stack.map((tech) => (
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

        <div className="mt-12 flex flex-col items-start gap-4 border-t border-border pt-10 sm:flex-row sm:items-center">
          <Button href="/contact" size="lg" withArrow>
            Ask us to walk through one
          </Button>
          <p className="max-w-[48ch] text-[0.9375rem] text-ink-3">
            We will happily screen-share any of these rigs and show the data path end to end.
          </p>
        </div>
      </Section>
    </>
  );
}
