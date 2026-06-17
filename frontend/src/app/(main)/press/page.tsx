import type { Metadata } from "next";
import { PageContainer } from "@/shared/components/elements/page-container";
import { SectionHeader } from "@/shared/components/elements/section-header";
import { SITE } from "@/constants";

export const metadata: Metadata = {
  title: "Press",
  description: `${SITE.name} press resources, news, and media inquiries.`,
};

export default function PressPage() {
  return (
    <PageContainer as="main" className="py-16 sm:py-24">
      <SectionHeader title="Press" subtitle="Media resources and inquiries" align="center" />
      <div className="mx-auto mt-12 max-w-3xl space-y-6 text-base leading-relaxed text-brand-700 sm:text-lg">
        <p>
          Welcome to the {SITE.name} press center. Here you will find the latest news, brand
          assets, and media resources.
        </p>
        <div className="border border-brand-200 bg-brand-50 p-6">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
            Media Contact
          </h3>
          <p className="text-brand-700">press@haab.com</p>
        </div>
        <p>
          For press inquiries, interview requests, or brand collaboration opportunities, please
          reach out to our media relations team. We look forward to hearing from you.
        </p>
      </div>
    </PageContainer>
  );
}
