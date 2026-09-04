import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The repo root, so Turbopack does not pick up a lockfile from a parent dir.
  turbopack: { root: __dirname },

  images: {
    // AVIF first, WebP fallback. Explicit dimensions are set at every call site.
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
};

export default nextConfig;
