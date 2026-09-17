"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/data/types";

export function StickyAddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const inStock = product.availability !== "out-of-stock";

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-4 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur lg:hidden [padding-bottom:calc(0.75rem+env(safe-area-inset-bottom))]">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{product.name}</p>
        <p className="text-sm text-muted">{formatPrice(product.price)}</p>
      </div>
      <Button
        variant="primary"
        size="md"
        disabled={!inStock}
        onClick={() => {
          addItem(product);
          setAdded(true);
          window.setTimeout(() => setAdded(false), 1500);
        }}
      >
        {added ? "Added" : inStock ? "Add to Cart" : "Sold Out"}
      </Button>
    </div>
  );
}
