import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/jsonld";
import { services } from "@/content/services";
import { JsonLd } from "@/components/seo/JsonLd";

import { Hero } from "@/components/home/Hero";
import { CapabilityBar } from "@/components/home/CapabilityBar";
import { ProblemSection } from "@/components/home/ProblemSection";
import { BrownfieldSection } from "@/components/home/BrownfieldSection";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { WhyUs } from "@/components/home/WhyUs";
import { TechnologySection } from "@/components/home/TechnologySection";
import { CommercialsSection } from "@/components/home/CommercialsSection";
import { FaqSection } from "@/components/home/FaqSection";

/* Interactive islands: below the fold, loaded on demand so they never appear
   in the initial route bundle and cannot affect LCP. */
const LiveDemo = dynamic(() => import("@/components/home/LiveDemo").then((m) => m.LiveDemo));
const ArchitectureFlow = dynamic(() =>
  import("@/components/home/ArchitectureFlow").then((m) => m.ArchitectureFlow),
);
const IndustriesExplorer = dynamic(() =>
  import("@/components/home/IndustriesExplorer").then((m) => m.IndustriesExplorer),
);

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — Industrial IoT, Automation & Digital Transformation`,
  description:
    "We connect existing PLCs, sensors and machines to real-time monitoring, automation and software. IIoT, PLC, SCADA, HMI and industrial software — one engineering team.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={itemListSchema(
          services.map((s) => ({
            name: s.name,
            path: `/${s.slug}`,
            description: s.summary,
          })),
        )}
      />

      {/* Homepage section order and reasoning: docs/02-SITEMAP-AND-UX.md §5.1 */}
      <Hero />                {/* 01 · who / what / who-for                     */}
      <CapabilityBar />       {/* 02 · scannable capability row + early links   */}
      <ProblemSection />      {/* 03 · recognition                              */}
      <BrownfieldSection />   {/* 04 · objection killed early                   */}
      <LiveDemo />            {/* 05 · show the cure working                    */}
      <ArchitectureFlow />    {/* 06 · technical credibility                    */}
      <WhatWeBuild />         {/* 07 · depth + navigation to money pages        */}
      <IndustriesExplorer />  {/* 08 · sector relevance                         */}
      <ProcessSection />      {/* 09 · how we engage, and the way out           */}
      <ProjectsSection />     {/* 10 · honest proof                             */}
      <WhyUs />               {/* 11 · differentiator, after the depth          */}
      <TechnologySection />   {/* 12 · engineer's checklist                     */}
      <CommercialsSection />  {/* 13 · cost and time                            */}
      <FaqSection />          {/* 14 · residual doubt + FAQPage schema          */}
      {/* 15 · final CTA lives in the footer, so the page does not stack two
             identical calls to action back to back. */}
    </>
  );
}
