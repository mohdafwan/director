# PHASE 8 — SEO Architecture

---

## 8.1 The strategic premise

A new company cannot out-authority incumbents on head terms like *"industrial automation
company"* quickly. It **can** win on two fronts that incumbents have abandoned:

1. **Long-tail commercial intent** — `plc to cloud data logging`, `machine downtime monitoring
   system for small factory`, `connect old plc to dashboard`, `opc ua vs modbus for retrofit`.
   Low volume individually, very high intent, almost no serious competition.
2. **Engineering content that earns links** — protocol comparisons, retrofit walkthroughs,
   architecture teardowns. Engineers link to and share these; marketing pages never get links.

Head terms are the two-year goal, reached *through* topical authority built by the long tail —
not attacked directly on day one.

## 8.2 Keyword map — one intent per URL

| URL | Primary keyword | Secondary / long-tail cluster | Intent |
| --- | --- | --- | --- |
| `/` | industrial digital transformation company | industrial iot company india, iiot and automation company | Brand / category |
| `/industrial-iot` | industrial iot solutions | iiot solutions, industrial iot company india, iot for manufacturing, sensor to cloud | Commercial |
| `/industrial-automation` | industrial automation services | industrial automation company, factory automation services, automation system integrator | Commercial |
| `/plc-programming` | plc programming services | plc programming company, plc migration, siemens/allen-bradley/delta plc programming, plc integration | **High** commercial |
| `/scada-development` | scada development services | scada system integrator, scada implementation, ignition/wincc scada development, scada upgrade | **High** commercial |
| `/hmi-development` | hmi development services | hmi design, hmi programming, hmi screen development | Commercial |
| `/machine-monitoring` | machine monitoring system | factory monitoring system, production monitoring system, oee monitoring, machine downtime tracking | **High** commercial |
| `/predictive-maintenance` | predictive maintenance solutions | condition monitoring, vibration monitoring, predictive maintenance for manufacturing | Commercial |
| `/industrial-dashboards` | industrial dashboard development | real time production dashboard, plant dashboard software | Commercial |
| `/edge-computing` | industrial edge computing | iot gateway integration, opc ua gateway, modbus to mqtt | Technical-commercial |
| `/custom-industrial-software` | custom industrial software development | manufacturing software development, industrial web application | Commercial |
| `/industrial-mobile-apps` | industrial mobile app development | plant monitoring mobile app, factory app | Commercial |
| `/system-integration` | industrial system integration | erp mes integration, sap plant integration, legacy system integration | Commercial |
| `/industries/*` | `<industry> automation solutions` | `iot for <industry>`, `<industry> monitoring system` | Commercial, segmented |
| `/technology` | industrial iot protocols | opc ua, mqtt sparkplug b, modbus tcp, profinet, ethernet/ip | Informational, link magnet |
| `/how-we-work` | industrial iot implementation process | — | Consideration |
| `/projects/*` | `<use case> case study` | — | Proof |
| `/insights/*` | long-tail informational | one question per article | Top of funnel |

**Cannibalisation guard:** every page declares its primary keyword in front-matter-style page
data. Two pages may never share one. Overlapping sub-intents become **anchor-linked sections**
on the stronger page (e.g. *PLC migration*, *PLC troubleshooting* and *PLC–SCADA integration*
are `#`-anchored sections of `/plc-programming`, not separate URLs). This concentrates authority
instead of splitting it.

## 8.3 Money-page template (SEO + conversion in one structure)

Fixed order on every service page — consistent structure helps both crawlers and returning
evaluators:

1. **H1** — exact primary keyword, naturally phrased.
2. **Lead paragraph** — the keyword and its two closest variants in the first 100 words, written for humans.
3. **The problem** — symptom language the buyer would actually use.
4. **What we build** — concrete deliverables, not adjectives.
5. **How it works** — a technical architecture diagram, captioned.
6. **Protocols & technologies** — a real, specific table. *This is the section that wins the engineer.*
7. **Retrofit / brownfield block** — "works with your existing …" with named brands.
8. **Use cases** — 4–6, each one sentence of situation plus one of outcome.
9. **Industries** — internal links to industry pages.
10. **Implementation process** — condensed 8-stage, linking to `/how-we-work`.
11. **Related demonstration project** — internal link to `/projects/*`.
12. **FAQ** — 6–8 questions, marked up with `FAQPage` schema, targeting People-Also-Ask phrasing.
13. **CTA** — contextual to the service.

**On-page rules:** ≤ 60 char titles, 150–160 char descriptions, one H1, logical H2/H3, descriptive
anchor text (never "click here"), ≥ 4 contextual internal links out and ≥ 3 in, image alt text
that describes the diagram's content.

## 8.4 Location SEO — and why NOT `/plc-programming-india`

The brief proposed `/industrial-automation-india`, `/plc-programming-india`, etc. I recommend
against it, for three reasons:

1. **Cannibalisation.** `/plc-programming` and `/plc-programming-india` target the same intent for an India-based company. Google will pick one and the other dilutes internal link equity.
2. **The site is already India.** Country is communicated by hreflang `en-IN`, `Organization` and `LocalBusiness` schema, a `.in` or India-registered domain, Google Business Profile, an Indian address and phone number, and an India-hosted CDN edge. Suffixing URLs adds nothing Google does not already know.
3. **It scales badly.** When `/us/` launches, you inherit `/plc-programming`, `/plc-programming-india` *and* `/us/plc-programming` — three pages, one intent.

**Recommended instead:** a genuine `/locations/<city>` tier, launched only where real content exists.

A location page qualifies only if it can carry **all** of:
- Actual service coverage — engineers who can reach that plant, with a stated response time.
- Named local industrial clusters (e.g. Chakan/Ranjangaon for Pune, Sanand for Ahmedabad, Sriperumbudur for Chennai) and the sectors that dominate them.
- Location-specific engineering context — typical plant vintage, common PLC brands in that cluster, typical constraints.
- A local contact route and, ideally, a demonstration project relevant to that region.

Launch with **2–3 cities maximum**, chosen by where the founding team can genuinely travel.
Everything else is a doorway page, and Google's site-reputation and scaled-content-abuse policies
treat those harshly.

## 8.5 International architecture

**Recommendation: subdirectories on one domain**, with India at the root.

```
https://[DOMAIN]/            → en-IN   (default, x-default)
https://[DOMAIN]/us/         → en-US
https://[DOMAIN]/sg/         → en-SG
https://[DOMAIN]/ae/         → en-AE
https://[DOMAIN]/id/         → id-ID + en-ID
```

**Why subdirectories over the alternatives:**

| Option | Verdict |
| --- | --- |
| **ccTLDs** (`.in`, `.com.sg`, `.ae`) | Strongest geo signal, but each domain starts at zero authority and needs its own link building, hosting, and maintenance. Fatal for a company with no authority to spare. **Rejected.** |
| **Subdomains** (`us.domain.com`) | Google treats them as largely separate hosts for authority consolidation purposes; you split your strongest asset. Also more infrastructure. **Rejected.** |
| **Subdirectories** (`domain.com/us/`) | All authority accrues to one host. Trivial to implement in Next.js as a `[locale]` route segment. Geo-targetable per directory in Search Console. Cheapest to maintain. **Chosen.** |
| **Parameters** (`?country=us`) | Not indexable reliably. **Rejected.** |

**The one asymmetry, deliberately:** India lives at `/`, not `/in/`. Near-term traffic is
overwhelmingly Indian; forcing a redirect from `/` to `/in/` wastes crawl budget, weakens the
strongest URLs on the site, and adds a hop to every visit. `x-default` points at the root. If
India ever stops being the dominant market, moving to a symmetric `/in/` is a one-time,
well-understood migration.

**Rules:** never launch an empty locale folder. A locale folder only opens when it has
differentiated content (local entity, local phone, local case studies, local currency/compliance
notes). Reciprocal, self-referencing `hreflang` on every page. `Content-Language` header set.
Locale switching never geo-redirects automatically — it offers a banner and remembers the
choice; auto-redirects break crawling and infuriate users.

## 8.6 Technical SEO implementation

- **Metadata:** Next.js Metadata API on every route; `title.template` `"%s | [COMPANY NAME]"`; unique descriptions; `metadataBase` set.
- **Canonicals:** self-referencing on every page; anchor-linked sub-intents never get their own canonical.
- **Open Graph / X cards:** dynamic `opengraph-image.tsx` per route group so every service page has a distinct, on-brand social card generated at build time.
- **Sitemap:** `sitemap.ts` generating all static and data-driven routes with `lastModified` and priority tiering (money pages 0.9, hub 0.8, industries 0.7, insights 0.6).
- **Robots:** `robots.ts`, `/estimate/thank-you` and any query-parameter variants disallowed.
- **Structured data (JSON-LD):**
  - `Organization` + `LocalBusiness` (site-wide, in the root layout)
  - `WebSite` with `SearchAction`
  - `Service` on each money page, with `serviceType`, `areaServed`, `provider`
  - `FAQPage` on every page carrying an FAQ
  - `BreadcrumbList` on all nested routes
  - `Article` on insights posts
  - `ItemList` on hubs
- **Performance as ranking input:** Core Web Vitals targets in §7.6 are enforced, since they are also the conversion targets.
- **Internal linking:** the mega-menu links every money page from every page (site-wide equity distribution); each money page links laterally to 3–4 sibling services and up to its hub; industry pages link down to services and vice versa. Breadcrumbs on all nested routes.

## 8.7 Google Ads + SEO working together

Paid and organic share landing-page infrastructure but not landing pages.

| | Organic money page | Paid landing page |
| --- | --- | --- |
| URL | `/plc-programming` | `/lp/plc-programming` (`noindex`) |
| Length | Full 13-section template | Compressed: hero, proof, 3 benefits, form, FAQ |
| Navigation | Full | Reduced — logo + phone only, to limit exit paths |
| Primary CTA | Talk to an Engineer | Inline form above the fold |
| Job | Rank, educate, earn links | Convert one keyword in one screen |

**Why separate:** the organic page is optimised for depth and dwell time; the ad page is
optimised for a single conversion in one screen. Forcing one page to do both makes it worse at
each. The paid pages are `noindex, follow` so they never compete organically.

**Initial paid intent groups** (highest commercial intent first):
1. `plc programming services` / `plc programmer near me` / `plc scada company`
2. `scada development` / `scada system integrator`
3. `machine monitoring system` / `oee monitoring software` / `production monitoring system`
4. `industrial iot solutions` / `iiot company`
5. `industrial automation company` (broadest, highest CPC — start smallest here)

**Tracking:** `generate_lead` imported as the Ads conversion, fired **after** server-side
validation, with a value band derived from the estimate answers, so Smart Bidding optimises
toward large qualified enquiries rather than raw form volume. Call and WhatsApp clicks are
tracked as separate conversion actions with their own values.

## 8.8 Content engine — first 12 articles

Each targets one long-tail question, is genuinely useful, and links to a money page.

1. How to connect an existing PLC to a cloud dashboard without changing the control program
2. OPC UA vs Modbus TCP vs MQTT — choosing a protocol for a retrofit
3. What OEE actually measures, and why most factory OEE numbers are wrong
4. Retrofitting machine monitoring onto equipment with no PLC
5. MQTT Sparkplug B explained for automation engineers
6. Edge vs cloud: what should be computed at the plant
7. A realistic architecture for monitoring 20 machines across two plants
8. Why your SCADA data never reaches your ERP
9. Reading energy consumption per machine without rewiring the panel
10. Downtime reason codes: designing a system operators will actually use
11. Migrating a legacy PLC without a full line shutdown
12. Industrial network segmentation basics (Purdue model, in practice)

**Cadence:** two per month, written by an engineer, edited for the voice in §1.5. Each ends with
one contextual CTA — never a generic "contact us".
