"use client";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { useWishlist } from "@/context/WishlistContext";
import { PRODUCTS } from "@/data/products";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const products = PRODUCTS.filter((product) => ids.includes(product.id));

  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} className="mb-6" />
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Your Wishlist</h1>

      {products.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          description="Save pieces you're considering so they're easy to find later."
          actionLabel="Shop All Furniture"
          actionHref="/shop"
        />
      ) : (
        <ProductGrid products={products} className="mt-8" />
      )}
    </Container>
  );
}
