import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema } from "@/lib/jsonld";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const full: Crumb[] = [{ name: "Home", path: "/" }, ...trail];

  return (
    <>
      <JsonLd data={breadcrumbSchema(full)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-3">
          {full.map((crumb, i) => {
            const last = i === full.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-ink-2">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.path} className="transition-colors hover:text-accent">
                      {crumb.name}
                    </Link>
                    <ChevronRight className="size-3 text-border-strong" aria-hidden />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
