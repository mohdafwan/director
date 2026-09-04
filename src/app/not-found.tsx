import Link from "next/link";
import { services } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { TechGrid } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <TechGrid className="opacity-50" />
      <div className="container-site relative flex min-h-[60vh] flex-col justify-center py-20">
        <p className="t-label flex items-center gap-3 text-ink-2">
          <span aria-hidden className="h-px w-6 bg-fault" />
          404 · No data at this address
        </p>
        <h1 className="t-h1 mt-6 max-w-[16ch]">This page is offline</h1>
        <p className="t-lead mt-6 max-w-[52ch]">
          The link is broken or the page has moved. The capabilities below are the most likely
          things you were looking for.
        </p>

        <ul className="mt-10 flex flex-wrap gap-2">
          {services.slice(0, 6).map((service) => (
            <li key={service.slug}>
              <Link
                href={`/${service.slug}`}
                className="inline-flex border border-border px-4 py-2.5 text-[0.9375rem] text-ink-2 transition-colors hover:border-[var(--accent-line)] hover:bg-[var(--accent-soft)] hover:text-ink"
              >
                {service.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg" withArrow>
            Back to the homepage
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Talk to an engineer
          </Button>
        </div>
      </div>
    </section>
  );
}
