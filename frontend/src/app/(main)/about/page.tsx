import type { Metadata } from "next";
import { PageContainer } from "@/shared/components/elements/page-container";
import { SectionHeader } from "@/shared/components/elements/section-header";
import { SITE } from "@/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE.name}'s story, mission, and commitment to premium sportswear.`,
};

export default function AboutPage() {
  return (
    <PageContainer as="main" className="py-16 sm:py-24">
      <SectionHeader title="About Us" subtitle="Our story and mission" align="center" />
      <div className="mx-auto mt-12 max-w-3xl space-y-6 text-base leading-relaxed text-brand-700 sm:text-lg">
        <p>
          Founded with a passion for performance and style, {SITE.name} was built for those
          who refuse to compromise. We believe what you wear should work as hard as you do.
        </p>
        <p>
          Every piece is designed with meticulous attention to detail, using premium materials
          that stand up to the demands of your active lifestyle. From the training floor to the
          street, our apparel delivers uncompromising comfort, durability, and confidence.
        </p>
        <p>
          Inspired by heritage and driven by innovation, we create sportswear that bridges the
          gap between athletic performance and everyday style. Our collections are crafted for
          the modern individual who values quality, fit, and timeless design.
        </p>
        <p>
          More than just clothing — {SITE.name} is a commitment to excellence. Welcome to the
          movement.
        </p>
      </div>
    </PageContainer>
  );
}
