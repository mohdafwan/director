/**
 * Content types.
 *
 * These types are the enforcement mechanism for the money-page template in
 * docs/04-SEO.md §8.3 — an incomplete service page is a compile error, not a
 * thin page that quietly ships.
 */

export type SpineStage = "connect" | "automate" | "monitor" | "analyse" | "build";

export type Faq = { q: string; a: string };

export type ProtocolRow = {
  name: string;
  use: string;
  note: string;
};

export type FlowStep = {
  step: string;
  title: string;
  body: string;
};

export type UseCase = {
  title: string;
  situation: string;
  outcome: string;
};

export type Service = {
  slug: string;
  /** Nav + card label */
  name: string;
  /** Which stage of CONNECT → AUTOMATE → MONITOR → ANALYSE → BUILD */
  spine: SpineStage;
  /** One-line summary for menus and cards */
  summary: string;

  /* ── SEO ────────────────────────────────────────────────────────────────── */
  /** Exactly one page owns each primary keyword. No exceptions. */
  primaryKeyword: string;
  title: string; // ≤ 60 chars
  description: string; // 150–160 chars
  serviceType: string; // schema.org serviceType

  /* ── Page content ───────────────────────────────────────────────────────── */
  eyebrow: string;
  h1: string;
  lead: string;

  problem: {
    title: string;
    body: string;
    symptoms: string[];
  };

  /** Concrete deliverables — nouns, not adjectives */
  deliverables: { title: string; body: string }[];

  howItWorks: FlowStep[];

  protocols: ProtocolRow[];

  /** The brownfield block. Every service page has one. */
  retrofit: {
    title: string;
    body: string;
    worksWith: string[];
  };

  useCases: UseCase[];

  /** Slugs from industries.ts */
  industries: string[];

  faq: Faq[];

  /** Slugs of sibling services for lateral internal linking */
  related: string[];

  cta: { title: string; body: string; label: string };
};

export type Industry = {
  slug: string;
  name: string;
  short: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  /** What actually goes wrong in this sector */
  problems: string[];
  /** What we build for it */
  solutions: { title: string; body: string }[];
  /** Sensors, protocols and systems typical to the sector */
  technology: string[];
  /** Outcome areas — described, never quantified with invented numbers */
  outcomes: string[];
  /** Service slugs most relevant here */
  services: string[];
  faq: Faq[];
};

export type DemoProject = {
  slug: string;
  /** Always rendered next to the title. Never omitted. */
  kind: "Engineering Demonstration" | "Reference Architecture";
  name: string;
  title: string;
  description: string;
  summary: string;
  spine: SpineStage;
  context: string;
  challenge: string[];
  approach: { title: string; body: string }[];
  stack: string[];
  whatItShows: string[];
  /** Honest note about what is and is not real. Required. */
  disclosure: string;
  services: string[];
};

export type ProcessStage = {
  index: string;
  name: string;
  duration: string;
  body: string;
  outputs: string[];
};
