"use client";

import { useEffect, useState } from "react";
import { seeded } from "@/lib/utils";

/**
 * The hero's ambient "continuous subtle data movement" beat (docs/03 §7.3,
 * t = 3300ms onward). About 1KB of client JS.
 *
 * SSR-safe: initial values are deterministic, so there is no hydration
 * mismatch. Under prefers-reduced-motion the values are printed once and never
 * change. The loop pauses when the tab is hidden.
 *
 * Values are simulated and the strip says so — this is a schematic, not a
 * claim about a real plant.
 */

const BASE = [
  { label: "OEE", value: 78.4, unit: "%", decimals: 1, drift: 0.5 },
  { label: "Units / hr", value: 412, unit: "", decimals: 0, drift: 6 },
  { label: "Spindle", value: 1480, unit: "rpm", decimals: 0, drift: 14 },
  { label: "Load", value: 62.0, unit: "A", decimals: 1, drift: 1.2 },
];

export function HeroTicker() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let id: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (id === null) id = setInterval(() => setTick((t) => t + 1), 3000);
    };
    const stop = () => {
      if (id !== null) {
        clearInterval(id);
        id = null;
      }
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="anim-trust mt-6 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4">
      {BASE.map((item, i) => {
        const jitter = tick === 0 ? 0 : (seeded(tick * 7 + i * 13) - 0.5) * 2 * item.drift;
        const shown = (item.value + jitter).toFixed(item.decimals);
        return (
          <div key={item.label} className="flex flex-col gap-1 bg-surface px-4 py-3">
            <span className="t-label text-ink-3">{item.label}</span>
            <span className="tnum font-mono text-lg leading-none text-data">
              {shown}
              {item.unit && <span className="ml-1 text-[0.6em] text-ink-3">{item.unit}</span>}
            </span>
          </div>
        );
      })}
      <p className="col-span-2 bg-surface px-4 pb-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-3 sm:col-span-4">
        Schematic · simulated values
      </p>
    </div>
  );
}
