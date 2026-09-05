import type { MetadataRoute } from "next";
import { site, isPlaceholderOrigin } from "@/config/site";

/**
 * Generated at build time. `force-static` is required for `output: export`
 * (a static host has no runtime to evaluate it) and is correct in the Node
 * build too — nothing here depends on the incoming request.
 */
export const dynamic = "force-static";


export default function robots(): MetadataRoute.Robots {
  // Never index a build that has no real domain, or one explicitly flagged as
  // a preview — a github.io copy competing with the real site is duplicate
  // content that is hard to unpick later.
  if (isPlaceholderOrigin || site.noindex) {
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
