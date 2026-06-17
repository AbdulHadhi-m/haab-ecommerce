import type { Metadata } from "next";
import { PageContainer } from "@/shared/components/elements/page-container";
import { SectionHeader } from "@/shared/components/elements/section-header";
import { SITE } from "@/constants";

export const metadata: Metadata = {
  title: "Payment Options",
  description: `${SITE.name} accepted payment methods including credit cards, PayPal, and more.`,
};

export default function PaymentOptionsPage() {
  return (
    <PageContainer as="main" className="py-16 sm:py-24">
      <SectionHeader title="Payment Options" subtitle="Secure and convenient payment methods" align="center" />
      <div className="mx-auto mt-12 max-w-3xl space-y-8 text-base leading-relaxed text-brand-700 sm:text-lg">
        <p className="text-brand-600">
          We offer a variety of secure payment options to make your shopping experience seamless.
          All transactions are encrypted and processed securely.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border border-brand-200 bg-brand-50 p-6">
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">
              Credit & Debit Cards
            </h3>
            <p className="text-brand-600">Visa, Mastercard, American Express, Discover</p>
          </div>
          <div className="border border-brand-200 bg-brand-50 p-6">
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">
              PayPal
            </h3>
            <p className="text-brand-600">Pay with your PayPal account</p>
          </div>
          <div className="border border-brand-200 bg-brand-50 p-6">
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">
              Apple Pay
            </h3>
            <p className="text-brand-600">Fast and secure checkout on Apple devices</p>
          </div>
          <div className="border border-brand-200 bg-brand-50 p-6">
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">
              Google Pay
            </h3>
            <p className="text-brand-600">One-tap checkout on Android and Chrome</p>
          </div>
          <div className="border border-brand-200 bg-brand-50 p-6">
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">
              Gift Cards
            </h3>
            <p className="text-brand-600">Redeem your {SITE.name} gift card at checkout</p>
          </div>
          <div className="border border-brand-200 bg-brand-50 p-6">
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">
              Afterpay / Klarna
            </h3>
            <p className="text-brand-600">Buy now, pay in installments (coming soon)</p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
