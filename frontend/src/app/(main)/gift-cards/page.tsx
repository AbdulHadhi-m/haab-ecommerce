import type { Metadata } from "next";
import { PageContainer } from "@/shared/components/elements/page-container";
import { SectionHeader } from "@/shared/components/elements/section-header";
import { SITE } from "@/constants";

export const metadata: Metadata = {
  title: "Gift Cards",
  description: `${SITE.name} gift cards — the perfect gift for sportswear lovers.`,
};

export default function GiftCardsPage() {
  return (
    <PageContainer as="main" className="py-16 sm:py-24">
      <SectionHeader title="Gift Cards" subtitle="The perfect gift for any occasion" align="center" />
      <div className="mx-auto mt-12 max-w-3xl space-y-6 text-base leading-relaxed text-brand-700 sm:text-lg">
        <p className="text-brand-600">
          Give the gift of premium sportswear. {SITE.name} gift cards are the perfect choice for
          birthdays, holidays, or any occasion. Let them choose what they love.
        </p>
        <div className="border border-brand-200 bg-brand-50 p-6">
          <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">
            Available Amounts
          </h3>
          <p className="text-brand-600">$25, $50, $75, $100, $150, $200, $250, $500</p>
        </div>
        <div className="border border-brand-200 bg-brand-50 p-6">
          <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">
            How It Works
          </h3>
          <ul className="list-disc space-y-1 pl-5 text-brand-600">
            <li>Choose your gift card amount</li>
            <li>Add a personalized message (optional)</li>
            <li>Receive the gift card instantly via email</li>
            <li>Redeem at checkout using the unique code</li>
          </ul>
        </div>
        <div className="border border-brand-200 bg-brand-50 p-6">
          <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">
            Terms
          </h3>
          <ul className="list-disc space-y-1 pl-5 text-brand-600">
            <li>Gift cards never expire</li>
            <li>Can be combined with other payment methods</li>
            <li>Cannot be redeemed for cash or exchanged</li>
            <li>Not applicable to previous purchases</li>
          </ul>
        </div>
        <p className="text-center text-brand-500">
          Digital gift cards coming soon. Sign up for our newsletter to be notified.
        </p>
      </div>
    </PageContainer>
  );
}
