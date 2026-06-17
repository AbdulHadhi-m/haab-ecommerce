import type { Metadata } from "next";
import { PageContainer } from "@/shared/components/elements/page-container";
import { SectionHeader } from "@/shared/components/elements/section-header";
import { SITE } from "@/constants";

export const metadata: Metadata = {
  title: "Sustainability",
  description: `${SITE.name}'s commitment to sustainable practices and ethical production.`,
};

export default function SustainabilityPage() {
  return (
    <PageContainer as="main" className="py-16 sm:py-24">
      <SectionHeader title="Sustainability" subtitle="Our commitment to a better future" align="center" />
      <div className="mx-auto mt-12 max-w-3xl space-y-6 text-base leading-relaxed text-brand-700 sm:text-lg">
        <p>
          At {SITE.name}, we believe that great sportswear should not come at the expense of
          our planet. We are committed to reducing our environmental footprint through thoughtful
          sourcing, responsible manufacturing, and sustainable innovation.
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">Sustainable Materials</h3>
            <p>
              We prioritize organic cotton, recycled polyester, and low-impact dyes in our
              collections. Every material is chosen for its quality and environmental impact.
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">Ethical Production</h3>
            <p>
              Our manufacturing partners adhere to strict ethical standards, ensuring fair wages,
              safe working conditions, and responsible waste management.
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">Circular Future</h3>
            <p>
              We are working towards a circular model — designing products that last longer,
              using recyclable packaging, and exploring take-back programs to minimize waste.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
