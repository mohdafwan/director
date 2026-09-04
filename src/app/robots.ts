import type { MetadataRoute } from "next";
import { site, isPlaceholderOrigin } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // A staging build on the placeholder origin must never be indexed.
  if (isPlaceholderOrigin) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Paid landing pages are noindex,follow and live under /lp/.
        disallow: ["/api/", "/lp/", "/*?*"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
