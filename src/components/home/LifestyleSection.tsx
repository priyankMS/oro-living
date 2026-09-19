import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MediaArt } from "@/components/ui/MediaArt";

export function LifestyleSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 grid grid-cols-2 gap-3 sm:gap-4 lg:order-1">
          <MediaArt
            src="/images/products/tanaya-daybed/1.jpg"
            motif="daybed"
            tone="olive"
            alt="A rooftop transformed with OROLiving furniture"
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="aspect-[3/4] rounded-md"
          />
          <MediaArt
            src="/images/lifestyle/planter.jpg"
            motif="planter"
            tone="cream"
            alt="Layered planters styled on a terrace"
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="mt-8 aspect-[3/4] rounded-md sm:mt-10"
          />
        </div>

        <div className="order-1 max-w-lg lg:order-2">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-brand-dark">
            Make Space for Living
          </p>
          <h2 className="text-balance font-display text-[28px] font-medium leading-[1.15] text-ink sm:text-[34px] lg:text-[40px]">
            Designed for slower mornings, long evenings, and everything in between.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted sm:text-base">
            OROLiving furniture is built to disappear into the background of your day — there
            when you need a place to sit, sturdy enough to leave outside, and considered enough
            to be the first thing people notice when they step onto your balcony, terrace or
            garden.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/collections" variant="primary" size="lg">
              Explore the Collections
            </Button>
            <Button href="/about" variant="secondary" size="lg">
              Our Story
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
