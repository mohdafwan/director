/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH FOR ALL COMPANY DETAILS.
 *
 * Every [PLACEHOLDER] on the website resolves from this file.
 * Fill these in once and the entire site — pages, metadata, schema.org,
 * footer, WhatsApp links, phone links — updates.
 *
 * Nothing here is invented. Values that are not yet real are left as
 * explicit placeholders so they are impossible to ship by accident.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const PLACEHOLDER_PREFIX = "[";

/** True when a value is still an unfilled placeholder. */
export function isPlaceholder(value: string): boolean {
  return value.trim().startsWith(PLACEHOLDER_PREFIX);
}

/**
 * The production origin.
 *
 * Next.js needs a parseable URL for `metadataBase`, canonicals and OG images,
 * so this one placeholder cannot use the `[TOKEN]` form. `.example` is an
 * IANA-reserved TLD — it is a valid URL, it can never resolve to a real site,
 * and it is unmistakably unfilled in any canonical tag it appears in.
 *
 * Set NEXT_PUBLIC_SITE_URL in the environment (or edit the fallback below)
 * before deploying. `npm run check:config` fails the build if it is still the
 * placeholder.
 */
const PLACEHOLDER_ORIGIN = "https://company.example";
const DEFAULT_ORIGIN = "https://ferruletech.com";

function resolveOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const candidate = fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_ORIGIN;
  try {
    const url = new URL(candidate);
    // Keep any path prefix: a GitHub Pages project site lives at
    // https://<user>.github.io/<repo>, and canonicals must include the repo.
    return `${url.origin}${url.pathname}`.replace(/\/+$/, "");
  } catch {
    return DEFAULT_ORIGIN;
  }
}

/**
 * Path prefix for a sub-directory deployment (a GitHub Pages project site is
 * served from /<repo>).
 *
 * next/link, next/font and the metadata routes get this applied by Next
 * automatically. `next/image` does NOT apply it to `src` when the optimiser is
 * off, which is exactly the static-export case — so public assets referenced
 * by <Image> must prefix it themselves via `asset()`.
 */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");
const needsAssetPrefix = process.env.NEXT_OUTPUT === "export" && basePath !== "";

/** Prefix a /public asset path for the current deployment. */
export function asset(path: string): string {
  return needsAssetPrefix ? `${basePath}${path}` : path;
}

export const siteOrigin = resolveOrigin();
export const isPlaceholderOrigin = siteOrigin === PLACEHOLDER_ORIGIN;

export const site = {
  // ── Identity ───────────────────────────────────────────────────────────────
  name: "FerruleTech",
  shortName: "FerruleTech",
  legalName: "FERRULETECH LEGAL ENTITY PVT LTD",
  /** Rendered in the nav lockup. Uppercased by the component. */
  wordmark: "FerruleTech",

  tagline: "Industrial Digital Transformation",
  /** One-line description used in metadata + Organization schema. */
  description:
    "We connect, automate and monitor industrial plants — IIoT, PLC, SCADA, HMI and custom software, engineered by one team from the sensor to the dashboard.",

  founded: "2020",
  founder: "Mohammad Afwan Anjum",
  founderRole: "Founder & CEO",

  // ── Web ────────────────────────────────────────────────────────────────────
  /** Production origin, no trailing slash. Set via NEXT_PUBLIC_SITE_URL. */
  url: siteOrigin,
  locale: "en_IN",
  lang: "en-IN",

  // ── Contact ────────────────────────────────────────────────────────────────
  contact: {
    /** E.164 for tel: links, e.g. +919876543210 */
    phoneE164: "+917666388816",
    /** Human-readable for display, e.g. +91 98765 43210 */
    phoneDisplay: "+91 76663 88816",
    /** Digits only, country code included, for wa.me — e.g. 919876543210 */
    whatsappNumber: "917666388816",
    email: "hello@ferruletech.com",
    salesEmail: "projects@ferruletech.com",
    /** Where lead notifications are delivered. Used by /api/lead. */
    leadInbox: "projects@ferruletech.com",
  },

  // ── Address (LocalBusiness schema) ─────────────────────────────────────────
  address: {
    street: "101, 1st Floor, 2nd Cross, Building No. 14, c/wing",
    locality: "Mumbra, Thane, Shilphata Road",
    region: "Maharashtra",
    postalCode: "400612",
    country: "IN",
    countryName: "India",
    /** Optional — improves LocalBusiness schema. */
    latitude: "",
    longitude: "",
  },

  /** Cities where engineers can genuinely reach a plant. Drives areaServed. */
  serviceAreas: ["[CITY 1]", "[CITY 2]", "[CITY 3]"],

  // ── Social ─────────────────────────────────────────────────────────────────
  social: {
    linkedin: "[https://linkedin.com/company/ferruletech]",
    youtube: "",
    x: "",
    github: "",
  },

  /**
   * Where the contact and estimate forms POST.
   *
   * Defaults to the built-in route handler, which validates, rate-limits and
   * screens the honeypot server-side. A static host cannot run that route, so
   * set NEXT_PUBLIC_LEAD_ENDPOINT to a form service or a serverless function
   * when deploying to one. See README "Deploying".
   */
  leadEndpoint: process.env.NEXT_PUBLIC_LEAD_ENDPOINT?.trim() || "/api/lead",

  /** Set NEXT_PUBLIC_NOINDEX=1 on preview deploys to keep them out of search. */
  noindex: process.env.NEXT_PUBLIC_NOINDEX === "1",

  // ── Analytics (leave empty to disable) ─────────────────────────────────────
  analytics: {
    ga4Id: "", // e.g. "G-XXXXXXXXXX"
    googleAdsId: "AW-18447122209",
    adsLeadConversionLabel: "", // e.g. "AbC-D_efG"
  },

  /**
   * Logo gradient, measured from the supplied artwork. Kept here so the SVG
   * mark, the favicon and the OG image cannot drift apart.
   * See src/components/layout/FerruleMark.tsx
   */
  brand: {
    violet: "#9046E2",
    indigo: "#2A2086",
    blue: "#0F6FD0",
    rimLight: "#F0E0FF",
    rimBlue: "#8FB8DA",
  },

  // ── Business facts (only fill in what is TRUE) ─────────────────────────────
  business: {
    /** Leave empty rather than inventing. Rendered only when non-empty. */
    gstin: "",
    cin: "",
    udyam: "",
  },
} as const;

export type Site = typeof site;

/** tel: href */
export const telHref = `tel:${site.contact.phoneE164.replace(/[^\d+]/g, "")}`;

/** Build a WhatsApp deep link with page context pre-filled into the message. */
export function whatsappHref(context?: string): string {
  const number = site.contact.whatsappNumber.replace(/\D/g, "");
  const message = context
    ? `Hi ${site.name}, I'd like to discuss ${context} for my plant.`
    : `Hi ${site.name}, I'd like to discuss an industrial project.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const mailHref = `mailto:${site.contact.email}`;
