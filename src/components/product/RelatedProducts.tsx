import { ProductGrid } from "./ProductGrid";
import type { Product } from "@/data/types";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-2xl text-ink">You May Also Like</h2>
      <ProductGrid products={products} className="mt-8" />
    </div>
  );
}
