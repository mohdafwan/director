"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { archStages } from "@/content/architecture";
import { cn, clamp } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Section 6 of 15 — the ten-stage data path, driven by scroll position.
 *
 * A sticky viewport whose scroll progress selects the active stage and moves a
 * data packet along the path. No scroll-jacking: we read scroll position from
 * a passive listener and never call preventDefault, so native scrolling speed,
 * momentum and accessibility are all preserved.
 *
 * Desktop renders a horizontal rail; mobile renders a vertical stack with one
 * stage in focus — a mobile-specific layout, not a squeezed desktop one
 * (docs/03 §6.6).
 *
 * Under prefers-reduced-motion the sticky/scroll behaviour is dropped entirely
 * and all ten stages render as a plain, complete list.
 */
export function ArchitectureFlow() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = wrapRef.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      setProgress(clamp(-rect.top / scrollable, 0, 1));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    // Deferred rather than called inline, so the first measurement happens
    // after paint instead of forcing a synchronous layout during commit.
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  const activeIndex = Math.min(
    archStages.length - 1,
    Math.floor(progress * archStages.length * 0.999),
  );
  const active = archStages[activeIndex];

  if (reduced) return <StaticArchitecture />;

  return (
    <section id="architecture" className="rule-t bg-bg">
      {/* 10 stages × ~62vh of scroll each gives a comfortable dwell per stage. */}
      <div ref={wrapRef} style={{ height: `${archStages.length * 62 + 100}vh` }}>
        <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden">
          <div className="tech-grid grid-fade pointer-events-none absolute inset-0 opacity-30" aria-hidden />

          <div className="container-wide relative">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="t-label flex items-center gap-3 text-ink-2">
                  <span aria-hidden className="h-px w-6 bg-accent" />
                  The path
                </p>
                <h2 className="t-h2 mt-4 max-w-[18ch]">
                  From the terminal block to the decision
                </h2>
              </div>
              <p className="max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-2">
                Ten stages. Every industrial data system is some version of this path — the
                engineering is in the choices made at each step, and in the boundary at stage four.
              </p>
            </div>

            {/* ── Rail ────────────────────────────────────────────────── */}
            <div className="relative mb-10">
              <div className="absolute inset-x-0 top-[13px] h-px bg-border" aria-hidden />
              <div
                className="absolute left-0 top-[13px] h-px bg-accent transition-[width] duration-150 ease-out"
                style={{ width: `${progress * 100}%` }}
                aria-hidden
              />
              {/* The travelling data packet */}
              <div
                className="absolute top-[9px] size-2.5 rounded-full bg-data shadow-[0_0_12px_var(--data-line)] transition-[left] duration-150 ease-out"
                style={{ left: `calc(${progress * 100}% - 5px)` }}
                aria-hidden
              />

              <ol className="relative flex justify-between pb-8">
                {archStages.map((stage, i) => {
                  const done = i <= activeIndex;
                  const isFirst = i === 0;
                  const isLast = i === archStages.length - 1;
                  return (
                    <li key={stage.id} className="relative flex flex-col items-center">
                      <span
                        className={cn(
                          "size-[7px] rotate-45 border transition-all duration-300",
                          done
                            ? "border-accent bg-accent"
                            : "border-border-strong bg-bg",
                          i === activeIndex && "scale-150",
                        )}
                        aria-hidden
                      />
                      {/* Absolutely positioned so the diamonds stay evenly
                          spread while the end labels stay inside the rail. */}
                      <span
                        className={cn(
                          "absolute top-5 hidden whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.1em] transition-colors duration-300 md:block",
                          isFirst
                            ? "left-0"
                            : isLast
                              ? "right-0"
                              : "left-1/2 -translate-x-1/2",
                          i === activeIndex ? "text-ink" : done ? "text-ink-3" : "text-border-strong",
                        )}
                      >
                        {stage.shortLabel}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* ── Active stage detail ─────────────────────────────────── */}
            <div className="grid grid-cols-1 gap-8 border border-border bg-surface p-6 lg:grid-cols-12 lg:p-9">
              <div className="lg:col-span-5">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent">
                  {active.index} / 10 · {active.label.toUpperCase()}
                </span>
                <h3 className="t-h3 mt-4">{active.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-2">{active.body}</p>
                <Link
                  href={active.href}
                  className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] text-accent transition-colors hover:text-accent-hover"
                >
                  Read more about this stage
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>

              <ul className="grid grid-cols-1 gap-px self-start bg-border sm:grid-cols-2 lg:col-span-7">
                {active.detail.map((d) => (
                  <li
                    key={d}
                    className="bg-surface px-5 py-4 font-mono text-[0.8125rem] leading-relaxed text-ink-2"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-3">
              Scroll to advance · stage {activeIndex + 1} of {archStages.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Reduced-motion and no-JS fallback: the complete path, plainly. */
function StaticArchitecture() {
  return (
    <section id="architecture" className="section-y rule-t">
      <div className="container-site">
        <p className="t-label flex items-center gap-3 text-ink-2">
          <span aria-hidden className="h-px w-6 bg-accent" />
          The path
        </p>
        <h2 className="t-h2 mt-4 max-w-[18ch]">From the terminal block to the decision</h2>
        <ol className="mt-12 border-t border-border">
          {archStages.map((stage) => (
            <li key={stage.id} className="grid grid-cols-1 gap-6 border-b border-border py-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent">
                  {stage.index} · {stage.label.toUpperCase()}
                </span>
                <h3 className="t-h4 mt-3">{stage.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-2">{stage.body}</p>
                <Link href={stage.href} className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] text-accent">
                  Read more <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
              <ul className="flex flex-col gap-2 lg:col-span-7">
                {stage.detail.map((d) => (
                  <li key={d} className="font-mono text-[0.8125rem] leading-relaxed text-ink-2">
                    {d}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
