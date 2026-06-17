import type { Metadata } from "next";
import { PageContainer } from "@/shared/components/elements/page-container";
import { SectionHeader } from "@/shared/components/elements/section-header";
import { SITE } from "@/constants";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions about ${SITE.name} orders, shipping, returns, and more.`,
};

const faqs = [
  {
    q: "How do I place an order?",
    a: "Browse our collection, select your items and size, and proceed to checkout. You can pay using credit card, PayPal, or other available payment methods.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "Orders can be modified or cancelled within 1 hour of placement. Contact our customer service team as soon as possible with your order number.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 5-7 business days. Express shipping (2-3 business days) is available at checkout. International orders typically arrive within 7-14 business days.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 30 days of delivery. Items must be unworn with tags attached. See our Returns page for full details.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination.",
  },
  {
    q: "How do I find my size?",
    a: "Refer to our Size Guide page for detailed measurements and fit recommendations for each product category.",
  },
  {
    q: "Are your products true to size?",
    a: "Most of our products run true to size. For specific fit notes, check the product description or review the Size Guide.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order ships, you will receive a confirmation email with a tracking number. You can also track your order on our Track Order page.",
  },
];

export default function FAQPage() {
  return (
    <PageContainer as="main" className="py-16 sm:py-24">
      <SectionHeader title="FAQ" subtitle="Frequently asked questions" align="center" />
      <div className="mx-auto mt-12 max-w-3xl space-y-8">
        {faqs.map((faq) => (
          <div key={faq.q}>
            <h3 className="text-base font-semibold text-brand-900 sm:text-lg">{faq.q}</h3>
            <p className="mt-1 text-base leading-relaxed text-brand-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
