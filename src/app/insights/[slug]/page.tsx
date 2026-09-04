import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { publishedInsights, getInsight } from "@/content/insights";
import { getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, TechGrid } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";

/**
 * Only published insights get a route. Planned ones are listed on the index as
 * a visible pipeline and are deliberately not addressable — an empty article
 * URL is a soft 404 and a thin-content signal.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedInsights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return buildMetadata({
    title: insight.title,
    description: insight.description,
    path: `/insights/${insight.slug}`,
    type: "article",
    publishedTime: insight.publishedAt,
  });
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight || insight.status !== "published") notFound();

  const service = getService(insight.relatedService);

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: insight.title,
          description: insight.description,
          path: `/insights/${insight.slug}`,
          datePublished: insight.publishedAt ?? "",
        })}
      />

      <section className="relative overflow-hidden rule-b">
        <TechGrid className="opacity-50" />
        <div className="container-site relative pb-14 pt-10 lg:pb-16 lg:pt-14">
          <Breadcrumbs
            trail={[
              { name: "Insights", path: "/insights" },
              { name: insight.title, path: `/insights/${insight.slug}` },
            ]}
          />
          <h1 className="t-h1 mt-10 max-w-[24ch]">{insight.title}</h1>
          <p className="t-lead mt-6 max-w-[64ch]">{insight.description}</p>
          {insight.publishedAt && (
            <p className="mt-6 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink-3">
              <time dateTime={insight.publishedAt}>
                {new Date(insight.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </p>
          )}
        </div>
      </section>

      <Section bordered={false}>
        <article className="prose-industrial">
          {insight.body?.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        </article>

        {service && (
          <div className="mt-14 max-w-[68ch] border border-border bg-surface p-6">
            <p className="t-label text-ink-3">Related capability</p>
            <Link
              href={`/${service.slug}`}
              className="group mt-3 flex items-center justify-between gap-4"
            >
              <span>
                <span className="block font-display text-lg font-semibold text-ink transition-colors group-hover:text-accent">
                  {service.name}
                </span>
                <span className="block text-[0.9375rem] text-ink-3">{service.summary}</span>
              </span>
              <ArrowRight
                aria-hidden
                className="size-4 shrink-0 text-ink-3 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        )}

        <div className="mt-10">
          <Button href="/contact" withArrow>
            Ask us about this
          </Button>
        </div>
      </Section>
    </>
  );
}
