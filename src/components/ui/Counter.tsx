"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Count-up on first view. Tabular numerals, so the layout never jitters as
 * digits change. Respects prefers-reduced-motion by printing the final value.
 */
export function Counter({
  to,
  from = 0,
  duration = 900,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(from);
  const started = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Under reduced motion the value still has to appear — it just appears at
    // once, on first view, instead of counting up.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.unobserve(entry.target);

        if (reduced) {
          setValue(to);
          return;
        }

        const t0 = performance.now();
        let raf = 0;
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          // quint-out, matching --ease-out
          const eased = 1 - Math.pow(1 - p, 5);
          setValue(from + (to - from) * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, from, duration, reduced]);

  return (
    <span ref={ref} className={cn("tnum", className)}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
