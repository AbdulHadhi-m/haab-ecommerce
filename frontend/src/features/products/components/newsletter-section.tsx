"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { PageContainer } from "@/shared/components/elements/page-container";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="bg-brand-900 py-20 sm:py-28">
      <PageContainer>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-400">
            Stay Connected
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Join the Movement
          </h2>
          <p className="mt-4 text-base text-brand-300">
            Be the first to know about new drops, exclusive offers, and early access to limited editions.
          </p>
          {submitted ? (
            <p className="mt-8 text-sm text-green-400">
              Thanks for subscribing! We&apos;ll be in touch.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 flex-1 border-brand-700 bg-brand-800 text-white placeholder:text-brand-500 focus:border-white"
                required
              />
              <Button type="submit" variant="white" size="lg" className="uppercase tracking-widest flex-shrink-0">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </PageContainer>
    </section>
  );
}
