# FerruleTech — Industrial Digital Transformation

A production-ready Next.js website designed as a **B2B lead-generation system** for an
industrial IoT / automation / PLC / SCADA / industrial software company in India.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run check:all    # typecheck + lint + config warnings
npm run build:prod   # fails if placeholders remain, then builds
```

---

## Before you deploy — the only file you must edit

Everything company-specific lives in **`src/config/site.ts`**: name, legal name, phone,
WhatsApp number, email, address, service areas, LinkedIn, GST/CIN, analytics IDs.

Fill it in, set `NEXT_PUBLIC_SITE_URL` in the environment, then:

```bash
npm run check:config     # lists every placeholder still outstanding
```

`build:prod` runs this first and refuses to build while placeholders remain, because a live
site with `[+91 XXXXX XXXXX]` in its schema.org markup
is worse than no site. Until `NEXT_PUBLIC_SITE_URL` is set, `robots.txt` disallows all
crawling — so a staging deploy cannot be indexed by accident.

### Handover checklist

| | Task | Where |
| --- | --- | --- |
| ☐ | Company details, phone, WhatsApp, email, address | `src/config/site.ts` |
| ☐ | `NEXT_PUBLIC_SITE_URL` | environment / hosting config |
| ☑ | Logo — vector mark, favicon and transparent raster assets built from the supplied artwork | `src/components/layout/FerruleMark.tsx`, `public/brand/` |
| ☐ | **Supply the original logo vector** (.ai/.svg/.eps) — current assets are reconstructed from a 268px screenshot | `public/brand/README.md` |
| ☐ | **Connect lead delivery** — email / CRM / WhatsApp API | `src/app/api/lead/route.ts` → `deliver()` |
| ☐ | GA4 + Google Ads IDs, then add the gtag script | `src/config/site.ts`, `src/app/layout.tsx` |
| ☐ | Founder biography (currently a marked placeholder block) | `src/app/about/page.tsx` |
| ☐ | Legal review of privacy policy (DPDP Act 2023) and terms | `src/app/legal/*` |
| ☐ | Write the first insights articles | `src/content/insights.ts` |
| ☐ | Replace demonstration projects with real case studies as they exist | `src/content/projects.ts` |

**`deliver()` is deliberately unimplemented.** It validates, rate-limits and logs, but does not
send anywhere — wiring it to a placeholder inbox would silently drop enquiries. Pick a
transport (Resend/Postmark/SES, a CRM webhook, or the WhatsApp Business API), implement it, and
make sure a delivery failure returns non-200 so the visitor is told to call instead.

---

## Strategy documents

The reasoning behind every structural decision is in `docs/`. Read these before making
significant changes — most of what looks like a style choice is a conversion or SEO decision.

| Document | Covers |
| --- | --- |
| `docs/01-STRATEGY.md` | Brand positioning, audience, personas, competitive differentiation |
| `docs/02-SITEMAP-AND-UX.md` | Sitemap, navigation, homepage section order and reasoning, lead-gen architecture |
| `docs/03-DESIGN-AND-MOTION.md` | Colour, typography, spacing, responsive strategy, accessibility, full animation system with timings |
| `docs/04-SEO.md` | Keyword map, money-page template, location SEO, international architecture, Google Ads plan, content calendar |
| `docs/05-ARCHITECTURE.md` | Stack rationale, directory layout, server/client boundary, implementation phases |

---

## How the site is put together

### Content is data, not JSX

All copy lives in `src/content/*.ts` behind types in `src/content/types.ts`.

```
services.ts       12 money pages, fully written
industries.ts     11 industry pages
projects.ts       demonstration builds + reference architectures
architecture.ts   the 10-stage data path
process.ts        8-stage delivery process + engagement models
technology.ts     protocols, platforms, security principles, AI layer
home.ts           homepage copy
insights.ts       editorial pipeline
```

Three consequences:

1. **A thin page is a compile error.** The `Service` type requires all thirteen sections of the
   money-page template, so a page cannot ship half-written.
2. Copy edits never touch components.
3. `sitemap.ts`, the mega-menu, breadcrumbs and JSON-LD are all generated from the same source,
   so they cannot drift apart.

Adding a service = one entry in `services.ts`. The route, nav entry, footer link, sitemap
entry, `Service` schema and internal links all appear automatically.

### Routes

```
/                          homepage — 15 sections
/what-we-do                capability hub
/[service]                 12 money pages (generateStaticParams, dynamicParams: false)
/industries                hub + /industries/[slug] × 11
/projects                  hub + /projects/[slug] × 4  (honestly labelled)
/how-we-work  /technology  /about  /insights  /contact  /estimate
/legal/privacy  /legal/terms
/api/lead                  validated intake (honeypot + rate limit)
sitemap.xml  robots.txt  opengraph-image
```

45 pages, all statically prerendered except the lead API.

### Client/server boundary

Everything is a server component except four islands:

| Island | Why | Loading |
| --- | --- | --- |
| `SiteHeader` | menu state, scroll state | eager, small |
| `HeroSchematic` | **none** — it is a server component; the animation is pure CSS | eager |
| `LiveDemo`, `ArchitectureFlow`, `IndustriesExplorer` | simulation, scroll progress, tab state | `next/dynamic`, below fold |

The hero adds **no JavaScript** to the critical path. Its entire cinematic sequence is CSS
keyframes on `transform`, `opacity` and `stroke-dashoffset`, so animation can never gate LCP.
The only script in the hero is a ~1KB ticker for the ambient value drift.

---

## Things that were done deliberately

- **Signal orange, not cyan.** Every IIoT site is navy-and-electric-cyan. Orange is what
  industrial environments actually look like, and cyan is rationed here to mean "live data" —
  colour carries meaning rather than decoration.
- **No fabricated proof.** No client logos, testimonials, certifications, awards, project counts
  or results anywhere. Demonstration builds are labelled on every card and again on the page.
  The interactive demo says "simulated data" inside the component, not in a footnote.
- **The brownfield promise sits at section 4**, before the pitch, because "will this mean buying
  new machines?" is the primary purchase blocker.
- **No `-india` URL suffixes.** `/plc-programming` and `/plc-programming-india` would cannibalise
  each other. Geography is handled by hreflang, schema and genuine location pages. See
  `docs/04-SEO.md` §8.4.
- **No pricing table.** `/estimate` publishes the cost drivers instead, which is both honest and
  a better converter.
- **Native `<details>` for FAQs** — works before hydration, keyboard-correct for free, and
  find-in-page can open a closed answer.
- **No exit-intent popups, no auto-opening chat, no gated brochures.** All three destroy
  credibility with this audience.

---

## Accessibility & performance

- Semantic landmarks, one `h1` per page, skip link, visible 2px focus ring never removed.
- The interactive demo is fully keyboard-operable and exposes an `aria-live` summary so screen
  reader users get the same information as the tiles convey visually.
- `prefers-reduced-motion` is honoured throughout: the CSS neutralises all animation, the
  architecture section drops its sticky scroll behaviour for a plain complete list, and the
  demo simulation stops while remaining readable and interactive.
- Machine state is never communicated by colour alone — every status pairs colour with a label.
- Only `transform` and `opacity` animate. Scroll listeners are passive and rAF-throttled. The
  demo interval pauses off-screen and when the tab is hidden.
- Fonts are self-hosted and subset via `next/font`; no external font requests, no layout shift.

**Not yet verified:** Lighthouse/Core Web Vitals against a production build on real hardware,
and visual QA at mobile breakpoints on a device. The CSS is mobile-first with dedicated mobile
layouts (see `docs/03` §6.6), but that should be checked on a phone before launch.

---

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · lucide-react.

**No animation library.** Motion was installed at the start and removed at the end, because
every animation here — the hero sequence, the scroll reveals, the travelling data pulses, the
architecture scroll engine — turned out to be CSS keyframes plus `IntersectionObserver`. No
GSAP, no Three.js, no UI kit either.

Measured first-load JS on `/` is ~230KB gzipped, most of which is the React 19 / Next 16
framework floor. The hero contributes ~1KB (its ambient value ticker); everything else in the
hero is CSS, so the LCP text paints before any script runs.
