import type { Metadata } from "next";
import { PageContainer } from "@/shared/components/elements/page-container";
import { SectionHeader } from "@/shared/components/elements/section-header";
import { SITE } from "@/constants";

export const metadata: Metadata = {
  title: "Track Order",
  description: `Track your ${SITE.name} order status and delivery.`,
};

export default function TrackOrderPage() {
  return (
    <PageContainer as="main" className="py-16 sm:py-24">
      <SectionHeader title="Track Order" subtitle="Enter your order number to track" align="center" />
      <div className="mx-auto mt-12 max-w-lg space-y-6 text-base leading-relaxed text-brand-700 sm:text-lg">
        <p className="text-center text-brand-600">
          To track your order, please visit your account dashboard or check the shipping
          confirmation email sent to you after your order was dispatched.
        </p>
        <div className="border border-brand-200 bg-brand-50 p-6">
          <label
            htmlFor="order-number"
            className="mb-2 block text-xs font-semibold uppercase tracking-widest text-brand-600"
          >
            Order Number
          </label>
          <input
            id="order-number"
            type="text"
            placeholder="e.g. HAAB-12345"
            className="w-full border border-brand-200 bg-white px-4 py-3 text-sm text-brand-900 outline-none focus:border-brand-900"
            readOnly
          />
          <div className="mt-4 inline-block bg-brand-900 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white opacity-60">
            Track
          </div>
          <p className="mt-4 text-xs text-brand-400">
            Online tracking will be available soon. In the meantime, please check your email for
            shipping updates.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
