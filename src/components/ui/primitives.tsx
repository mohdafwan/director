import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════════════
   Eyebrow — mono label with a leading rule. The site's most repeated
   "engineering" signal. See docs/03 §6.3.
   ═══════════════════════════════════════════════════════════════════════════ */

export function Eyebrow({
  children,
  className,
  tone = "accent",
}: {
  children: ReactNode;
  className?: string;
  tone?: "accent" | "data" | "muted";
}) {
  const rule =
    tone === "accent" ? "bg-accent" : tone === "data" ? "bg-data" : "bg-border-strong";
  const text = tone === "muted" ? "text-ink-3" : "text-ink-2";
  return (
    <p className={cn("t-label flex items-center gap-3", text, className)}>
      <span aria-hidden className={cn("h-px w-6 shrink-0", rule)} />
      {children}
    </p>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SectionHeader — eyebrow, h2, lead. Fixed rhythm across the whole site.
   ═══════════════════════════════════════════════════════════════════════════ */

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag className={Tag === "h1" ? "t-h1 max-w-[22ch]" : "t-h2 max-w-[24ch]"}>{title}</Tag>
      {lead && <p className="t-lead max-w-[60ch]">{lead}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SpecCard — 1px border + four corner registration ticks, like a drawing
   frame. Replaces glassmorphism as the site's default surface.
   ═══════════════════════════════════════════════════════════════════════════ */

export function SpecCard({
  children,
  className,
  interactive = true,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={cn(
        "group relative border border-border bg-surface",
        interactive &&
          "transition-[border-color,transform,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--accent-line)] hover:bg-surface-2",
        className,
      )}
    >
      <CornerTicks />
      {children}
    </Tag>
  );
}

export function CornerTicks({ className }: { className?: string }) {
  const common =
    "pointer-events-none absolute size-2 border-border-strong transition-colors duration-200 ease-out group-hover:border-accent";
  return (
    <span aria-hidden className={cn("absolute inset-0", className)}>
      <span className={cn(common, "left-0 top-0 border-l border-t")} />
      <span className={cn(common, "right-0 top-0 border-r border-t")} />
      <span className={cn(common, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(common, "bottom-0 right-0 border-b border-r")} />
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   StatusPill — machine state. Colour is ALWAYS paired with a text label so
   colour is never the sole carrier of meaning (docs §6.7).
   ═══════════════════════════════════════════════════════════════════════════ */

export type MachineState = "run" | "idle" | "fault" | "offline";

const stateStyles: Record<MachineState, { dot: string; text: string; label: string }> = {
  run: { dot: "bg-run", text: "text-run", label: "Running" },
  idle: { dot: "bg-idle", text: "text-idle", label: "Idle" },
  fault: { dot: "bg-fault", text: "text-fault", label: "Fault" },
  offline: { dot: "bg-offline", text: "text-offline", label: "Offline" },
};

export function StatusPill({
  state,
  label,
  blink = false,
  className,
}: {
  state: MachineState;
  label?: string;
  blink?: boolean;
  className?: string;
}) {
  const s = stateStyles[state];
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full transition-colors duration-300",
          s.dot,
          blink && "anim-blink",
        )}
      />
      <span className={cn("t-label", s.text)}>{label ?? s.label}</span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DataReadout — tabular numerals so live values never shift layout.
   ═══════════════════════════════════════════════════════════════════════════ */

export function DataReadout({
  value,
  unit,
  label,
  tone = "data",
  className,
}: {
  value: string | number;
  unit?: string;
  label?: string;
  tone?: "data" | "ink" | "accent";
  className?: string;
}) {
  const toneClass =
    tone === "data" ? "text-data" : tone === "accent" ? "text-accent" : "text-ink";
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && <span className="t-label text-ink-3">{label}</span>}
      <span className={cn("tnum font-mono text-2xl leading-none", toneClass)}>
        {value}
        {unit && <span className="ml-1 text-[0.55em] text-ink-3">{unit}</span>}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TechGrid — the masked technical grid used behind loud sections only.
   ═══════════════════════════════════════════════════════════════════════════ */

export function TechGrid({ className, drift = false }: { className?: string; drift?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 tech-grid grid-fade opacity-50",
        drift && "motion-safe:[animation:gridDrift_24s_linear_infinite]",
        className,
      )}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Section — consistent vertical rhythm + optional surface alternation.
   ═══════════════════════════════════════════════════════════════════════════ */

export function Section({
  id,
  children,
  className,
  tone = "bg",
  bordered = true,
  wide = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "bg" | "surface";
  bordered?: boolean;
  wide?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "section-y relative",
        tone === "surface" && "bg-bg-elevated",
        bordered && "rule-t",
        className,
      )}
    >
      <div className={wide ? "container-wide" : "container-site"}>{children}</div>
    </section>
  );
}
