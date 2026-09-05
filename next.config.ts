import type { NextConfig } from "next";

/**
 * Two build modes.
 *
 *  default            — Node runtime. Keeps the /api/lead route, image
 *                       optimisation and security headers. Use for Vercel,
 *                       Netlify, Cloudflare, a VPS, or `next start`.
 *
 *  NEXT_OUTPUT=export — static HTML into ./out, for a host that cannot run
 *                       Node (GitHub Pages). Route handlers, image
 *                       optimisation and response headers do not exist on such
 *                       a host, so they are switched off rather than silently
 *                       ignored. See .github/workflows/deploy-pages.yml.
 */
const isStaticExport = process.env.NEXT_OUTPUT === "export";

/** GitHub Pages project sites are served from /<repo>, not from the root. */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  // The repo root, so Turbopack does not pick up a lockfile from a parent dir.
  turbopack: { root: __dirname },

  ...(basePath ? { basePath, assetPrefix: basePath } : {}),

  ...(isStaticExport
    ? {
        output: "export",
        // No optimiser on a static host — images are served as authored.
        images: { unoptimized: true },
      }
    : {
        images: {
          // AVIF first, WebP fallback. Explicit dimensions at every call site.
          formats: ["image/avif", "image/webp"],
        },

        async headers() {
          return [
            {
              source: "/:path*",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
                {
                  key: "Permissions-Policy",
                  value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
                },
                // The site is en-IN by default; see docs/04-SEO.md 8.5 for the
                // subdirectory locale plan.
                { key: "Content-Language", value: "en-IN" },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
