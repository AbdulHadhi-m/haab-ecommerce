import type { Metadata } from "next";
import { PageContainer } from "@/shared/components/elements/page-container";
import { SectionHeader } from "@/shared/components/elements/section-header";
import { SITE } from "@/constants";

export const metadata: Metadata = {
  title: "Shipping",
  description: `${SITE.name} shipping information, delivery times, and rates.`,
};

export default function ShippingPage() {
  return (
    <PageContainer as="main" className="py-16 sm:py-24">
      <SectionHeader title="Shipping" subtitle="Delivery information and rates" align="center" />
      <div className="mx-auto mt-12 max-w-3xl space-y-8 text-base leading-relaxed text-brand-700 sm:text-lg">
        <div className="space-y-4">
          <div>
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">Domestic Shipping (US)</h3>
            <ul className="list-disc space-y-1 pl-5 text-brand-600">
              <li><strong>Standard:</strong> $5.99 — Delivers in 5-7 business days</li>
              <li><strong>Express:</strong> $12.99 — Delivers in 2-3 business days</li>
              <li><strong>Free Standard:</strong> On orders over $100</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">International Shipping</h3>
            <ul className="list-disc space-y-1 pl-5 text-brand-600">
              <li><strong>Standard International:</strong> $19.99 — Delivers in 7-14 business days</li>
              <li><strong>Express International:</strong> $34.99 — Delivers in 4-7 business days</li>
              <li>Import duties and taxes may apply and are the responsibility of the customer</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">Order Processing</h3>
            <p className="text-brand-600">
              Orders are processed within 1-2 business days. You will receive a shipping
              confirmation with tracking information once your order has shipped.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
