import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-50">
        <Heart className="h-8 w-8 text-brand-400" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">Your wishlist is empty</h2>
      <p className="mt-2 max-w-sm text-sm text-brand-500">
        Save your favorite items to your wishlist and come back to them anytime.
      </p>
      <Button asChild variant="black" size="lg" className="mt-8 uppercase tracking-widest">
        <Link href="/products">Browse Products</Link>
      </Button>
    </div>
  );
}
