import type { Metadata } from "next";
import { CheckoutPageContent } from "./content";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order.",
};

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}
