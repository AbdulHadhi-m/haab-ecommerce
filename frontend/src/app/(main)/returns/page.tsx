import type { Metadata } from "next";
import { PageContainer } from "@/shared/components/elements/page-container";
import { SectionHeader } from "@/shared/components/elements/section-header";
import { SITE } from "@/constants";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description: `${SITE.name} return policy, exchange process, and refund information.`,
};

export default function ReturnsPage() {
  return (
    <PageContainer as="main" className="py-16 sm:py-24">
      <SectionHeader title="Returns & Exchanges" subtitle="Hassle-free returns within 30 days" align="center" />
      <div className="mx-auto mt-12 max-w-3xl space-y-8 text-base leading-relaxed text-brand-700 sm:text-lg">
        <div className="space-y-4">
          <div>
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">Return Policy</h3>
            <p className="text-brand-600">
              We accept returns within 30 days of delivery. Items must be unworn, unwashed, and
              in their original condition with all tags attached.
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">How to Return</h3>
            <ol className="list-decimal space-y-1 pl-5 text-brand-600">
              <li>Log into your account and initiate a return under your order history</li>
              <li>Print the prepaid return label provided</li>
              <li>Pack the item securely with all tags attached</li>
              <li>Drop off at any designated shipping location</li>
            </ol>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">Refunds</h3>
            <p className="text-brand-600">
              Refunds are processed within 5-7 business days after we receive your return. The
              amount will be refunded to your original payment method. Shipping charges are
              non-refundable unless the return is due to our error.
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">Exchanges</h3>
            <p className="text-brand-600">
              For size exchanges, please initiate a return and place a new order for the correct
              size. This ensures the fastest possible delivery.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
