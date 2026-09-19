import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MediaArt } from "@/components/ui/MediaArt";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: "OROLiving designs premium furniture for balconies, gardens, terraces and every open-air space.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    title: "Built for the outdoors, from the start",
    description:
      "We don't adapt indoor furniture for outdoor use. Every OROLiving piece is engineered around sun, rain and everyday outdoor wear from the first sketch.",
  },
  {
    title: "Materials that age well",
    description:
      "Powder-coated aluminium, marine-grade foam and FSC-sourced hardwood are chosen because of how they perform over years outdoors, not just how they photograph on day one.",
  },
  {
    title: "Fewer, better pieces",
    description:
      "We'd rather offer a considered range that fits real outdoor spaces than an endless catalogue. Each collection is designed to work together.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative">
        <MediaArt
          src="/images/about/hero.jpg"
          motif="daybed"
          tone="olive"
          alt="An OROLiving outdoor setting"
          sizes="100vw"
          priority
          className="aspect-[16/9] w-full sm:aspect-[21/9]"
        />
      </section>

      <Container className="py-10 lg:py-16">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} className="mb-6" />

        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-brand-dark">Our Story</p>
          <h1 className="font-display text-3xl text-ink sm:text-4xl lg:text-[42px]">
            Furniture for the outdoor rooms of everyday life.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-muted sm:text-base">
            OROLiving started with a simple observation: outdoor spaces in India — balconies,
            terraces, small gardens — were consistently underfurnished, treated as an
            afterthought rather than a room worth designing for. We set out to build furniture
            specifically for those spaces: scaled to fit them, engineered to survive in them, and
            designed to look like they belong.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">
            Every collection starts with the space it&apos;s built for, not the other way around.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 lg:mt-20">
          {VALUES.map((value) => (
            <div key={value.title}>
              <h2 className="font-display text-xl text-ink">{value.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-4 border-t border-border pt-12 lg:mt-20">
          <h2 className="font-display text-2xl text-ink">See it in your space</h2>
          <p className="max-w-lg text-sm leading-relaxed text-muted">
            Browse the full range or get in touch if you&apos;d like help planning furniture for a
            specific balcony, terrace or garden layout.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/shop" variant="primary">
              Shop All Furniture
            </Button>
            <Button href="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
