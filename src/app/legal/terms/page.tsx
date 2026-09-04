import type { Metadata } from "next";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section } from "@/components/ui/primitives";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: `Terms governing the use of the ${site.name} website.`,
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <Section bordered={false}>
      <Breadcrumbs
        trail={[
          { name: "Legal", path: "/legal/terms" },
          { name: "Terms", path: "/legal/terms" },
        ]}
      />
      <h1 className="t-h1 mt-8">Terms of use</h1>

      <div className="mt-6 max-w-[70ch] border border-dashed border-border-strong bg-surface p-5">
        <p className="text-[0.9375rem] leading-relaxed text-ink-2">
          <span className="font-medium text-ink">Before publishing: </span>
          have this reviewed by a lawyer in your jurisdiction and complete the company details in{" "}
          <code>src/config/site.ts</code>.
        </p>
      </div>

      <div className="prose-industrial mt-10">
        <h2>Scope</h2>
        <p>
          These terms govern your use of this website. They do not govern any engagement between us —
          that is covered by the specific written agreement for the project concerned, which takes
          precedence over anything on this site.
        </p>

        <h2>Information on this site</h2>
        <p>
          The technical content here is published in good faith and describes approaches we would
          take. It is general information, not engineering advice for your specific plant. Industrial
          systems differ in ways that matter, and nothing here should be relied on as a design for
          your installation without a site-specific assessment.
        </p>
        <p>
          The interactive demonstration on the homepage uses simulated data. It shows the interface
          and the logic of the kind of system we build. It is not real production data and does not
          represent any customer plant.
        </p>
        <p>
          Pages labelled &ldquo;Engineering Demonstration&rdquo; describe work built on our own
          equipment. Pages labelled &ldquo;Reference Architecture&rdquo; describe designs we would
          propose. Neither represents a delivered customer project, and both are labelled as such
          wherever they appear.
        </p>

        <h2>Safety</h2>
        <p>
          Nothing on this site constitutes functional safety advice. Safety functions must be
          designed, verified and approved by a qualified functional safety engineer under the
          applicable standards. Where an engagement requires that competence and it falls outside our
          scope, we will say so before contracting.
        </p>

        <h2>Third-party names</h2>
        <p>
          Manufacturer, platform and product names are used for identification only, to describe
          equipment we work with. All trademarks are the property of their respective owners. Their
          use does not imply any partnership, endorsement or authorised-partner status unless stated
          explicitly and separately.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The content, design and code of this site belong to {site.legalName} unless stated
          otherwise. You may read, share and quote it with attribution. You may not republish it as
          your own.
        </p>

        <h2>Liability</h2>
        <p>
          This site is provided as it is. To the extent permitted by law, we accept no liability for
          loss arising from reliance on information published here. Liability arising from work we
          are contracted to perform is governed by that contract.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of India, with jurisdiction in the courts of{" "}
          {site.address.locality}, {site.address.region}.
        </p>

        <h2>Contact</h2>
        <p>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> · {site.legalName}.
        </p>
      </div>
    </Section>
  );
}
