"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-md border border-border bg-bg px-4 text-[0.9375rem] text-ink " +
  "placeholder:text-ink-3 transition-colors duration-150 " +
  "focus:border-accent focus:outline-2 focus:outline-offset-2 focus:outline-accent " +
  "aria-[invalid=true]:border-fault";

export function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="t-label text-ink-2">
        {label}
        {required && (
          <span className="ml-1 text-accent" aria-hidden>
            *
          </span>
        )}
        {!required && <span className="ml-2 normal-case tracking-normal text-ink-3">optional</span>}
      </label>
      {children}
      {hint && !error && <p className="text-[0.8125rem] text-ink-3">{hint}</p>}
      {error && (
        <p id={`${htmlFor}-error`} className="text-[0.8125rem] text-fault">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(control, "h-12", className)} />;
}

export function TextArea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(control, "min-h-32 py-3 leading-relaxed", className)} />;
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={cn(control, "h-12 appearance-none pr-10", className)}>
      {children}
    </select>
  );
}

/** Large tappable choice card — the estimate wizard's primary input. */
export function ChoiceCard({
  selected,
  onSelect,
  title,
  note,
  multi,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  note?: string;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex min-h-[3.5rem] w-full items-start gap-3 rounded-md border p-4 text-left transition-colors duration-150",
        selected
          ? "border-[var(--accent-line)] bg-[var(--accent-soft)]"
          : "border-border bg-bg hover:border-border-strong hover:bg-surface",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "mt-0.5 flex size-4 shrink-0 items-center justify-center border transition-colors",
          multi ? "rounded-sm" : "rounded-full",
          selected ? "border-accent bg-accent" : "border-border-strong",
        )}
      >
        {selected && <span className="size-1.5 rounded-[1px] bg-ink-inverse" />}
      </span>
      <span>
        <span className="block text-[0.9375rem] leading-snug text-ink">{title}</span>
        {note && <span className="mt-0.5 block text-[0.8125rem] text-ink-3">{note}</span>}
      </span>
    </button>
  );
}

/**
 * Honeypot. A real user never fills this; bots fill every input they find.
 * Kept out of the tab order and hidden from assistive technology, so it is
 * invisible to people and irresistible to scrapers — and it means the short
 * form does not need a CAPTCHA wall in front of it.
 */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="company-website">Do not fill this in</label>
      <input
        id="company-website"
        name="company_website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
