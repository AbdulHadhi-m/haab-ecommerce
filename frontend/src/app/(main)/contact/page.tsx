import type { Metadata } from "next";
import { PageContainer } from "@/shared/components/elements/page-container";
import { SectionHeader } from "@/shared/components/elements/section-header";
import { SITE } from "@/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${SITE.name}. Customer service, inquiries, and support.`,
};

export default function ContactPage() {
  return (
    <PageContainer as="main" className="py-16 sm:py-24">
      <SectionHeader title="Contact Us" subtitle="We are here to help" align="center" />
      <div className="mx-auto mt-12 max-w-3xl space-y-8 text-base leading-relaxed text-brand-700 sm:text-lg">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="border border-brand-200 bg-brand-50 p-6">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
              Customer Service
            </h3>
            <p className="text-brand-600">support@haab.com</p>
            <p className="mt-1 text-brand-600">1-800-HAAB-SPORT</p>
            <p className="mt-1 text-sm text-brand-500">Mon–Fri, 9 AM – 6 PM EST</p>
          </div>
          <div className="border border-brand-200 bg-brand-50 p-6">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
              Press & Media
            </h3>
            <p className="text-brand-600">press@haab.com</p>
          </div>
          <div className="border border-brand-200 bg-brand-50 p-6">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
              Wholesale
            </h3>
            <p className="text-brand-600">wholesale@haab.com</p>
          </div>
          <div className="border border-brand-200 bg-brand-50 p-6">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
              Partnerships
            </h3>
            <p className="text-brand-600">partners@haab.com</p>
          </div>
        </div>
        <p className="text-center text-brand-500">
          We strive to respond to all inquiries within 24 hours.
        </p>
      </div>
    </PageContainer>
  );
}
