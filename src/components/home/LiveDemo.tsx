"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { AlertTriangle, Gauge, Pause, Play, RotateCcw, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusPill, type MachineState } from "@/components/ui/primitives";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Section 5 of 15 — "Live Factory Intelligence".
 *
 * INTERACTIVE DEMO. Every value here is simulated and the component says so in
 * its own header, not in a footnote. No customer data, no claimed results.
 *
 * Placed immediately after the problem statement: name the pain, then show the
 * cure working (docs/02 §5.1, departure 2).
 *
 * Accessibility: fully keyboard operable, and a visually-hidden aria-live
 * summary announces state changes so a screen-reader user receives the same
 * information a sighted user gets from the tiles.
 *
 * Performance: one interval, paused when off-screen (IntersectionObserver) and
 * when the tab is hidden. Stopped entirely under prefers-reduced-motion, where
 * the demo becomes a static — but still readable and interactive — snapshot.
 */

type Machine = {
  id: string;
  name: string;
  asset: string;
  state: MachineState;
  rpm: number;
  temp: number;
  amps: number;
  count: number;
  target: number;
  history: number[];
};

type LogEntry = { id: number; t: string; machine: string; text: string; level: MachineState };

type State = {
  machines: Machine[];
  log: LogEntry[];
  tick: number;
  seq: number;
  speed: number;
};

type Action =
  | { type: "tick" }
  | { type: "fault"; id: string }
  | { type: "recover"; id: string }
  | { type: "speed"; delta: number }
  | { type: "reset" };

const clockAt = (tick: number) => {
  // Deterministic pseudo-clock so SSR and first client render agree.
  const base = 6 * 3600 + tick * 7;
  const h = Math.floor(base / 3600) % 24;
  const m = Math.floor((base % 3600) / 60);
  const s = base % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const INITIAL_MACHINES: Machine[] = [
  { id: "m1", name: "Injection 01", asset: "IM-1200", state: "run", rpm: 1480, temp: 61.4, amps: 42.1, count: 318, target: 340, history: [28, 34, 31, 36, 33, 38, 35, 37] },
  { id: "m2", name: "Press 02", asset: "HP-400", state: "run", rpm: 880, temp: 54.8, amps: 28.6, count: 402, target: 400, history: [40, 42, 39, 44, 41, 45, 43, 44] },
  { id: "m3", name: "CNC 03", asset: "VMC-850", state: "idle", rpm: 0, temp: 38.2, amps: 4.2, count: 176, target: 260, history: [26, 24, 20, 18, 12, 6, 2, 0] },
  { id: "m4", name: "Packing 04", asset: "PK-2", state: "run", rpm: 620, temp: 34.1, amps: 12.9, count: 611, target: 600, history: [58, 61, 59, 63, 60, 62, 64, 61] },
];

const INITIAL: State = {
  machines: INITIAL_MACHINES,
  log: [
    { id: 3, t: clockAt(0), machine: "CNC 03", text: "Stopped — awaiting reason code", level: "idle" },
    { id: 2, t: clockAt(-40), machine: "Press 02", text: "Running above target rate", level: "run" },
    { id: 1, t: clockAt(-95), machine: "Line 02", text: "Shift started · 06:00", level: "offline" },
  ],
  tick: 0,
  seq: 4,
  speed: 1,
};

/** Deterministic jitter — no Math.random, so SSR output is stable. */
function noise(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) - 0.5;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "tick": {
      const tick = state.tick + 1;
      const machines = state.machines.map((m, i) => {
        const n = noise(tick * 3.1 + i * 7.7);
        if (m.state === "fault" || m.state === "offline") {
          return { ...m, rpm: 0, amps: Math.max(0.4, m.amps - 1.4), temp: Math.max(28, m.temp - 0.25) };
        }
        if (m.state === "idle") {
          return { ...m, rpm: 0, amps: 4 + n, temp: Math.max(30, m.temp - 0.1) };
        }
        const rpmBase = m.id === "m1" ? 1480 : m.id === "m2" ? 880 : 620;
        const produced = noise(tick * 5.3 + i * 2.9) > 0 ? 1 : 0;
        const history = [...m.history.slice(1), Math.max(2, m.history[m.history.length - 1] + n * 6)];
        return {
          ...m,
          rpm: Math.round(rpmBase * state.speed + n * 22),
          temp: Math.min(92, m.temp + n * 0.5 + (state.speed > 1 ? 0.22 : -0.04)),
          amps: Math.max(2, m.amps + n * 1.1 + (state.speed > 1 ? 0.3 : -0.05)),
          count: m.count + produced,
          history,
        };
      });

      // A machine running hot long enough raises a fault on its own — the demo
      // shows cause and effect, not just moving numbers.
      let log = state.log;
      let seq = state.seq;
      const next = machines.map((m) => {
        if (m.state === "run" && m.temp > 84) {
          log = [
            { id: seq, t: clockAt(tick), machine: m.name, text: "Fault — over-temperature threshold", level: "fault" as MachineState },
            ...log,
          ].slice(0, 8);
          seq += 1;
          return { ...m, state: "fault" as MachineState };
        }
        return m;
      });

      return { ...state, machines: next, log, tick, seq };
    }

    case "fault": {
      const machine = state.machines.find((m) => m.id === action.id);
      if (!machine || machine.state === "fault") return state;
      return {
        ...state,
        machines: state.machines.map((m) =>
          m.id === action.id ? { ...m, state: "fault", rpm: 0 } : m,
        ),
        log: [
          { id: state.seq, t: clockAt(state.tick), machine: machine.name, text: "Fault injected — line stopped", level: "fault" as MachineState },
          ...state.log,
        ].slice(0, 8),
        seq: state.seq + 1,
      };
    }

    case "recover": {
      const machine = state.machines.find((m) => m.id === action.id);
      if (!machine) return state;
      return {
        ...state,
        machines: state.machines.map((m) =>
          m.id === action.id ? { ...m, state: "run", temp: 48, amps: 20 } : m,
        ),
        log: [
          { id: state.seq, t: clockAt(state.tick), machine: machine.name, text: "Reset — running", level: "run" as MachineState },
          ...state.log,
        ].slice(0, 8),
        seq: state.seq + 1,
      };
    }

    case "speed": {
      const speed = Math.min(1.35, Math.max(0.7, state.speed + action.delta));
      return {
        ...state,
        speed,
        log: [
          {
            id: state.seq,
            t: clockAt(state.tick),
            machine: "Line 02",
            text: `Setpoint changed to ${Math.round(speed * 100)}% of nominal`,
            level: (speed > 1 ? "idle" : "run") as MachineState,
          },
          ...state.log,
        ].slice(0, 8),
        seq: state.seq + 1,
      };
    }

    case "reset":
      return { ...INITIAL, seq: state.seq + 1 };

    default:
      return state;
  }
}

export function LiveDemo() {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const [running, setRunning] = useState(true);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!running || !inView || reduced) return;
    const id = setInterval(() => dispatch({ type: "tick" }), 1100);
    const onVis = () => document.hidden && clearInterval(id);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [running, inView, reduced]);

  const kpis = useMemo(() => {
    const runningCount = state.machines.filter((m) => m.state === "run").length;
    const total = state.machines.reduce((a, m) => a + m.count, 0);
    const target = state.machines.reduce((a, m) => a + m.target, 0);
    const availability = (runningCount / state.machines.length) * 100;
    const performance = Math.min(100, (total / Math.max(target, 1)) * 100);
    const quality = 97.6;
    const oee = (availability / 100) * (performance / 100) * (quality / 100) * 100;
    const energy = state.machines.reduce((a, m) => a + m.amps, 0) * 0.415;
    return { availability, performance, quality, oee, total, energy, runningCount };
  }, [state.machines]);

  const announce = useMemo(() => {
    const faults = state.machines.filter((m) => m.state === "fault");
    return `${kpis.runningCount} of ${state.machines.length} machines running. Overall equipment effectiveness ${kpis.oee.toFixed(
      1,
    )} percent. ${faults.length ? `Fault on ${faults.map((f) => f.name).join(", ")}.` : "No active faults."}`;
  }, [state.machines, kpis]);

  const toggleMachine = useCallback(
    (m: Machine) =>
      dispatch(m.state === "fault" ? { type: "recover", id: m.id } : { type: "fault", id: m.id }),
    [],
  );

  return (
    <section id="demo" className="section-y rule-t relative overflow-hidden bg-bg-elevated">
      <div className="tech-grid grid-fade pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="container-wide relative">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="t-label flex items-center gap-3 text-ink-2">
              <span aria-hidden className="h-px w-6 bg-accent" />
              Interactive demo
            </p>
            <h2 className="t-h2 mt-5 max-w-[20ch]">Live factory intelligence</h2>
            <p className="t-lead mt-5 max-w-[58ch]">
              This is the kind of system we build, running in your browser. Stop a machine, change
              the line setpoint, watch a fault develop and see it reach the event log. Every value
              is simulated — it is a demonstration of the interface and the logic, not a real plant.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <DemoButton
              onClick={() => setRunning((r) => !r)}
              icon={running ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              label={running ? "Pause" : "Resume"}
              pressed={!running}
            />
            <DemoButton
              onClick={() => dispatch({ type: "speed", delta: 0.15 })}
              icon={<Gauge className="size-3.5" />}
              label="Increase rate"
            />
            <DemoButton
              onClick={() => dispatch({ type: "fault", id: "m2" })}
              icon={<AlertTriangle className="size-3.5" />}
              label="Inject fault"
            />
            <DemoButton
              onClick={() => dispatch({ type: "reset" })}
              icon={<RotateCcw className="size-3.5" />}
              label="Reset"
            />
          </div>
        </div>

        {/* Simulated-data banner lives INSIDE the component, always visible. */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border border-b-0 border-border bg-surface px-5 py-3">
          <span className="flex items-center gap-2">
            <span
              className={cn("size-1.5 rounded-full bg-data", running && !reduced && "anim-blink")}
              aria-hidden
            />
            <span className="t-label text-ink">Line 02 · Demonstration cell</span>
          </span>
          <span className="t-label text-ink-3">Simulated data — not a customer plant</span>
          <span className="t-label ml-auto text-ink-3">
            Setpoint {Math.round(state.speed * 100)}%
          </span>
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {announce}
        </p>

        <div ref={rootRef} className="grid grid-cols-1 border border-border lg:grid-cols-12">
          {/* ── KPI strip + machines ────────────────────────────────────── */}
          <div className="lg:col-span-8 lg:border-r lg:border-border">
            <div className="grid grid-cols-2 border-b border-border sm:grid-cols-4">
              <Kpi label="OEE" value={kpis.oee.toFixed(1)} unit="%" tone="accent" />
              <Kpi label="Availability" value={kpis.availability.toFixed(0)} unit="%" />
              <Kpi label="Units · shift" value={String(kpis.total)} unit="" />
              <Kpi label="Power" value={kpis.energy.toFixed(1)} unit="kW" last />
            </div>

            {/* Mobile: horizontally snapping card deck, not a squeezed grid. */}
            <ul className="flex snap-x snap-mandatory gap-px overflow-x-auto bg-border sm:grid sm:grid-cols-2 sm:overflow-visible">
              {state.machines.map((m) => (
                <li
                  key={m.id}
                  className="min-w-[78%] shrink-0 snap-start bg-surface sm:min-w-0"
                >
                  <MachineTile machine={m} onToggle={() => toggleMachine(m)} animate={running && !reduced} />
                </li>
              ))}
            </ul>
          </div>

          {/* ── Event log ───────────────────────────────────────────────── */}
          <div className="border-t border-border bg-surface lg:col-span-4 lg:border-t-0">
            <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
              <Zap className="size-3.5 text-accent" aria-hidden />
              <span className="t-label text-ink">Event log</span>
            </div>
            <ul className="divide-y divide-[color:var(--color-border)]">
              {state.log.map((entry) => (
                <li key={entry.id} className="flex gap-3 px-5 py-3.5">
                  <span className="tnum shrink-0 font-mono text-[0.6875rem] text-ink-3">
                    {entry.t}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block font-mono text-[0.6875rem] uppercase tracking-[0.1em]",
                        entry.level === "fault"
                          ? "text-fault"
                          : entry.level === "idle"
                            ? "text-idle"
                            : entry.level === "run"
                              ? "text-run"
                              : "text-ink-3",
                      )}
                    >
                      {entry.machine}
                    </span>
                    <span className="block text-[0.8125rem] leading-snug text-ink-2">
                      {entry.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-4 max-w-[70ch] text-[0.8125rem] leading-relaxed text-ink-3">
          In a real deployment these values come from your PLCs and retrofitted sensors, the OEE
          calculation states its own assumptions, and every stop prompts the operator for a reason
          code. The interface is the easy part — getting trustworthy data into it is the
          engineering.
        </p>
      </div>
    </section>
  );
}

/* ── Sub-components ───────────────────────────────────────────────────────── */

function DemoButton({
  onClick,
  icon,
  label,
  pressed,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={cn(
        "flex h-10 items-center gap-2 rounded-md border px-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-colors duration-150",
        "border-border-strong text-ink-2 hover:border-[var(--accent-line)] hover:bg-[var(--accent-soft)] hover:text-ink",
      )}
    >
      <span aria-hidden>{icon}</span>
      {label}
    </button>
  );
}

function Kpi({
  label,
  value,
  unit,
  tone = "data",
  last,
}: {
  label: string;
  value: string;
  unit: string;
  tone?: "data" | "accent";
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 border-border bg-surface px-5 py-5 sm:border-r",
        !last && "border-r",
        last && "sm:border-r-0",
      )}
    >
      <span className="t-label text-ink-3">{label}</span>
      <span
        className={cn(
          "tnum font-mono text-2xl leading-none",
          tone === "accent" ? "text-accent" : "text-data",
        )}
      >
        {value}
        {unit && <span className="ml-1 text-[0.5em] text-ink-3">{unit}</span>}
      </span>
    </div>
  );
}

function MachineTile({
  machine,
  onToggle,
  animate,
}: {
  machine: Machine;
  onToggle: () => void;
  animate: boolean;
}) {
  // Scale against the visible range rather than against zero — with values
  // clustered in a narrow band, a zero-baseline sparkline reads as flat.
  const hi = Math.max(...machine.history);
  const lo = Math.min(...machine.history);
  const span = Math.max(hi - lo, 1);
  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-[0.9375rem] font-semibold text-ink">{machine.name}</p>
          <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-ink-3">{machine.asset}</p>
        </div>
        <StatusPill state={machine.state} blink={animate && machine.state === "fault"} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Readout label="RPM" value={machine.rpm.toFixed(0)} />
        <Readout
          label="Temp"
          value={machine.temp.toFixed(1)}
          unit="°C"
          warn={machine.temp > 75}
        />
        <Readout label="Load" value={machine.amps.toFixed(1)} unit="A" />
      </div>

      {/* Sparkline — 8 bars, last-hour rate. Pure divs; no chart library. */}
      <div className="flex h-10 items-end gap-1" aria-hidden>
        {machine.history.map((h, i) => (
          <span
            key={i}
            className={cn(
              "flex-1 transition-[height] duration-500 ease-out",
              machine.state === "fault"
                ? "bg-fault/50"
                : machine.state === "idle"
                  ? "bg-offline"
                  : i === machine.history.length - 1
                    ? "bg-accent"
                    : "bg-border-strong",
            )}
            style={{ height: `${18 + ((h - lo) / span) * 82}%` }}
          />
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3.5">
        <span className="tnum font-mono text-[0.6875rem] text-ink-3">
          {machine.count} / {machine.target} units
        </span>
        <button
          type="button"
          onClick={onToggle}
          className="rounded-sm font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-2 underline decoration-[var(--accent-line)] underline-offset-4 transition-colors hover:text-accent"
        >
          {machine.state === "fault" ? "Reset machine" : "Stop machine"}
        </button>
      </div>
    </div>
  );
}

function Readout({
  label,
  value,
  unit,
  warn,
}: {
  label: string;
  value: string;
  unit?: string;
  warn?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-3">
        {label}
      </span>
      <span
        className={cn(
          "tnum font-mono text-[0.9375rem] leading-none",
          warn ? "text-idle" : "text-ink",
        )}
      >
        {value}
        {unit && <span className="ml-0.5 text-[0.7em] text-ink-3">{unit}</span>}
      </span>
    </div>
  );
}
