import { ProductCard } from "./ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Product } from "@/data/types";
import { cn } from "@/lib/utils";

export function ProductGrid({ products, className }: { products: Product[]; className?: string }) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="No products match these filters"
        description="Try widening your filters or explore another space."
        actionLabel="Browse all furniture"
        actionHref="/shop"
      />
    );
  }

  return (
    <div className={cn("grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4", className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
