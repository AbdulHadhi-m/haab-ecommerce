import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export function HeroBanner() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center bg-brand-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-brand-900 to-brand-800" />
      <div className="relative z-10 mx-auto max-w-9xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-brand-400">
          New Collection
        </p>
        <h1 className="text-7xl font-black tracking-tightest sm:text-8xl lg:text-10xl">
          MOVE WITH
          <br />
          PURPOSE
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-base text-brand-300 sm:text-lg">
          Engineered for the modern athlete. Lightweight, durable, and designed to perform when it matters most.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button asChild variant="white" size="lg" className="uppercase tracking-widest">
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="uppercase tracking-widest text-white hover:text-white hover:bg-white/10">
            <Link href="/products?featured=true">Explore</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
