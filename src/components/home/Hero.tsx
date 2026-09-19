import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/lounge-scene.jpg"
          alt="An OROLiving outdoor living setting, poolside at golden hour"
          fill
          priority
          sizes="100vw"
          className="animate-hero-ken-burns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/10" />
      </div>

      <Container className="relative flex min-h-[86svh] flex-col justify-end gap-8 py-16 sm:min-h-[92svh] lg:min-h-[88vh] lg:justify-center lg:py-24">
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-cream">
            Outdoor Furniture, Designed With Intention
          </p>
          <h1 className="text-balance font-display text-[40px] font-medium leading-[1.08] text-ivory sm:text-[56px] lg:text-[68px]">
            Live Beautifully Outdoors.
          </h1>
          <p className="mt-5 max-w-md text-balance text-[15px] leading-relaxed text-ivory/80 sm:text-base">
            Thoughtfully designed furniture for balconies, gardens, terraces and every open-air
            space you call your own.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/shop" variant="cream" size="lg">
              Shop Outdoor Furniture
            </Button>
            <Button
              href="/collections"
              variant="secondary"
              size="lg"
              className="border-ivory/70 text-ivory hover:bg-ivory hover:text-ink"
            >
              Explore Collections
            </Button>
          </div>
        </div>

        <div className="hidden gap-8 border-t border-ivory/20 pt-6 sm:flex">
          {[
            ["6", "Living spaces covered"],
            ["Weather-ready", "Materials, built to last"],
            ["Made to order", "On select collections"],
          ].map(([stat, label]) => (
            <div key={label}>
              <p className="font-display text-xl text-ivory">{stat}</p>
              <p className="mt-1 text-xs text-ivory/65">{label}</p>
            </div>
          ))}
        </div>
      </Container>

      <Link
        href="#shop-by-space"
        aria-label="Scroll to shop by space"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/70 lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.18em]">Discover</span>
        <span className="h-8 w-px bg-ivory/40" />
      </Link>
    </section>
  );
}
