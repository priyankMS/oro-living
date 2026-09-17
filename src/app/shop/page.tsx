import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ShopExperience } from "@/components/shop/ShopExperience";
import { PRODUCTS, getProductsByCollection } from "@/data/products";
import { getCollectionBySlug } from "@/data/collections";

export const metadata: Metadata = {
  title: "Shop All Outdoor Furniture",
  description:
    "Browse the full OROLiving range of outdoor furniture — lounge chairs, sofas, dining sets and more for balconies, gardens, terraces and rooftops.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string; type?: string }>;
}) {
  const params = await searchParams;
  const collection = params.collection ? getCollectionBySlug(params.collection) : undefined;
  const products = collection ? getProductsByCollection(collection.slug) : PRODUCTS;

  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          ...(collection ? [{ label: "Collections", href: "/collections" }] : []),
          { label: collection ? collection.name : "Shop All" },
        ]}
        className="mb-6"
      />

      <h1 className="font-display text-3xl text-ink sm:text-4xl">
        {collection ? collection.name : "Shop All Furniture"}
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
        {collection
          ? collection.description
          : "Every OROLiving piece, in one place — filter by space, material, colour and more to find the right fit."}
      </p>

      <div className="mt-8">
        <ShopExperience products={products} initialFilters={params.type ? { types: [params.type] } : undefined} />
      </div>
    </Container>
  );
}
