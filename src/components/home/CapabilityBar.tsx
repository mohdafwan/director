import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { capabilities } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 2 of 15 — the five-verb spine as a scannable capability row.
 *
 * Two jobs at once: it answers "what do you actually do" for a skimming
 * visitor, and it puts internal links to five money pages high on the
 * homepage, which is where link equity distribution matters most.
 */
export function CapabilityBar() {
  return (
    <section className="rule-t rule-b bg-bg-elevated" aria-label="What we do">
      <div className="container-site">
        {/* Dividers come from a 1px grid gap over a border-coloured background:
            it draws exactly the lines between cells at every column count,
            with no outer border, and does not depend on Tailwind variant
            ordering the way nth-child border utilities do. */}
        <ul className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-5">
          {capabilities.map((item, i) => (
            <li key={item.stage} className="flex bg-bg-elevated">
              <Reveal delay={i * 60} className="flex w-full">
                <Link
                  href={item.href}
                  className="group flex h-full flex-col gap-3 px-6 py-8 transition-colors duration-200 hover:bg-surface lg:px-7 lg:py-10"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="font-mono text-[0.6875rem] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="t-label text-ink">{item.stage}</span>
                    <ArrowUpRight
                      aria-hidden
                      className="ml-auto size-4 text-ink-3 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </span>
                  <span className="t-h4 text-ink">{item.title}</span>
                  <span className="text-[0.9375rem] leading-relaxed text-ink-2">{item.body}</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
