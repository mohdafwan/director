import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { services, getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, serviceSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  ServiceHero,
  ServiceProblem,
  ServiceDeliverables,
  ServiceHowItWorks,
  ServiceProtocols,
  ServiceRetrofit,
  ServiceUseCases,
  ServiceLinks,
  ServiceProcessAndProof,
  ServiceFaq,
  ServiceCta,
} from "@/components/service/ServiceSections";

/**
 * The twelve money pages, generated from `src/content/services.ts`.
 *
 * The `Service` type enforces the full 13-section template from
 * docs/04-SEO.md §8.3 — an incomplete page is a compile error rather than a
 * thin page that quietly ships.
 *
 * `dynamicParams: false` means any slug that is not a real service 404s
 * instead of rendering an empty page, so this catch-all cannot create
 * soft-404s or index junk URLs.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.description,
          path: `/${service.slug}`,
          serviceType: service.serviceType,
        })}
      />
      <JsonLd data={faqSchema(service.faq)} />

      <ServiceHero service={service} />
      <ServiceProblem service={service} />
      <ServiceDeliverables service={service} />
      <ServiceHowItWorks service={service} />
      <ServiceProtocols service={service} />
      <ServiceRetrofit service={service} />
      <ServiceUseCases service={service} />
      <ServiceLinks service={service} />
      <ServiceProcessAndProof service={service} />
      <ServiceFaq service={service} />
      <ServiceCta service={service} />
    </>
  );
}
