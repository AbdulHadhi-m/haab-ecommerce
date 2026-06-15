import type { Metadata } from "next";
import { WishlistPageContent } from "./content";

export const metadata: Metadata = {
  title: "My Wishlist",
  description: "View and manage your saved items.",
};

export default function WishlistPage() {
  return <WishlistPageContent />;
}
