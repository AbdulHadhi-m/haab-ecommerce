import type { Metadata } from "next";
import { PageContainer } from "@/shared/components/elements/page-container";
import { SectionHeader } from "@/shared/components/elements/section-header";
import { SITE } from "@/constants";

export const metadata: Metadata = {
  title: "Careers",
  description: `Join the ${SITE.name} team. Explore career opportunities in sportswear, design, and retail.`,
};

export default function CareersPage() {
  return (
    <PageContainer as="main" className="py-16 sm:py-24">
      <SectionHeader title="Careers" subtitle="Join the team" align="center" />
      <div className="mx-auto mt-12 max-w-3xl space-y-6 text-base leading-relaxed text-brand-700 sm:text-lg">
        <p>
          At {SITE.name}, we are always looking for talented individuals who share our passion for
          sportswear, design, and performance. We believe in fostering a culture of creativity,
          collaboration, and continuous growth.
        </p>
        <p>
          We offer a dynamic work environment where your ideas matter and your contributions
          make a real impact. From design and product development to marketing and retail, there
          are many ways to be part of our story.
        </p>
        <p className="font-semibold text-brand-900">No open positions at this time.</p>
        <p>
          We are always open to connecting with passionate people. Send your resume and portfolio
          to <span className="text-brand-500">careers@haab.com</span> and we will keep you in
          mind for future opportunities.
        </p>
      </div>
    </PageContainer>
  );
}
