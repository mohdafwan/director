import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";

import { projects, getProject } from "@/content/projects";
import { getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema } from "@/lib/jsonld";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeader, TechGrid } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const relatedServices = project.services.map(getService).filter(Boolean);

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: project.name,
          description: project.description,
          path: `/projects/${project.slug}`,
          datePublished: "2026-01-01",
        })}
      />

      <section className="relative overflow-hidden rule-b">
        <TechGrid className="opacity-50" />
        <div className="container-site relative pb-16 pt-10 lg:pb-20 lg:pt-14">
          <Breadcrumbs
            trail={[
              { name: "Projects", path: "/projects" },
              { name: project.name, path: `/projects/${project.slug}` },
            ]}
          />
          <span className="t-label mt-10 inline-block border border-border bg-surface px-3 py-1.5 text-ink-2">
            {project.kind}
          </span>
          <h1 className="t-h1 mt-6 max-w-[20ch]">{project.name}</h1>
          <p className="t-lead mt-7 max-w-[64ch]">{project.summary}</p>
        </div>
      </section>

      {/* Disclosure sits above the content, not below it. */}
      <div className="rule-b bg-surface">
        <div className="container-site flex items-start gap-3 py-5">
          <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
          <p className="max-w-[80ch] text-[0.9375rem] leading-relaxed text-ink-2">
            <span className="font-medium text-ink">Disclosure. </span>
            {project.disclosure}
          </p>
        </div>
      </div>

      <Section bordered={false}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeader eyebrow="Context" title="Why this exists" />
              <p className="t-lead mt-5">{project.context}</p>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="t-h3 mt-14">The constraints</h2>
              <ul className="mt-6">
                {project.challenge.map((item, i) => (
                  <li key={item} className="flex gap-4 border-b border-border py-4 first:border-t">
                    <span className="mt-1 shrink-0 font-mono text-[0.6875rem] text-fault">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="leading-relaxed text-ink-2">{item}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="t-h3 mt-14">The approach</h2>
              <ol className="mt-6">
                {project.approach.map((step, i) => (
                  <li key={step.title} className="border-b border-border py-6 first:border-t">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="t-h4">{step.title}</h3>
                    </div>
                    <p className="mt-2.5 max-w-[64ch] leading-relaxed text-ink-2">{step.body}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="border border-border bg-surface p-6">
                <p className="t-label text-ink-3">Stack</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="flex items-start gap-2.5 font-mono text-[0.8125rem] leading-relaxed text-ink-2"
                    >
                      <span aria-hidden className="mt-2 h-px w-2.5 shrink-0 bg-data" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 border border-border bg-surface p-6">
                <p className="t-label text-ink-3">What it demonstrates</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {project.whatItShows.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
                      <span aria-hidden className="mt-3 h-px w-2.5 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 border border-border bg-surface p-6">
                <p className="t-label text-ink-3">Related capabilities</p>
                <ul className="mt-4 flex flex-col">
                  {relatedServices.map((service) => (
                    <li key={service!.slug}>
                      <Link
                        href={`/${service!.slug}`}
                        className="group flex items-center justify-between gap-3 border-b border-border py-3 last:border-b-0 text-[0.9375rem] text-ink-2 transition-colors hover:text-accent"
                      >
                        {service!.name}
                        <ArrowRight
                          aria-hidden
                          className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="surface" className="overflow-hidden">
        <TechGrid className="opacity-40" />
        <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="t-h2 max-w-[22ch]">Want this walked through on a call?</h2>
            <p className="t-lead mt-5 max-w-[56ch]">
              We will screen-share the rig, show the data path end to end, and answer the awkward
              questions about where the limits are.
            </p>
          </div>
          <Button href="/contact" size="lg" withArrow className="shrink-0">
            Talk to an engineer
          </Button>
        </div>
      </Section>
    </>
  );
}
