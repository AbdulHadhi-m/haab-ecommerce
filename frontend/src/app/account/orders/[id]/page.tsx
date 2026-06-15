import type { Metadata } from "next";
import { OrderDetailPageContent } from "./content";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: OrderDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    return { title: "Order Not Found" };
  }

  const json = await res.json();
  const order = json.data;
  const title = order?.orderNumber
    ? `Order ${order.orderNumber}`
    : "Order Details";

  return { title };
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  return <OrderDetailPageContent id={id} />;
}
