"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll reveal. IntersectionObserver, fires ONCE, then unobserves.
 *
 * Deliberately not Motion: this runs on every section of every page, so it must
 * cost ~0 bytes beyond React. Transform + opacity only.
 * Under prefers-reduced-motion the CSS transition is neutralised globally
 * (globals.css) and the element simply appears.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
  y = 20,
}: {
  children: ReactNode;
  /** ms */
  delay?: number;
  as?: ElementType;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.unobserve(entry.target);
        }
      },
      // threshold 0 + a negative bottom margin rather than a fractional
      // threshold: an element taller than ~6x the viewport can never reach
      // 15% visibility, so a fractional threshold would leave it permanently
      // hidden. This fires as soon as the element crosses 8% up from the
      // viewport bottom, whatever its height.
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("transition-[opacity,transform] duration-600 ease-out", className)}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translate3d(0, ${y}px, 0)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

/** Convenience: staggers direct children by `step` ms. */
export function RevealGroup({
  children,
  step = 60,
  className,
  as,
}: {
  children: ReactNode[];
  step?: number;
  className?: string;
  as?: ElementType;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * step} as={as}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
