# Design System & Animation Language

---

# PHASE 6 — Visual Design System

## 6.1 The core visual decision

Every IIoT website in the world is **dark navy with electric cyan glow**. It has become the
stock uniform of the category, and it reads as "crypto dashboard", not "industrial engineering".

We take the opposite route, drawn from what industrial environments actually look like:

> **Signal orange on graphite.** Safety orange, machine amber, hazard markings, HMI warning
> states, hi-vis. Cool instrument-cyan is retained but *rationed* — it appears only where data
> is moving or live. Colour therefore carries meaning instead of decoration.

Supporting language: **the datasheet.** Thin 1px rules, corner registration ticks on cards
(like a drawing frame), monospace labels with coordinates and units, a faint technical grid,
and generous negative space. Metal and glass appear as restrained surface tints, never as
frosted blur everywhere.

## 6.2 Colour tokens

```
FOUNDATION
--bg              #07090C   page ground (near-black with a blue-green bias, not pure #000)
--bg-elevated     #0B0E13
--surface         #0F141A   cards, panels
--surface-2       #151C24   hover / raised
--surface-3       #1C242E   active / input

LINE
--border          #1E2831   default hairline
--border-strong   #2C3945   emphasis, focused inputs
--grid            #131A22   technical grid lines

INK
--ink             #ECF1F6   primary text
--ink-2           #A8B6C4   secondary text
--ink-3           #6D7C8B   muted / captions
--ink-inverse     #07090C   text on accent

BRAND
--accent          #FF6A13   signal orange — CTAs, active states, key emphasis
--accent-hover    #FF8340
--accent-press    #E85A08
--accent-soft     rgba(255,106,19,0.12)
--accent-line     rgba(255,106,19,0.35)

DATA  (reserved strictly for live values, flow lines, telemetry)
--data            #4FC3E8   instrument cyan
--data-soft       rgba(79,195,232,0.12)

MACHINE STATE  (semantic — same language an HMI uses)
--run             #3FB950   running / healthy / success
--idle            #D2A31C   idle / warning
--fault           #F0533F   fault / error / alarm
--offline         #566472   no data / disconnected
```

**Discipline rules**
- Orange is the *only* colour permitted on a primary CTA. Nothing else on the page may be orange, so the CTA is always the brightest object.
- Cyan appears only on data: flowing pulses, live numeric values, chart strokes, telemetry.
- Machine-state colours appear only on machine state. A green tick in marketing copy uses `--ink-2`, not `--run`.
- No gradient may span more than two adjacent tokens. No glow larger than 40px blur. Maximum two glass surfaces per viewport.

**Contrast** — verified against WCAG 2.2 AA:
`--ink` on `--bg` ≈ 16.2:1 · `--ink-2` on `--bg` ≈ 8.1:1 · `--ink-3` on `--bg` ≈ 4.6:1 (captions
only, ≥16px) · `--ink-inverse` on `--accent` ≈ 7.4:1 · `--accent` on `--bg` ≈ 6.3:1.

## 6.3 Typography

| Role | Family | Why |
| --- | --- | --- |
| Display / headings | **Archivo** (600, 700) | A grotesk with signage and wayfinding DNA — technical without being a "tech font". Wide weight range, excellent at large sizes. |
| Body / UI | **Inter** (400, 500, 600) | The most readable UI face at small sizes on dark backgrounds; huge language coverage for future locales. |
| Labels / data / eyebrows | **JetBrains Mono** (400, 500) | Monospace on eyebrows, spec tables, telemetry readouts and section indices is the single strongest typographic signal of engineering precision. Used *only* for those roles. |

All three are loaded via `next/font/google` with `display: swap`, subsetting and self-hosting —
zero external font requests, no layout shift.

### Type scale (fluid, `clamp()`)

| Token | Mobile → Desktop | Weight / tracking / leading |
| --- | --- | --- |
| `display` | 40 → 76px | 700 · −0.03em · 1.02 |
| `h1` | 34 → 60px | 700 · −0.025em · 1.06 |
| `h2` | 28 → 44px | 700 · −0.02em · 1.10 |
| `h3` | 22 → 30px | 600 · −0.015em · 1.20 |
| `h4` | 18 → 21px | 600 · −0.01em · 1.30 |
| `body-lg` | 17 → 19px | 400 · 0 · 1.65 |
| `body` | 15.5 → 16.5px | 400 · 0 · 1.70 |
| `small` | 14 → 14.5px | 400 · 0 · 1.60 |
| `label` (mono) | 11 → 12px | 500 · **+0.14em** · 1.2 · UPPERCASE |

Measure is capped at `68ch` for body prose, `24ch` for display headlines. Mobile headlines drop
one step and tracking loosens by `+0.005em` because tight tracking degrades legibility at small
optical sizes.

## 6.4 Spacing, grid, radius

- **Base unit 4px.** Scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160.
- **Section rhythm:** 96px mobile → 160px desktop vertical padding.
- **Container:** one width, everywhere. `container-site` — 1440px outer, **1312px max content**.
  - Gutters step 24px (mobile) → 48px (≥1024) → 64px (≥1536), so content never reaches the screen edge on a large monitor.
  - Header, hero, every section and the footer share the same left and right edge. There was briefly a second, wider container for the "loud" sections; it put the header and the Live Demo 80px outside the content column on each side and read as a misalignment rather than as emphasis. Emphasis is carried by full-bleed backgrounds and section rules instead, which already run edge to edge.
  - Widening this does **not** widen prose: body copy is separately capped at 60–68ch. It affects grids, tables and diagrams only.
- **Grid:** 12 columns desktop, 8 tablet, 4 mobile.
- **Radius:** `sm 4px` · `md 6px` · `lg 10px` · `xl 14px`. Deliberately tight — industrial equipment is machined, not pillowy. No `rounded-full` except on status dots and avatars.
- **Technical grid overlay:** 1px lines at 64px pitch, `--grid` colour, `opacity 0.5`, masked with a radial fade so it never reaches the page edges.

## 6.5 Signature components

- **Spec card** — 1px border, four 8px corner registration ticks in `--border-strong`, a mono index label (`01 / CONNECT`) top-left, hairline separator, content. On hover: border → `--accent-line`, ticks → `--accent`, 1px lift. No shadow, no blur.
- **Data readout** — mono numerals, `font-variant-numeric: tabular-nums`, unit in `--ink-3` at 0.7em, live values in `--data`.
- **Status pill** — 6px dot + mono uppercase label, coloured by machine state.
- **Flow line** — 1.5px stroke, `--border-strong`, with an animated `--data` pulse travelling along it.
- **Section header** — mono eyebrow with a 24px leading rule, then h2, then a `--ink-2` lead paragraph at max 60ch.

## 6.6 Responsive strategy

Breakpoints: `360 · 390 · 480 · 768 · 1024 · 1280 · 1440+`.

Mobile is **not** a collapsed desktop. What is built:

- **Hero schematic** — the horizontal SVG is `hidden` below `md`. In its place a purpose-built
  **vertical flow** renders as HTML: four stages read top-to-bottom, with the protocol label and
  a downward travelling pulse between each. Direction still follows the data (§7.1, principle 3)
  — on a phone that means downward. Scaling the desktop SVG instead would have reduced its 9px
  labels to about 4px.
- **Interactive Demo** — the three-column control-room layout becomes a horizontally
  **snap-scrolling machine card deck** (`snap-x snap-mandatory`, cards at 78% width so the next
  one peeks) above a single KPI strip and the event log.
- **Industries explorer** — a horizontally snapping chip rail with the detail panel stacked
  beneath, rather than a hover grid.
- **Navigation** — a full-screen overlay grouped by the five-verb spine, with Call and WhatsApp
  pinned to the bottom of the panel. Not a cramped accordion.
- **Sticky action bar** — Call · WhatsApp · Estimate, fixed to the bottom below `lg`. The single
  highest-ROI conversion element on the site for this market.
- All interactive targets ≥ 44×44px; primary CTAs ≥ 52px tall.

**Known gap:** the Architecture section keeps its horizontal rail on mobile with the stage
labels hidden below `md` and the detail panel stacked. It is usable, but a genuinely
mobile-native version — one stage in focus at a time, advancing vertically — would be better and
is the first thing to build next. Mobile layouts have not yet been checked on a physical device.

## 6.7 Accessibility

- Semantic landmarks (`header/nav/main/section/footer`), one `h1` per page, no skipped heading levels.
- Visible focus: 2px `--accent` ring at 2px offset, never removed.
- Skip-to-content link as the first focusable element.
- Every animation and the entire Interactive Demo are operable by keyboard; the demo exposes live values in a visually-hidden `aria-live="polite"` summary so screen-reader users receive the same information.
- Decorative SVG is `aria-hidden`; meaningful diagrams have `role="img"` plus a text description.
- `prefers-reduced-motion: reduce` — all transforms resolve to final state, loops stop, pulses become static dots, counters print final values. Nothing becomes unusable or invisible.
- Colour is never the sole carrier of meaning: machine states pair colour with a text label and a distinct dot pattern.

---

# PHASE 7 — Animation System

## 7.1 Principles

1. **Every animation communicates something.** If it does not encode state, hierarchy, causality or continuity, it is deleted.
2. **Fast when functional, slow when cinematic.** UI feedback ≤ 220ms; storytelling 900–1600ms.
3. **Motion follows the data.** Direction always traces the physical path: machine → edge → cloud → screen. Left-to-right and bottom-to-top on desktop, top-to-bottom on mobile.
4. **Never block reading.** Text is legible at final position within 700ms of section entry.
5. **Ambient motion is quiet.** Loops stay under 8% opacity or 4px displacement.

## 7.2 Tokens

```
DURATION
--d-instant   90ms    state flips, dot blinks
--d-micro    140ms    hover, focus, icon shifts
--d-ui       220ms    buttons, menus, tooltips
--d-enter    460ms    element entrance
--d-section  720ms    section reveal
--d-cinema  1200ms    hero beats, path draws
--d-ambient 2400ms+   loops

EASING
--e-out      cubic-bezier(0.22, 1, 0.36, 1)      entrances, reveals  (quint-out)
--e-in-out   cubic-bezier(0.76, 0, 0.24, 1)      cinematic, morphs   (quart-in-out)
--e-in       cubic-bezier(0.55, 0, 1, 0.45)      exits
--e-linear   linear                               data pulses, marquees only
spring       { stiffness: 260, damping: 30, mass: 0.9 }   CTAs, cards, drag
```

Data pulses are **linear** on purpose: eased motion would read as a physical object; linear
reads as a signal.

## 7.3 Hero timeline (exact)

`t = 0` is first paint. LCP text is *never* gated behind animation — the headline is present in
the DOM and painted immediately; only its mask offset animates.

| Time | Event | Detail |
| --- | --- | --- |
| 0–260ms | Ground establishes | Page bg fades `#0B0E13 → #07090C`; radial vignette settles. `--d-enter`, `--e-out` |
| 120–380ms | Technical grid | Opacity `0 → 0.5`, `scale 1.04 → 1`. Communicates "engineering space" |
| 180–520ms | Eyebrow | Mono category line, `y 8 → 0`, opacity `0 → 1` |
| 240–860ms | Headline | Per-line mask reveal, `y 24 → 0`, **90ms stagger**, `--d-section`, `--e-out` |
| 620–1040ms | Sub-headline | `y 12 → 0` |
| 760–1120ms | CTAs | Spring, 70ms stagger; primary first |
| 560–1600ms | Schematic paths draw | `stroke-dashoffset → 0`, left→right, 110ms stagger per lane, `--d-cinema`, `--e-in-out` |
| 1400–1980ms | Nodes materialise | `scale 0.86 → 1.06 → 1` overshoot, 80ms stagger; status dots begin their 2.2s blink |
| 1900–2700ms | First data pulse | A `--data` capsule travels sensor → PLC → gateway → edge → cloud → dashboard, 800ms, linear |
| 2500–3300ms | KPI tiles | Fade + count-up from 0 to value, 800ms, `--e-out`, tabular numerals |
| 3300ms → ∞ | Ambient | Pulses re-emit every 2.4s with ±400ms jitter across three lanes; grid parallax at 0.02× scroll; one live value micro-updates every 3s; status dot blink continues |

**Reduced motion:** everything above collapses to a single 200ms opacity fade to final state.
Paths are drawn, nodes present, KPIs show final values, no loops, no pulses.

**Performance:** only `transform` and `opacity` animate. `stroke-dashoffset` runs on a small
SVG that is `will-change: auto` after settle. The ambient loop is driven by one `requestAnimationFrame`
scheduler shared across all pulses, paused via `IntersectionObserver` when the hero leaves the
viewport and via `visibilitychange` when the tab is hidden.

## 7.4 Scroll system

- **Reveal:** `IntersectionObserver` at `threshold 0.15`, `rootMargin "0px 0px -12% 0px"`. Elements enter `y 20 → 0`, `opacity 0 → 1`, `--d-section`, `--e-out`, 60ms stagger within a group. **Fires once**, then unobserves — never re-animate on scroll-up; it is disorienting and costs main-thread time.
- **Architecture section:** sticky viewport, scroll progress `0 → 1` drives (a) which of the ten stages is active, (b) the position of a data packet travelling the path, (c) a detail panel that crossfades stage copy. Progress is read from a single passive scroll listener feeding a `MotionValue` — no scroll-jacking, no `preventDefault`, native scrolling speed preserved throughout.
- **Counters:** count up once on entry, 900ms, `--e-out`, tabular numerals so the layout never jitters.
- **Parallax:** capped at 0.04× scroll offset, applied only to background grids and the hero schematic.

## 7.5 Micro-interactions

| Element | Interaction |
| --- | --- |
| Primary button | Hover: bg → `--accent-hover`, arrow glyph `x +3px`, `--d-micro`. Press: `scale 0.985`, `--d-instant`. Focus: 2px ring. |
| Secondary button | Hover: border → `--accent-line`, bg → `--accent-soft`. |
| Spec card | Hover: corner ticks → `--accent`, border lightens, `y −2px`, `--d-ui`, spring. Cursor-tracked 1px highlight along the top edge — no tilt, no 3D. |
| Nav mega-panel | Open: `y −8 → 0` + opacity, 200ms. Items 30ms stagger. Close: 140ms, `--e-in`. |
| Nav on scroll | Below 24px: transparent, 72px. Above: `--bg` at 85% + backdrop blur 12px + bottom hairline, 64px. Transition 240ms. |
| Form field | Focus: border → `--accent`, label shifts to mono caption, 160ms. Invalid: `--fault` border + 2-cycle 3px shake (suppressed under reduced motion) + text error message. |
| Industry chip | Active: bg `--accent-soft`, border `--accent-line`, and a shared-layout indicator that slides between chips (`layoutId`). |
| Demo machine tile | State change animates the status dot colour over 300ms and pushes a new row into the event log with a 240ms slide. |
| Link | Underline drawn left→right, 180ms, `--e-out`. |

## 7.6 Performance budget

| Metric | Target |
| --- | --- |
| LCP | < 2.0s on 4G / mid-tier Android |
| INP | < 200ms |
| CLS | < 0.02 |
| Hero JS | ~1KB (the value ticker only — the rest is CSS) |
| Total first-load JS on `/` | **measured: ~230KB gzipped**, of which the React 19 / Next 16 framework is the large majority. Target for optimisation: reduce app code, not the framework floor |
| Fonts | 3 families, self-hosted, subset latin, `display: swap` |

Enforcement: server components everywhere except four interactive islands; `next/dynamic` for the
Interactive Demo, the Architecture scroll engine and the Industries explorer; `next/image` with
AVIF/WebP and explicit dimensions; SVG for all diagrams and icons; **no animation library at
all** — every animation on the site is CSS keyframes plus `IntersectionObserver`.

The LCP element (the hero headline) is server-rendered and painted before any script runs, so
none of this JavaScript sits on the critical rendering path. The remaining optimisation work is
listed honestly in the README: Core Web Vitals have not yet been measured against a production
build on real hardware.
