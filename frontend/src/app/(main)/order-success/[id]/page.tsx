import type { Metadata } from "next";
import { OrderSuccessPageContent } from "./content";

interface OrderSuccessPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: OrderSuccessPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: "Order Successful",
    description: `Your order ${id} has been placed successfully.`,
  };
}

export default async function OrderSuccessPage({ params }: OrderSuccessPageProps) {
  const { id } = await params;
  return <OrderSuccessPageContent id={id} />;
}
