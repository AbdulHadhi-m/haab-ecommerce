import type { Metadata } from "next";
import { AddressPageContent } from "./content";

export const metadata: Metadata = {
  title: "Addresses",
  description: "Manage your shipping addresses.",
};

export default function AddressPage() {
  return <AddressPageContent />;
}
