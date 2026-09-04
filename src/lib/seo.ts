import type { Metadata } from "next";
import { site } from "@/config/site";

type BuildMeta = {
  title: string;
  description: string;
  /** Path with leading slash, e.g. "/plc-programming" */
  path: string;
  /** Set true for paid landing pages and thank-you screens. */
  noindex?: boolean;
  /** Override the OG image path. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  noindex = false,
  image,
  type = "website",
  publishedTime,
}: BuildMeta): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const ogImage = image ?? "/opengraph-image";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
