# Sitemap, Homepage UX & Lead Architecture

---

# PHASE 4 — Complete Sitemap

## 4.1 Principle

Every URL must have **one job**: one search intent, one persona, one next action. No page
exists to "look complete". Pages that cannot carry 600+ words of genuine, non-duplicated
engineering content are not created.

## 4.2 The map

```
/                                    Home — the whole argument in one scroll
│
├─ /what-we-do                       Capability hub (links to all money pages)
│   ├─ /industrial-iot                       ★ money page
│   ├─ /industrial-automation                ★ money page
│   ├─ /plc-programming                      ★ money page
│   ├─ /scada-development                    ★ money page
│   ├─ /hmi-development                      ★ money page
│   ├─ /machine-monitoring                   ★ money page  (factory/machine monitoring)
│   ├─ /predictive-maintenance               ★ money page
│   ├─ /industrial-dashboards
│   ├─ /edge-computing                       (edge + gateways + protocols)
│   ├─ /custom-industrial-software           (web apps, backend, APIs)
│   ├─ /industrial-mobile-apps
│   └─ /system-integration                   (ERP/MES/legacy/cloud integration)
│
├─ /industries                       Industry hub — interactive explorer
│   ├─ /industries/manufacturing
│   ├─ /industries/automotive
│   ├─ /industries/pharmaceutical
│   ├─ /industries/food-and-beverage
│   ├─ /industries/textile
│   ├─ /industries/packaging
│   ├─ /industries/chemical
│   ├─ /industries/energy-and-utilities
│   ├─ /industries/water-and-wastewater
│   ├─ /industries/logistics-and-warehousing
│   └─ /industries/oem-and-machine-builders
│
├─ /projects                         Engineering demonstrations (clearly labelled)
│   └─ /projects/[slug]
│
├─ /how-we-work                      8-stage process + engagement models
├─ /technology                       Stack, protocols, hardware, security  ← engineer trust asset
├─ /about                            Why the company exists + [FOUNDER NAME]
│
├─ /insights                         Blog / engineering notes
│   └─ /insights/[slug]
│
├─ /contact                          Talk to an engineer (short form + call + WhatsApp)
├─ /estimate                         Multi-step qualified project estimate
│
├─ /legal/privacy
├─ /legal/terms
│
├─ /sitemap.xml   /robots.txt   /opengraph-image
│
└─ (Phase 2, only when content is genuine)
    /locations                       Service-coverage hub
    /locations/pune  /locations/ahmedabad  /locations/chennai  …
    /us/  /sg/  /ae/  /id/           International locales
```

## 4.3 Deliberate omissions and why

| Not built | Why |
| --- | --- |
| Separate `/iot-solutions` **and** `/industrial-iot` | Same intent. Cannibalisation. One page, one canonical. |
| `/services/plc/programming`, `/services/plc/migration`, … | Sub-intents too thin to rank alone. They become **sections with anchor links** on `/plc-programming`, which makes that page stronger, not weaker. |
| `/industrial-automation-india`, `/plc-programming-india` | The site *is* India-first. A `-india` suffix duplicates the parent page's intent and creates a cannibalisation pair. Geography is handled by hreflang, schema, GBP and genuine location pages — not URL suffixes. See §8.4. |
| 9 city pages at launch | Doorway-page risk. Google penalises near-duplicate location pages. Launch 2–3 cities where real service coverage, local industrial-cluster knowledge and named local sectors can be written. |
| `/careers`, `/partners`, `/testimonials` | Nothing true to put on them yet. Added when they are real. |
| A pricing table | Dishonest for project work of this complexity. Replaced by `/estimate`, which converts better anyway. |

## 4.4 Navigation

**Desktop** — sticky, translucent on scroll, 64px tall (72px at rest):

```
[LOGO]   Capabilities ▾   Industries ▾   Architecture   Projects   Company ▾   [ Talk to an Engineer → ]
```

- **Capabilities ▾** opens a full-width mega-panel organised by the five-verb spine — CONNECT / AUTOMATE / MONITOR / ANALYSE / BUILD — so the taxonomy teaches the narrative every time it opens. Right rail carries a contextual "Not sure where to start? → Talk to an engineer".
- **Industries ▾** is a two-column list with a short outcome line per industry.
- **Company ▾** → About, How We Work, Technology, Insights, Contact.
- **Architecture** and **Projects** are direct links — no dropdown — because they are proof, and proof should be one click away.
- The CTA is a filled signal-orange button. It is the only orange element in the nav, so it is unmissable without being loud.

**Mobile** — full-screen overlay panel, not a cramped accordion:
- Large 20px tap targets, spine-grouped sections, staggered entry (40ms).
- Pinned to the bottom of the overlay: **Call · WhatsApp · Estimate**.
- Plus a **persistent sticky action bar** on every page below 768px: `Call | WhatsApp | Get Estimate`. This is the single highest-ROI conversion element on the site for the Indian market.

---

# PHASE 5 — Homepage UX Strategy

## 5.1 Section order and the reasoning

I depart from the brief's draft order in three places. Reasoning is given for each.

| # | Section | Job | Persona |
| --- | --- | --- | --- |
| 1 | **Hero** — headline, category eyebrow, dual CTA, live schematic | Who/what/who-for in <10s | All |
| 2 | **Capability bar** — 5 pillars, one line each | Scannable "what do you do"; early internal links to money pages | All + SEO |
| 3 | **The Problem** — three symptoms in their language | Recognition. "They are describing my plant." | Economic |
| 4 | **"We don't replace your machines"** — brownfield promise | **Objection killed early**, not at the end | Economic |
| 5 | **Interactive Demo** — live simulated plant | Proof of capability. Show, don't describe | All |
| 6 | **Architecture** — 10-stage scroll-animated data path | Technical credibility | Technical |
| 7 | **What We Build** — service groups by the five-verb spine | Depth + navigation to money pages | All |
| 8 | **Industries** — interactive explorer | Relevance: "they know my sector" | Economic |
| 9 | **How We Work** — 8-stage process | "How do you engage?" + de-risking | Economic + Strategic |
| 10 | **Demonstration Projects** | Honest proof | All |
| 11 | **Why Us** — the OT + IT intersection | The differentiator, landing hardest *after* depth has been shown | Strategic |
| 12 | **Technology & Protocols** | Engineer's final checklist | Technical |
| 13 | **Estimate / commercials** — cost drivers, no fake prices | "What will it cost, how long?" | Economic |
| 14 | **FAQ** — objections + FAQPage schema | Residual doubt + SEO | All |
| 15 | **Final CTA + Footer** | Convert | All |

**The three departures from the brief's draft order:**

1. **Brownfield reassurance moved to position 4.** In the draft it was implicit and late. It is the primary purchase blocker for the primary persona — objection handling belongs *before* the pitch, not after it.
2. **Interactive Demo moved from 5th-ish to immediately after the problem.** Sequence matters: *name the pain → show the cure working.* Putting the demo directly after the problem statement is the strongest emotional beat available, and it lands before the visitor's attention decays.
3. **"Why Us" moved from 14 to 11, after Process and Projects.** A differentiator claim made early is a slogan; made after the visitor has read the architecture and the process, it is a conclusion they reach themselves.

## 5.2 Scroll narrative

The page is one continuous story, and the accent-coloured data path is the thread stitching it:

```
DARK / STILL          →   TENSION           →   MOTION            →   CLARITY         →   ACTION
Hero: one machine         Problem: data         Demo + Architecture:   Industries,        Estimate,
sitting silent            dies on the           the system comes       Process, Why Us:   FAQ, CTA
                          machine               alive                  it is repeatable
```

Section backgrounds alternate between `bg` (#07090C) and `surface` (#0D1117) so the eye gets
rhythm without hard rules everywhere. Only three sections are allowed to be visually "loud":
Hero, Interactive Demo, Architecture. Everything else is quiet by design — that contrast is
what makes the loud ones read as premium rather than busy.

## 5.3 Conversion instrumentation on the homepage

- Above the fold: primary CTA (Talk to an Engineer) + secondary (See the Architecture).
- After section 5 (Demo): inline CTA — *"Want this for your plant?"*
- After section 9 (Process): inline CTA — *"Tell us about your plant."*
- Section 13: the estimate CTA with cost drivers exposed.
- Section 15: final CTA block.
- Persistent: nav CTA (desktop), sticky action bar (mobile).

Six conversion opportunities, each contextually earned rather than repeated verbatim. No
pop-ups, no exit-intent modals, no chat bubble that opens itself — all three destroy
credibility with this audience.

---

# PHASE 9 — Lead-Generation Architecture

## 9.1 The funnel and how the site serves each stage

| Stage | Visitor state | Site mechanism | Measured by |
| --- | --- | --- | --- |
| Google search | Has a symptom or a term | SEO money page matching one intent exactly | Impressions, position |
| Landing | Skeptical, scanning | Hero answers who/what/who-for in <10s; problem language mirrors theirs | Bounce, scroll depth |
| Problem match | "This is my plant" | Problem section, industry page, symptom-led copy | Scroll ≥50% |
| Technical credibility | "Do they actually know this?" | Architecture diagram, protocol depth, Technology page | Time on page, page 2 |
| Solution | "Could this work for me?" | Service page: how it works, retrofit block, use cases | Scroll ≥75% |
| Proof | "Show me it working" | Interactive Demo, Demonstration Projects | Demo interaction event |
| Consideration | "How do they work, what will it cost?" | How We Work, cost drivers, FAQ | FAQ expand events |
| **Conversion** | Ready to talk | Call · WhatsApp · short form · estimate flow | `generate_lead` |
| Qualification | Sales side | Form fields pre-qualify: industry, plant size, existing systems, timeline, budget band | Lead score |
| Technical discussion | Engineer to engineer | Scheduled call; the site already established the vocabulary | Meeting booked |
| Requirement gathering | Scoping | Discovery questionnaire (from `/estimate` answers) | — |
| Proposal → Site visit → Project | Closing | Offline | Win rate |

## 9.2 Four conversion paths, deliberately

Different personas convert differently. One form is a mistake.

1. **Call** — `tel:` link. The factory owner who is convinced *now*. Highest intent, lowest volume.
2. **WhatsApp** — pre-filled message. In India this is the default B2B channel and it converts at multiples of email. Pre-fill the message with the page context so the sales side knows what they were reading: *"Hi, I'm looking at machine monitoring for my plant."*
3. **Short form** (`/contact`, and inline) — 5 fields only: Name, Company, Phone, Email, "What do you want to solve?" Anything longer here loses the impatient buyer.
4. **Qualified estimate** (`/estimate`) — a 5-step progressive flow for the serious buyer. Because it is stepped and each step is trivially small, completion rates hold while collecting far more than a flat 11-field form would.

## 9.3 The `/estimate` progressive qualification flow

Designed so step 1 costs the visitor nothing — commitment escalates only after they are invested.

| Step | Asks | Why |
| --- | --- | --- |
| 1 · Objective | What do you want to achieve? (monitor machines / reduce downtime / automate a process / connect to ERP / build software / not sure yet) | Zero-friction, one click. Starts the commitment. |
| 2 · Plant | Industry · number of machines/lines · location | Sizes the job |
| 3 · Existing systems | PLC brands present · existing SCADA/HMI · any current monitoring · network availability on the shop floor | The single most valuable qualification data — determines effort and feasibility |
| 4 · Scope & timing | What is needed (multi-select) · timeline · budget band (optional, ranged) | Prioritisation |
| 5 · Contact | Name · role · company · phone · email · preferred channel | Only now, when they are committed |

Progress is shown as `Step 3 of 5` with a thin progress rail. Back navigation preserves state.
Budget is optional and banded — mandatory budget fields kill B2B forms.

## 9.4 Conversion tracking

Events (GA4 / Google Ads):

```
cta_click              { location, label, page }
contact_call_click     { page }
contact_whatsapp_click { page }
form_start             { form_id }
estimate_step_view     { step }
estimate_submit        { objective, industry, machines_band, budget_band }
generate_lead          { source, value_band }   ← Google Ads conversion
demo_interact          { control }
```

Only `generate_lead` is imported as an Ads conversion, and only after server-side validation,
so bidding optimises on qualified leads rather than form spam.

## 9.5 Anti-patterns explicitly avoided

No exit-intent pop-up · no auto-opening chat · no "download our brochure" gate on basic
information · no fake urgency · no fake counters · no calendar-only CTA (this audience wants a
phone number) · no reCAPTCHA wall on the short form (honeypot + server-side rate limiting
instead).
