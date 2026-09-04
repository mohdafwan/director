import { cn } from "@/lib/utils";
import { HeroTicker } from "./HeroTicker";

/**
 * Hero schematic — machine → PLC → gateway → cloud → dashboard.
 *
 * Deliberately NOT built with an animation library. Every beat here is a CSS
 * keyframe on `transform`, `opacity` or `stroke-dashoffset`, so the hero adds
 * no JavaScript to the critical path and cannot delay LCP. Timings mirror
 * docs/03-DESIGN-AND-MOTION.md §7.3 exactly.
 *
 * Data pulses use a travelling dash (dasharray "12 300" + animated offset)
 * rather than `offset-path` or SMIL — same visual result, universally
 * supported, and it composites on the GPU.
 *
 * Geometry is laid out on a strict orthogonal grid: every line is horizontal
 * or vertical, like an actual schematic. No diagonals, no curves.
 *
 * The graphic is aria-hidden; the same information is carried as text in the
 * hero copy and in the architecture section, so nothing is lost.
 */

/* Geometry is tuned so the diagram renders at close to 1:1 inside a
   seven-column slot — small SVG text does not survive being scaled down. */
const MID = 170;

const MACHINE = { x: 8, y: 110, w: 84, h: 120 };
const BUS_X = 140;

const SENSORS = [
  { y: 140, label: "TEMP" },
  { y: 170, label: "RPM" },
  { y: 200, label: "AMP" },
];

const NODE_W = 104;
const NODE_H = 52;
const NODE_Y = MID - NODE_H / 2;

const NODES = [
  { id: "plc", x: 186, label: "PLC", sub: "S7-1200", link: "MODBUS TCP" },
  { id: "gw", x: 330, label: "Gateway", sub: "EDGE", link: "MQTT / TLS" },
  { id: "cloud", x: 474, label: "Cloud", sub: "TSDB", link: "" },
] as const;

const PANEL = { x: 618, y: 88, w: 136, h: 164 };

export function HeroSchematic({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Mobile gets a purpose-built vertical flow, not a shrunken diagram
          — see docs/03-DESIGN-AND-MOTION.md §6.6. */}
      <MobileFlow />

      <svg
        viewBox="0 0 760 330"
        fill="none"
        aria-hidden
        className="hidden h-auto w-full overflow-visible md:block"
      >
        {/* ── 480ms: machine body ───────────────────────────────────────── */}
        <g className="anim-panel" style={{ animationDelay: "460ms" }}>
          <rect
            x={MACHINE.x}
            y={MACHINE.y}
            width={MACHINE.w}
            height={MACHINE.h}
            className="fill-surface stroke-border-strong"
            strokeWidth="1"
          />
          {/* internal detail — reads as equipment, not a plain box */}
          {[0, 1, 2].map((i) => (
            <line
              key={i}
              x1={MACHINE.x + 14}
              y1={MACHINE.y + 20 + i * 11}
              x2={MACHINE.x + MACHINE.w - 14}
              y2={MACHINE.y + 20 + i * 11}
              stroke="var(--color-border)"
              strokeWidth="1"
            />
          ))}
          <rect
            x={MACHINE.x + 14}
            y={MACHINE.y + MACHINE.h - 40}
            width={MACHINE.w - 28}
            height="26"
            className="fill-bg stroke-border"
            strokeWidth="1"
          />
          <circle
            cx={MACHINE.x + 26}
            cy={MACHINE.y + MACHINE.h - 27}
            r="3"
            className="fill-run anim-blink"
          />
          <text
            x={MACHINE.x}
            y={MACHINE.y + MACHINE.h + 20}
            className="fill-[var(--color-ink-3)] font-mono"
            fontSize="10"
            letterSpacing="0.14em"
          >
            MACHINE
          </text>
        </g>

        {/* ── 560–1600ms: sensor taps draw in, then pulse ───────────────── */}
        {SENSORS.map((sensor, i) => {
          // Orthogonal: out of the machine, along to the bus, up/down to
          // the spine, then into the PLC.
          const path =
            `M ${MACHINE.x + MACHINE.w} ${sensor.y} H ${BUS_X} ` +
            `V ${MID} H ${NODES[0].x}`;
          return (
            <g key={sensor.label}>
              <rect
                x={MACHINE.x + MACHINE.w - 7}
                y={sensor.y - 6}
                width="12"
                height="12"
                className="fill-bg stroke-border-strong anim-panel"
                strokeWidth="1"
                style={{ animationDelay: `${540 + i * 90}ms` }}
              />
              <path
                d={path}
                stroke="var(--color-border)"
                strokeWidth="1"
                fill="none"
                className="draw-path"
                style={{ ["--len" as string]: "180", animationDelay: `${560 + i * 110}ms` }}
              />
              <path
                d={path}
                stroke="var(--color-data)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="10 190"
                className="motion-safe:[animation:dashFlow_2.6s_linear_infinite]"
                style={{ animationDelay: `${1900 + i * 360}ms` }}
              />
              <text
                x={MACHINE.x + MACHINE.w + 12}
                y={sensor.y - 10}
                className="fill-[var(--color-ink-3)] font-mono anim-panel"
                fontSize="9"
                letterSpacing="0.12em"
                style={{ animationDelay: `${900 + i * 90}ms` }}
              >
                {sensor.label}
              </text>
            </g>
          );
        })}

        {/* ── Spine links between nodes ─────────────────────────────────── */}
        {NODES.map((node, i) => {
          const x1 = node.x + NODE_W;
          const x2 = i < NODES.length - 1 ? NODES[i + 1].x : PANEL.x;
          const label = node.link || "HTTPS";
          return (
            <g key={`link-${node.id}`}>
              <line
                x1={x1}
                y1={MID}
                x2={x2}
                y2={MID}
                stroke="var(--color-border-strong)"
                strokeWidth="1.25"
                className="draw-path"
                style={{ ["--len" as string]: "60", animationDelay: `${900 + i * 140}ms` }}
              />
              <line
                x1={x1}
                y1={MID}
                x2={x2}
                y2={MID}
                stroke="var(--color-data)"
                strokeWidth="2"
                strokeDasharray="14 80"
                className="motion-safe:[animation:dashFlow_2.4s_linear_infinite]"
                style={{ animationDelay: `${2200 + i * 300}ms` }}
              />
              <text
                x={(x1 + x2) / 2}
                y={NODE_Y - 9}
                textAnchor="middle"
                className="fill-[var(--color-ink-3)] font-mono anim-panel"
                fontSize="9"
                letterSpacing="0.1em"
                style={{ animationDelay: `${1500 + i * 120}ms` }}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* ── 1400–1980ms: nodes materialise ────────────────────────────── */}
        {NODES.map((node, i) => (
          <g
            key={node.id}
            className="anim-node"
            style={{
              animationDelay: `${1400 + i * 80}ms`,
              transformOrigin: `${node.x + NODE_W / 2}px ${MID}px`,
            }}
          >
            <rect
              x={node.x}
              y={NODE_Y}
              width={NODE_W}
              height={NODE_H}
              className="fill-surface stroke-border-strong"
              strokeWidth="1"
            />
            {/* corner registration ticks — the datasheet motif, in SVG */}
            {[
              [node.x, NODE_Y],
              [node.x + NODE_W - 6, NODE_Y],
              [node.x, NODE_Y + NODE_H - 6],
              [node.x + NODE_W - 6, NODE_Y + NODE_H - 6],
            ].map(([cx, cy], k) => (
              <rect
                key={k}
                x={cx}
                y={cy}
                width="6"
                height="6"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="1"
                opacity="0.6"
              />
            ))}
            <text
              x={node.x + 13}
              y={NODE_Y + 24}
              className="fill-[var(--color-ink)] font-mono"
              fontSize="12"
              fontWeight="500"
              letterSpacing="0.05em"
            >
              {node.label}
            </text>
            <text
              x={node.x + 13}
              y={NODE_Y + 41}
              className="fill-[var(--color-ink-3)] font-mono"
              fontSize="9"
              letterSpacing="0.1em"
            >
              {node.sub}
            </text>
            <circle
              cx={node.x + NODE_W - 13}
              cy={NODE_Y + 14}
              r="2.75"
              className="fill-run anim-blink"
              style={{ animationDelay: `${i * 500}ms` }}
            />
          </g>
        ))}

        {/* ── 2400ms: dashboard panel ───────────────────────────────────── */}
        <g className="anim-panel" style={{ animationDelay: "2400ms" }}>
          <rect
            x={PANEL.x}
            y={PANEL.y}
            width={PANEL.w}
            height={PANEL.h}
            className="fill-surface stroke-border-strong"
            strokeWidth="1"
          />
          <line
            x1={PANEL.x}
            y1={PANEL.y + 28}
            x2={PANEL.x + PANEL.w}
            y2={PANEL.y + 28}
            stroke="var(--color-border)"
            strokeWidth="1"
          />
          <text
            x={PANEL.x + 13}
            y={PANEL.y + 19}
            className="fill-[var(--color-ink-2)] font-mono"
            fontSize="9.5"
            letterSpacing="0.12em"
          >
            LINE 02 · LIVE
          </text>
          <circle cx={PANEL.x + PANEL.w - 14} cy={PANEL.y + 15} r="3" className="fill-run anim-blink" />

          {/* headline figure */}
          <text
            x={PANEL.x + 13}
            y={PANEL.y + 62}
            className="fill-[var(--color-accent)] font-mono"
            fontSize="24"
          >
            78.4
          </text>
          <text
            x={PANEL.x + 72}
            y={PANEL.y + 62}
            className="fill-[var(--color-ink-3)] font-mono"
            fontSize="10"
          >
            % OEE
          </text>

          {/* mini bar chart */}
          {[22, 34, 28, 41, 37, 48, 33, 44].map((h, i) => (
            <rect
              key={i}
              x={PANEL.x + 12 + i * 15}
              y={PANEL.y + 140 - h}
              width="9"
              height={h}
              className={i === 5 ? "fill-accent" : "fill-border-strong"}
              opacity={i === 5 ? 0.95 : 0.65}
            />
          ))}
          <line
            x1={PANEL.x + 13}
            y1={PANEL.y + 142}
            x2={PANEL.x + PANEL.w - 13}
            y2={PANEL.y + 142}
            stroke="var(--color-border)"
            strokeWidth="1"
          />
          <text
            x={PANEL.x + 13}
            y={PANEL.y + 158}
            className="fill-[var(--color-ink-3)] font-mono"
            fontSize="8.5"
            letterSpacing="0.1em"
          >
            LAST 8 HOURS
          </text>
        </g>

        {/* Stage captions along the bottom */}
        {[
          { x: MACHINE.x, label: "01 SENSE" },
          { x: NODES[0].x, label: "02 READ" },
          { x: NODES[1].x, label: "03 NORMALISE" },
          { x: NODES[2].x, label: "04 STORE" },
          { x: PANEL.x, label: "05 DECIDE" },
        ].map((caption, i) => (
          <text
            key={caption.label}
            x={caption.x}
            y="292"
            className="fill-[var(--color-ink-3)] font-mono anim-panel"
            fontSize="8.5"
            letterSpacing="0.12em"
            style={{ animationDelay: `${2600 + i * 70}ms` }}
          >
            {caption.label}
          </text>
        ))}
        <line
          x1={MACHINE.x}
          y1="276"
          x2={PANEL.x + PANEL.w}
          y2="276"
          stroke="var(--color-border)"
          strokeWidth="1"
          className="draw-path"
          style={{ ["--len" as string]: "760", animationDelay: "2500ms" }}
        />
      </svg>

      {/* Live readouts in HTML rather than SVG <text>, so they get real text
          rendering, tabular numerals and a screen-reader-friendly summary. */}
      <HeroTicker />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Mobile flow — the same five stages read top-to-bottom.
   Direction still follows the data (docs/03 §7.1, principle 3): on a phone
   that means downward, not left to right.
   ═══════════════════════════════════════════════════════════════════════════ */

const MOBILE_STAGES = [
  { label: "Machine", sub: "sensors + PLC tags", link: "MODBUS TCP" },
  { label: "Gateway", sub: "normalise + buffer", link: "MQTT / TLS" },
  { label: "Cloud", sub: "time-series store", link: "HTTPS" },
  { label: "Dashboard", sub: "the decision", link: "" },
];

function MobileFlow() {
  return (
    <ol aria-hidden className="flex flex-col md:hidden">
      {MOBILE_STAGES.map((stage, i) => (
        <li key={stage.label}>
          <div
            className="anim-node flex items-center gap-3 border border-border-strong bg-surface px-4 py-3"
            style={{ animationDelay: `${600 + i * 140}ms` }}
          >
            <span className="font-mono text-[0.625rem] tracking-[0.14em] text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[0.875rem] text-ink">{stage.label}</span>
              <span className="block font-mono text-[0.6875rem] text-ink-3">{stage.sub}</span>
            </span>
            <span className="size-1.5 shrink-0 rounded-full bg-run anim-blink" />
          </div>

          {stage.link && (
            <div className="relative flex h-9 items-center pl-6">
              <span className="absolute left-6 top-0 h-full w-px bg-border" />
              {/* Vertical travelling pulse, same technique as the desktop lanes */}
              <svg
                className="absolute left-6 top-0 h-full w-px overflow-visible"
                viewBox="0 0 1 36"
                preserveAspectRatio="none"
              >
                <line
                  x1="0.5"
                  y1="0"
                  x2="0.5"
                  y2="36"
                  stroke="var(--color-data)"
                  strokeWidth="1.5"
                  strokeDasharray="6 40"
                  className="motion-safe:[animation:dashFlow_2.4s_linear_infinite]"
                  style={{ animationDelay: `${2000 + i * 320}ms` }}
                />
              </svg>
              <span className="ml-4 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-3">
                {stage.link}
              </span>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
