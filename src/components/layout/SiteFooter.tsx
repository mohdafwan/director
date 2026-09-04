import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site, telHref, whatsappHref, mailHref, isPlaceholder } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "./Wordmark";
import { capabilityColumns, companyLinks, industryLinks } from "./nav-data";
import { TechGrid } from "@/components/ui/primitives";

export function SiteFooter() {
  const allServices = capabilityColumns.flatMap((c) => c.items);

  return (
    <footer className="relative rule-t bg-bg-elevated">
      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rule-b">
        <TechGrid />
        <div className="container-site relative py-20 lg:py-28">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="t-label flex items-center gap-3 text-ink-2">
                <span aria-hidden className="h-px w-6 bg-accent" />
                Start here
              </p>
              <h2 className="t-h2 mt-5 max-w-[20ch]">
                Have a machine, plant or process you want to transform?
              </h2>
              <p className="t-lead mt-5 max-w-[52ch]">
                Tell us what is on your floor and what you cannot currently answer. We will tell
                you what is readable today and what a sensible first phase looks like.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button href="/contact" size="lg" withArrow>
                Talk to an engineer
              </Button>
              <Button href="/estimate" variant="secondary" size="lg">
                Get a project estimate
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Link grid ─────────────────────────────────────────────────────── */}
      <div className="container-site py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <Wordmark />
            <p className="mt-5 max-w-[38ch] text-[0.9375rem] leading-relaxed text-ink-2">
              {site.tagline}. We connect, automate and monitor industrial plants — engineered by
              one team from the sensor to the dashboard.
            </p>

            <ul className="mt-7 flex flex-col gap-3 text-[0.9375rem]">
              <li>
                <a
                  href={telHref}
                  className="flex items-center gap-3 text-ink-2 transition-colors hover:text-ink"
                  data-analytics="contact_call_click"
                >
                  <Phone className="size-4 shrink-0 text-ink-3" aria-hidden />
                  <span className="font-mono">{site.contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-ink-2 transition-colors hover:text-ink"
                  data-analytics="contact_whatsapp_click"
                >
                  <MessageCircle className="size-4 shrink-0 text-ink-3" aria-hidden />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={mailHref}
                  className="flex items-center gap-3 break-all text-ink-2 transition-colors hover:text-ink"
                >
                  <Mail className="size-4 shrink-0 text-ink-3" aria-hidden />
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-ink-2">
                <MapPin className="mt-1 size-4 shrink-0 text-ink-3" aria-hidden />
                <address className="not-italic leading-relaxed">
                  {site.address.street}
                  <br />
                  {site.address.locality}, {site.address.region} {site.address.postalCode}
                  <br />
                  {site.address.countryName}
                </address>
              </li>
              {!isPlaceholder(site.social.linkedin) && (
                <li>
                  <a
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-ink-2 transition-colors hover:text-ink"
                  >
                    <LinkedInGlyph />
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>

          <FooterColumn
            title="Capabilities"
            links={allServices.map((s) => ({ name: s.name, href: s.href }))}
            className="lg:col-span-3"
          />
          <FooterColumn
            title="Industries"
            links={industryLinks.map((i) => ({ name: i.name, href: i.href }))}
            className="lg:col-span-3"
          />
          <div className="lg:col-span-2">
            <FooterColumn
              title="Company"
              links={[
                { name: "Projects", href: "/projects" },
                ...companyLinks.map((c) => ({ name: c.name, href: c.href })),
              ]}
            />
            <Link
              href="/what-we-do"
              className="mt-6 inline-flex items-center gap-1.5 text-[0.875rem] text-accent hover:text-accent-hover"
            >
              All capabilities
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Legal bar ─────────────────────────────────────────────────────── */}
      <div className="rule-t">
        <div className="container-site flex flex-col gap-4 py-6 pb-24 text-[0.8125rem] text-ink-3 sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {site.business.gstin && <span className="font-mono">GSTIN {site.business.gstin}</span>}
            {site.business.cin && <span className="font-mono">CIN {site.business.cin}</span>}
            <Link href="/legal/privacy" className="transition-colors hover:text-ink-2">
              Privacy
            </Link>
            <Link href="/legal/terms" className="transition-colors hover:text-ink-2">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="transition-colors hover:text-ink-2">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: { name: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="t-label border-b border-border pb-3 text-ink">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[0.875rem] leading-snug text-ink-2 transition-colors duration-150 hover:text-accent"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** lucide-react v1 no longer ships brand marks, so LinkedIn is inline. */
function LinkedInGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="size-4 shrink-0 text-ink-3"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.7h.05a4.16 4.16 0 0 1 3.75-2.06c4 0 4.75 2.64 4.75 6.07V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85V21h-4V9Z" />
    </svg>
  );
}
