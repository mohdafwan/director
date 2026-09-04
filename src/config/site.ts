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

function resolveOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const candidate = fromEnv && fromEnv.length > 0 ? fromEnv : PLACEHOLDER_ORIGIN;
  try {
    return new URL(candidate).origin;
  } catch {
    return PLACEHOLDER_ORIGIN;
  }
}

export const siteOrigin = resolveOrigin();
export const isPlaceholderOrigin = siteOrigin === PLACEHOLDER_ORIGIN;

export const site = {
  // ── Identity ───────────────────────────────────────────────────────────────
  name: "[COMPANY NAME]",
  shortName: "[COMPANY]",
  legalName: "[COMPANY LEGAL NAME PVT LTD]",
  /** Used in <title> templates and the wordmark. */
  wordmark: "[COMPANY NAME]",

  tagline: "Industrial Digital Transformation",
  /** One-line description used in metadata + Organization schema. */
  description:
    "We connect, automate and monitor industrial plants — IIoT, PLC, SCADA, HMI and custom software, engineered by one team from the sensor to the dashboard.",

  founded: "[YYYY]",
  founder: "[FOUNDER NAME]",
  founderRole: "[FOUNDER ROLE]",

  // ── Web ────────────────────────────────────────────────────────────────────
  /** Production origin, no trailing slash. Set via NEXT_PUBLIC_SITE_URL. */
  url: siteOrigin,
  locale: "en_IN",
  lang: "en-IN",

  // ── Contact ────────────────────────────────────────────────────────────────
  contact: {
    /** E.164 for tel: links, e.g. +919876543210 */
    phoneE164: "[+91XXXXXXXXXX]",
    /** Human-readable for display, e.g. +91 98765 43210 */
    phoneDisplay: "[+91 XXXXX XXXXX]",
    /** Digits only, country code included, for wa.me — e.g. 919876543210 */
    whatsappNumber: "[91XXXXXXXXXX]",
    email: "[hello@domain.com]",
    salesEmail: "[projects@domain.com]",
    /** Where lead notifications are delivered. Used by /api/lead. */
    leadInbox: "[projects@domain.com]",
  },

  // ── Address (LocalBusiness schema) ─────────────────────────────────────────
  address: {
    street: "[STREET ADDRESS]",
    locality: "[CITY]",
    region: "[STATE]",
    postalCode: "[PIN]",
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
    linkedin: "[https://linkedin.com/company/...]",
    youtube: "",
    x: "",
    github: "",
  },

  // ── Analytics (leave empty to disable) ─────────────────────────────────────
  analytics: {
    ga4Id: "", // e.g. "G-XXXXXXXXXX"
    googleAdsId: "", // e.g. "AW-XXXXXXXXX"
    adsLeadConversionLabel: "", // e.g. "AbC-D_efG"
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
