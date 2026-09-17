"use client";

import Link from "next/link";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/data/types";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { has, toggle } = useWishlist();
  const { addItem } = useCart();
  const isWishlisted = has(product.id);
  const primaryImage = product.images[0];
  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  return (
    <div className={cn("group relative flex flex-col", className)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-sand">
        <Link href={`/product/${product.slug}`} className="block h-full w-full" tabIndex={-1}>
          <PlaceholderArt
            motif={primaryImage.motif}
            tone={primaryImage.tone}
            alt={primaryImage.alt}
            className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && <Badge tone={product.badge === "New" ? "olive" : "charcoal"}>{product.badge}</Badge>}
          {discount && <Badge tone="cream">{discount}% Off</Badge>}
        </div>

        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface/90 text-ink shadow-soft transition-transform duration-200 hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.6}>
            <path
              d="M12 20s-7.2-4.5-9.8-9.1C.6 7.7 1.9 4 5.4 3.4c2-.4 3.9.6 5 2.2 1.1-1.6 3-2.6 5-2.2 3.5.6 4.8 4.3 3.2 7.5C19.2 15.5 12 20 12 20Z"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => addItem(product)}
          className="absolute inset-x-3 bottom-3 hidden h-11 items-center justify-center rounded-sm bg-ink text-xs font-medium uppercase tracking-[0.08em] text-ivory transition-all duration-200 group-hover:flex hover:bg-charcoal-dark sm:flex sm:translate-y-14 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
        >
          Quick Add
        </button>
      </div>

      <Link href={`/product/${product.slug}`} className="mt-3.5 flex flex-1 flex-col gap-1">
        <p className="text-[11px] uppercase tracking-[0.08em] text-muted">{product.productType}</p>
        <h3 className="text-[15px] font-medium leading-snug text-ink">{product.name}</h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} className="mt-0.5" />
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-[15px] font-medium text-ink">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-xs text-muted line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>
      </Link>
    </div>
  );
}
