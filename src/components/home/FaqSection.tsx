import { homeFaq } from "@/content/home";
import { faqSchema } from "@/lib/jsonld";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { FaqList } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";

/** Section 14 of 15 — residual objections, plus FAQPage structured data. */
export function FaqSection() {
  return (
    <Section id="faq" tone="surface">
      <JsonLd data={faqSchema(homeFaq)} />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionHeader
                eyebrow="Questions"
                title="The things people ask before the first call"
                lead="Including the one about why you should trust a company that started this year."
              />
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-8">
          <Reveal>
            <FaqList items={homeFaq} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
