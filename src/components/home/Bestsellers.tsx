import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getFeaturedProducts } from "@/data/products";

export function Bestsellers() {
  const products = getFeaturedProducts();

  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Bestsellers" title="The pieces our customers return to" />
          <Link
            href="/shop"
            className="hidden shrink-0 text-xs font-medium uppercase tracking-[0.08em] text-ink underline decoration-border underline-offset-4 sm:block"
          >
            Shop all furniture
          </Link>
        </div>

        <ProductGrid products={products} className="mt-10" />

        <Link
          href="/shop"
          className="mt-10 block text-center text-xs font-medium uppercase tracking-[0.08em] text-ink underline decoration-border underline-offset-4 sm:hidden"
        >
          Shop all furniture
        </Link>
      </Container>
    </section>
  );
}
