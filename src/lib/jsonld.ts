import { site, isPlaceholder } from "@/config/site";

/**
 * Structured data builders.
 *
 * Rule: a property is emitted ONLY when its value is real. Placeholders are
 * stripped, so we never publish "[+91XXXXXXXXXX]" as a telephone number in
 * schema.org markup.
 */

function real(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  if (isPlaceholder(value)) return undefined;
  return value;
}

function compact<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== "" && v !== null),
  ) as T;
}

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

export function organizationSchema() {
  const sameAs = [site.social.linkedin, site.social.youtube, site.social.x, site.social.github]
    .map(real)
    .filter(Boolean);

  return compact({
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: real(site.name) ?? site.name,
    legalName: real(site.legalName),
    url: site.url,
    description: site.description,
    slogan: site.tagline,
    email: real(site.contact.email),
    telephone: real(site.contact.phoneE164),
    foundingDate: real(site.founded),
    address: compact({
      "@type": "PostalAddress",
      streetAddress: real(site.address.street),
      addressLocality: real(site.address.locality),
      addressRegion: real(site.address.region),
      postalCode: real(site.address.postalCode),
      addressCountry: site.address.country,
    }),
    areaServed: [
      { "@type": "Country", name: "India" },
      ...site.serviceAreas.map(real).filter(Boolean).map((c) => ({ "@type": "City", name: c })),
    ],
    knowsAbout: [
      "Industrial IoT",
      "Industrial Automation",
      "PLC Programming",
      "SCADA Development",
      "HMI Development",
      "Machine Monitoring",
      "Predictive Maintenance",
      "OPC UA",
      "Modbus TCP",
      "MQTT Sparkplug B",
      "Edge Computing",
      "Industrial System Integration",
    ],
    ...(sameAs.length ? { sameAs } : {}),
  });
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: site.name,
    publisher: { "@id": ORG_ID },
    inLanguage: site.lang,
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return compact({
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: `${site.url}${opts.path}`,
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "Country", name: "India" },
      ...site.serviceAreas.map(real).filter(Boolean).map((c) => ({ "@type": "City", name: c })),
    ],
    audience: {
      "@type": "BusinessAudience",
      name: "Manufacturing plants, process industries, OEMs and system integrators",
    },
  });
}

export function faqSchema(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(trail: ReadonlyArray<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}

export function itemListSchema(
  items: ReadonlyArray<{ name: string; path: string; description?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${site.url}${item.path}`,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  author?: string;
}) {
  return compact({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: `${site.url}${opts.path}`,
    datePublished: opts.datePublished,
    author: compact({ "@type": "Organization", name: real(site.name) ?? site.name }),
    publisher: { "@id": ORG_ID },
  });
}
