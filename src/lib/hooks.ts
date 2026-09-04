"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Browser state read through `useSyncExternalStore` rather than
 * `useEffect` + `setState`.
 *
 * This is the correct pattern for values that live outside React: it gives a
 * consistent server snapshot, subscribes without a cascading render on mount,
 * and tears down cleanly.
 */

function subscribeMedia(query: string) {
  return (onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}

/**
 * `prefers-reduced-motion: reduce`.
 *
 * Server snapshot is `false` so the markup matches a default client, and the
 * value updates live if the user changes the OS setting mid-session.
 * Note that the CSS in globals.css already neutralises animation under this
 * media query — this hook is for behaviour CSS cannot express, such as
 * stopping a simulation interval.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeMedia("(prefers-reduced-motion: reduce)"),
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolledPast(threshold = 24): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener("scroll", onChange, { passive: true });
    return () => window.removeEventListener("scroll", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false,
  );
}
