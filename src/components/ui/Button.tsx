import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 font-medium rounded-md " +
  "transition-[background-color,border-color,color,transform] duration-150 ease-out " +
  "active:scale-[0.985] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // The ONLY orange element on any given screen. See docs/03 §6.2.
  primary: "bg-accent text-ink-inverse hover:bg-accent-hover",
  secondary:
    "border border-border-strong text-ink hover:border-[var(--accent-line)] hover:bg-[var(--accent-soft)]",
  ghost: "text-ink-2 hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-6 text-base",
};

type Props = {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">, "children" | "className">;

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  withArrow = false,
  children,
  className,
  ...rest
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);

  const inner = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-[3px]"
        />
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  );
}
