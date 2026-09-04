import type { Metadata } from "next";

import { commercials } from "@/content/home";
import { buildMetadata } from "@/lib/seo";
import { site, telHref, whatsappHref } from "@/config/site";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, TechGrid } from "@/components/ui/primitives";
import { EstimateWizard } from "@/components/forms/EstimateWizard";

export const metadata: Metadata = buildMetadata({
  title: "Request a Project Estimate",
  description:
    "Tell us about your plant and get a realistic estimate. Two minutes, and the reply comes from an engineer with a first-phase scope rather than a brochure.",
  path: "/estimate",
});

export default function EstimatePage() {
  return (
    <>
      <section className="relative overflow-hidden rule-b">
        <TechGrid className="opacity-50" />
        <div className="container-site relative pb-14 pt-10 lg:pb-16 lg:pt-14">
          <Breadcrumbs trail={[{ name: "Project estimate", path: "/estimate" }]} />
          <p className="t-label mt-10 flex items-center gap-3 text-ink-2">
            <span aria-hidden className="h-px w-6 bg-accent" />
            Project estimate
          </p>
          <h1 className="t-h1 mt-6 max-w-[20ch]">Tell us about the plant, get a real answer</h1>
          <p className="t-lead mt-7 max-w-[64ch]">
            We do not publish a price list, because a number without a scope is worthless to you.
            Answer five short steps instead and an engineer will come back with what is readable
            from your equipment today, what would need instrumentation, and a realistic first-phase
            shape and range.
          </p>
        </div>
      </section>

      <Section bordered={false}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8">
            <EstimateWizard />
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="border border-border bg-surface p-6">
                <p className="t-label text-ink-3">What drives the cost</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {commercials.drivers.map((driver) => (
                    <li key={driver.title}>
                      <p className="text-[0.9375rem] leading-snug text-ink">{driver.title}</p>
                      <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-ink-3">
                        {driver.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 border border-border bg-surface p-6">
                <p className="t-label text-ink-3">Rather just talk?</p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  Calling or messaging reaches the same engineer who would read this form.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <a
                    href={telHref}
                    data-analytics="contact_call_click"
                    className="font-mono text-[1.0625rem] text-ink transition-colors hover:text-accent"
                  >
                    {site.contact.phoneDisplay}
                  </a>
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-analytics="contact_whatsapp_click"
                    className="text-[0.9375rem] text-accent hover:text-accent-hover"
                  >
                    Message on WhatsApp →
                  </a>
                </div>
              </div>

              <p className="mt-4 px-1 text-[0.8125rem] leading-relaxed text-ink-3">
                Your answers are used to prepare a response and nothing else. No mailing list, no
                follow-up sequence, no sharing with third parties.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
