# PHASE 11–12 — Component Architecture & Implementation Plan

---

## 11.1 Stack

| Layer | Choice | Reason |
| --- | --- | --- |
| Framework | **Next.js 16 (App Router)** | RSC by default keeps client JS tiny; first-class Metadata/sitemap/OG-image APIs; ISR for insights |
| Language | **TypeScript (strict)** | Content is data-driven; types are the guardrail against thin/broken pages |
| Styling | **Tailwind CSS v4** with a `@theme` token layer | Tokens live in CSS, so the design system is the single source of truth for both Tailwind utilities and raw CSS/SVG |
| Motion | **None — CSS only** | Every animation in the build turned out to be expressible as CSS keyframes on `transform`/`opacity`/`stroke-dashoffset` plus `IntersectionObserver`. Motion was installed, went unused, and was removed. Zero animation-library bytes anywhere on the site, not just on the critical path |
| Icons | **lucide-react**, tree-shaken, plus hand-authored SVG for all industrial diagrams | Generic icon sets cannot draw a PLC or a gateway; the diagrams are bespoke |
| Not used | Motion/Framer, GSAP, Three.js, a UI kit, a CSS-in-JS runtime | None earned its bytes here. Three.js was considered for the hero and rejected: an SVG schematic is sharper, ~200KB lighter, indexable, and accessible |

## 11.2 Directory layout

```
src/
├─ app/
│  ├─ layout.tsx                     fonts, tokens, Organization+LocalBusiness JSON-LD, nav, footer
│  ├─ page.tsx                       homepage — composes 15 section components
│  ├─ sitemap.ts  robots.ts  opengraph-image.tsx
│  ├─ what-we-do/page.tsx
│  ├─ [service]/page.tsx             generateStaticParams over services data → 12 money pages
│  ├─ industries/page.tsx
│  ├─ industries/[slug]/page.tsx
│  ├─ projects/page.tsx  projects/[slug]/page.tsx
│  ├─ how-we-work/page.tsx  technology/page.tsx  about/page.tsx
│  ├─ insights/page.tsx  insights/[slug]/page.tsx
│  ├─ contact/page.tsx  estimate/page.tsx
│  ├─ legal/privacy/page.tsx  legal/terms/page.tsx
│  └─ api/lead/route.ts              server-side validation + honeypot + rate limit
│
├─ components/
│  ├─ layout/     SiteHeader, MegaMenu, MobileNav, SiteFooter, StickyActionBar, SkipLink
│  ├─ ui/         Button, SpecCard, SectionHeader, Eyebrow, StatusPill, DataReadout,
│  │              Counter, Reveal, TechGrid, Prose, Accordion, Field
│  ├─ home/       Hero, CapabilityBar, ProblemSection, BrownfieldSection, LiveDemo,
│  │              ArchitectureFlow, WhatWeBuild, IndustriesExplorer, ProcessSection,
│  │              ProjectsSection, WhyUs, TechnologySection, CommercialsSection,
│  │              FaqSection, FinalCta
│  ├─ diagrams/   HeroSchematic, ArchitectureDiagram, ServiceArchitecture
│  ├─ service/    ServiceHero, ProtocolTable, RetrofitBlock, UseCaseGrid, ServiceFaq
│  ├─ forms/      ShortLeadForm, EstimateWizard, FormField
│  └─ seo/        JsonLd, Breadcrumbs
│
├─ content/                          ALL copy lives here as typed data — never inline in JSX
│  ├─ services.ts       12 money pages, fully written
│  ├─ industries.ts     11 industries
│  ├─ projects.ts       demonstration projects (labelled)
│  ├─ process.ts        8 stages
│  ├─ technology.ts     protocols, platforms, hardware
│  ├─ faq.ts            homepage + per-service
│  └─ home.ts           homepage copy
│
├─ config/site.ts                    ★ every [PLACEHOLDER] lives here
├─ lib/                              seo.ts, jsonld.ts, analytics.ts, utils.ts, useReducedMotion.ts
└─ styles/                           tokens.css (design tokens), globals.css
```

## 11.3 Server / client boundary

Everything is a **server component** unless it needs state or effects. The four client islands:

| Island | Why client | Loading |
| --- | --- | --- |
| `SiteHeader` (nav state) | scroll listener, menu state | eager, tiny |
| `HeroSchematic` | **not a client component** — pure CSS | server-rendered; only its ~1KB value ticker is client-side |
| `ArchitectureFlow` | scroll progress | `next/dynamic`, below fold |
| `LiveDemo` + `EstimateWizard` | simulation state, form state | `next/dynamic`, `ssr:false` |

This keeps the homepage's client bundle small even though it is visually dense.

## 11.4 Content-as-data

Copy is never written inline in JSX. It lives in `src/content/*.ts` behind types like:

```ts
type Service = {
  slug, name, h1, title, description, primaryKeyword,
  eyebrow, lead, problem: {…}, deliverables[], howItWorks[],
  protocols: {name, use, note}[], retrofit: {…},
  useCases[], industries[], faq: {q,a}[], relatedServices[], cta
}
```

Three payoffs: (1) every money page is guaranteed to have the full 13-section SEO template —
the type makes an incomplete page a compile error; (2) copy edits never touch components;
(3) `sitemap.ts`, the mega-menu, breadcrumbs and JSON-LD are all generated from the same source,
so they cannot drift.

## 11.5 Implementation plan

| Phase | Scope | Status in this build |
| --- | --- | --- |
| 0 | Scaffold, tokens, fonts, config, primitives | ✅ |
| 1 | Layout shell: header, mega-menu, mobile nav, footer, sticky bar | ✅ |
| 2 | Homepage — all 15 sections incl. hero animation, architecture scroll, live demo | ✅ |
| 3 | Service system: data + template → 12 money pages | ✅ |
| 4 | Industries hub + 11 industry pages | ✅ |
| 5 | Projects, How We Work, Technology, About, Insights, Contact, Estimate, Legal | ✅ |
| 6 | SEO: metadata, sitemap, robots, OG images, full JSON-LD | ✅ |
| 7 | Lead API with validation, honeypot, rate limiting | ✅ scaffolded — connect to CRM/email |
| 8 | **Client tasks:** fill `src/config/site.ts`, add real logo, connect form delivery, add GA4/Ads IDs, write first 12 insights, publish real projects as they ship | ⬜ handover |
