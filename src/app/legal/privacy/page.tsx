import type { Metadata } from "next";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section } from "@/components/ui/primitives";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects information submitted through this website.`,
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Section bordered={false}>
        <Breadcrumbs
          trail={[
            { name: "Legal", path: "/legal/privacy" },
            { name: "Privacy", path: "/legal/privacy" },
          ]}
        />
        <h1 className="t-h1 mt-8">Privacy policy</h1>

        {/* Template only. Have it reviewed against India's DPDP Act 2023 — and
            against GDPR if EU enquiries are accepted — before going live. */}
        <div className="mt-6 max-w-[70ch] border border-dashed border-border-strong bg-surface p-5">
          <p className="text-[0.9375rem] leading-relaxed text-ink-2">
            <span className="font-medium text-ink">Before publishing: </span>
            this is a working template describing what the site actually does. Have it reviewed
            against India&rsquo;s Digital Personal Data Protection Act 2023 — and against the GDPR if
            you accept enquiries from the EU — and complete the company details in{" "}
            <code>src/config/site.ts</code>.
          </p>
        </div>

        <div className="prose-industrial mt-10">
          <h2>What we collect</h2>
          <p>
            We collect only what you send us. Through the contact form that is your name, company,
            phone number, email address and the description of your requirement. Through the project
            estimate form it additionally includes your role, industry, location, an indication of
            plant size, the control systems installed, the scope you are considering, your timeline
            and — if you choose to give it — a budget range.
          </p>
          <p>
            If web analytics is enabled, we also collect standard usage data: pages viewed, approximate
            location derived from IP address, device type and referring source. This is used to
            understand which pages are useful, not to identify individuals.
          </p>

          <h2>Why we collect it</h2>
          <ul>
            <li>To respond to your enquiry and prepare a technical or commercial answer</li>
            <li>To contact you about the project you asked about</li>
            <li>To maintain a record of enquiries and proposals</li>
            <li>To understand which parts of this site are useful, in aggregate</li>
          </ul>

          <h2>What we do not do</h2>
          <ul>
            <li>We do not sell, rent or share your information with third parties for their marketing</li>
            <li>We do not add you to a mailing list or an automated follow-up sequence</li>
            <li>We do not use your enquiry for anything other than answering it and the discussion that follows</li>
          </ul>

          <h2>How long we keep it</h2>
          <p>
            Enquiry records are retained while the discussion is active and for a reasonable period
            afterwards, so that we can refer back if you return to the project. You can ask us to
            delete your information at any time and we will do so, except where we are required to
            retain records for tax or legal reasons.
          </p>

          <h2>Where it is stored</h2>
          <p>
            Enquiry data is held in our email and, where used, our customer management system.
            Analytics data, where enabled, is processed by the analytics provider under their own
            terms.
          </p>

          <h2>Cookies</h2>
          <p>
            This site does not use cookies for advertising or cross-site tracking. If analytics is
            enabled, the analytics provider may set cookies to distinguish sessions. Your browser can
            block these without affecting how the site works.
          </p>

          <h2>Your rights</h2>
          <p>
            You may ask what information we hold about you, ask us to correct it, or ask us to delete
            it. Write to <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> and we will
            respond within a reasonable period.
          </p>

          <h2>Security</h2>
          <p>
            Data submitted through this site is transmitted over TLS. Access to enquiry data is
            limited to the people who need it in order to respond. Where we work on your systems, the
            handling of your operational and production data is governed by the specific agreement for
            that engagement — not by this policy.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            {" · "}
            {site.legalName}, {site.address.locality}, {site.address.countryName}.
          </p>
        </div>
      </Section>
    </>
  );
}
