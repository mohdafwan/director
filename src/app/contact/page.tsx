import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { site, telHref, whatsappHref, mailHref } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, TechGrid } from "@/components/ui/primitives";
import { ShortLeadForm } from "@/components/forms/ShortLeadForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Talk to an Engineer",
  description:
    "Talk to an engineer about industrial IoT, automation, PLC, SCADA or industrial software. Call, WhatsApp, or send us what is on your plant floor.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden rule-b">
        <TechGrid className="opacity-50" />
        <div className="container-site relative pb-14 pt-10 lg:pb-16 lg:pt-14">
          <Breadcrumbs trail={[{ name: "Contact", path: "/contact" }]} />
          <p className="t-label mt-10 flex items-center gap-3 text-ink-2">
            <span aria-hidden className="h-px w-6 bg-accent" />
            Contact
          </p>
          <h1 className="t-h1 mt-6 max-w-[18ch]">Talk to an engineer, not a sales desk</h1>
          <p className="t-lead mt-7 max-w-[62ch]">
            Tell us what is on your floor and what you cannot currently answer. The first reply will
            contain something concrete — what is readable from your equipment today, what would need
            instrumentation, and what a sensible first phase looks like.
          </p>
        </div>
      </section>

      <Section bordered={false}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="t-h3">Send us the problem</h2>
            <p className="mt-3 max-w-[54ch] leading-relaxed text-ink-2">
              Five fields. If you would rather answer a few qualifying questions and get a more
              specific reply, use the{" "}
              <Link
                href="/estimate"
                className="text-accent underline decoration-[var(--accent-line)] underline-offset-4 hover:decoration-accent"
              >
                project estimate
              </Link>{" "}
              instead — it takes about two minutes.
            </p>
            <div className="mt-9">
              <ShortLeadForm context="contact" />
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-border bg-surface">
              <div className="border-b border-border p-6">
                <p className="t-label text-ink-3">Faster than a form</p>
                <ul className="mt-5 flex flex-col gap-4">
                  <li>
                    <a
                      href={telHref}
                      data-analytics="contact_call_click"
                      className="flex items-start gap-3 text-ink transition-colors hover:text-accent"
                    >
                      <Phone className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
                      <span>
                        <span className="block font-mono text-[1.0625rem]">
                          {site.contact.phoneDisplay}
                        </span>
                        <span className="block text-[0.8125rem] text-ink-3">
                          Monday to Saturday, business hours
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={whatsappHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-analytics="contact_whatsapp_click"
                      className="flex items-start gap-3 text-ink transition-colors hover:text-accent"
                    >
                      <MessageCircle className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
                      <span>
                        <span className="block text-[1.0625rem]">WhatsApp</span>
                        <span className="block text-[0.8125rem] text-ink-3">
                          Send a photo of the panel or the machine plate — it is often the quickest
                          way to get a useful answer
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={mailHref}
                      className="flex items-start gap-3 text-ink transition-colors hover:text-accent"
                    >
                      <Mail className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
                      <span className="block break-all text-[1.0625rem]">
                        {site.contact.email}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="border-b border-border p-6">
                <p className="t-label text-ink-3">Where we are</p>
                <address className="mt-4 flex items-start gap-3 not-italic leading-relaxed text-ink-2">
                  <MapPin className="mt-1 size-4 shrink-0 text-ink-3" aria-hidden />
                  <span>
                    {site.address.street}
                    <br />
                    {site.address.locality}, {site.address.region} {site.address.postalCode}
                    <br />
                    {site.address.countryName}
                  </span>
                </address>
                <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-3">
                  Engineers travel to site across {site.serviceAreas.join(", ")}. Elsewhere in India
                  by arrangement.
                </p>
              </div>

              <div className="p-6">
                <p className="t-label text-ink-3">What helps us answer well</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {[
                    "Makes and models of the machines involved",
                    "Whether they have PLCs, and which brands",
                    "Roughly how many machines or lines",
                    "What you want to be able to see or control",
                    "Whether there is a network on the shop floor",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-ink-2"
                    >
                      <span aria-hidden className="mt-3 h-px w-2.5 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-3">
                  You do not need all of it. A photo of the machine nameplate and a sentence about
                  the problem is enough to start.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
