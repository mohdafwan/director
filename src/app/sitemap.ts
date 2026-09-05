import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { publishedInsights } from "@/content/insights";

/**
 * Generated at build time. `force-static` is required for `output: export`
 * (a static host has no runtime to evaluate it) and is correct in the Node
 * build too — nothing here depends on the incoming request.
 */
export const dynamic = "force-static";


/**
 * Priority tiers follow docs/04-SEO.md §8.6:
 *   money pages 0.9 · hubs 0.8 · industries 0.7 · proof and posts 0.6
 *
 * Every URL here is generated from the same content files that render the
 * pages, so the sitemap cannot drift out of sync with the site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;

  return [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },

    // Hubs
    ...["/what-we-do", "/industries", "/projects", "/how-we-work", "/technology"].map((path) => ({
      url: url(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // Money pages
    ...services.map((service) => ({
      url: url(`/${service.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),

    // Industries
    ...industries.map((industry) => ({
      url: url(`/industries/${industry.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // Proof
    ...projects.map((project) => ({
      url: url(`/projects/${project.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),

    // Editorial
    { url: url("/insights"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    ...publishedInsights.map((insight) => ({
      url: url(`/insights/${insight.slug}`),
      lastModified: insight.publishedAt ? new Date(insight.publishedAt) : now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),

    // Conversion + company
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: url("/estimate"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: url("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },

    // Legal
    ...["/legal/privacy", "/legal/terms"].map((path) => ({
      url: url(path),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
