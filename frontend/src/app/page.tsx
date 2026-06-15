import { PageContainer } from "@/shared/components/elements";
import { SITE } from "@/constants";

export default function HomePage() {
  return (
    <PageContainer as="main">
      <section className="flex min-h-[80vh] flex-col items-center justify-center text-center">
        <h1 className="text-8xl font-black tracking-tightest sm:text-10xl lg:text-11xl">
          {SITE.name}
        </h1>
        <p className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg">
          Premium sportswear and lifestyle apparel. Inspired by heritage, built for performance.
        </p>
      </section>
    </PageContainer>
  );
}
