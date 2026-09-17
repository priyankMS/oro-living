"use client";

import { useState } from "react";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Accordion } from "@/components/ui/Accordion";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/data/types";

const AVAILABILITY_LABEL: Record<Product["availability"], string> = {
  "in-stock": "In stock, ships in 5–7 days",
  "made-to-order": "Made to order, ships in 3–5 weeks",
  "out-of-stock": "Currently out of stock",
};

export function ProductInfo({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const [added, setAdded] = useState(false);
  const isWishlisted = has(product.id);
  const inStock = product.availability !== "out-of-stock";

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  function handleAddToCart() {
    addItem(product, { color, quantity });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        {product.badge && <Badge tone={product.badge === "New" ? "olive" : "charcoal"}>{product.badge}</Badge>}
        {discount && <Badge tone="cream">{discount}% Off</Badge>}
      </div>

      <h1 className="mt-3 font-display text-[28px] leading-tight text-ink sm:text-[34px]">{product.name}</h1>
      <p className="mt-1 text-sm uppercase tracking-[0.08em] text-muted">{product.productType}</p>

      <div className="mt-3">
        <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
      </div>

      <div className="mt-5 flex items-baseline gap-3">
        <span className="font-display text-2xl text-ink">{formatPrice(product.price)}</span>
        {product.compareAtPrice && (
          <span className="text-sm text-muted line-through">{formatPrice(product.compareAtPrice)}</span>
        )}
      </div>

      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">{product.shortDescription}</p>

      {product.weatherAttributes.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {product.weatherAttributes.map((attribute) => (
            <li key={attribute}>
              <Badge tone="outline">{attribute}</Badge>
            </li>
          ))}
        </ul>
      )}

      {product.colors.length > 0 && (
        <div className="mt-7">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-ink">
            Colour: <span className="font-normal text-muted">{color}</span>
          </p>
          <div className="mt-3 flex gap-2.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setColor(c.name)}
                aria-label={c.name}
                aria-pressed={color === c.name}
                className={cn(
                  "h-9 w-9 rounded-full border-2 transition-transform",
                  color === c.name ? "border-ink scale-105" : "border-transparent",
                )}
                style={{ backgroundColor: c.hex }}
              >
                <span
                  className="block h-full w-full rounded-full ring-1 ring-inset ring-ink/10"
                  aria-hidden
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-7 flex items-center gap-3">
        <QuantitySelector quantity={quantity} onChange={setQuantity} />
        <span className="text-xs text-muted">{AVAILABILITY_LABEL[product.availability]}</span>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          variant="primary"
          size="lg"
          className="flex-1"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          {added ? "Added to Cart" : inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => toggle(product.id)}
          aria-pressed={isWishlisted}
        >
          {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
        </Button>
      </div>

      <div className="mt-10">
        <Accordion
          items={[
            {
              question: "Materials & Dimensions",
              answer: (
                <div className="flex flex-col gap-1.5">
                  <p>Frame: {product.frameMaterial}</p>
                  {product.cushionMaterial && <p>Cushion: {product.cushionMaterial}</p>}
                  <p>
                    Dimensions: {product.dimensions.width} x {product.dimensions.depth} x{" "}
                    {product.dimensions.height} cm
                    {product.dimensions.seatHeight ? ` (seat height ${product.dimensions.seatHeight}cm)` : ""}
                  </p>
                </div>
              ),
            },
            {
              question: "Care Instructions",
              answer: (
                <ul className="flex list-disc flex-col gap-1.5 pl-4">
                  {product.careInstructions.map((instruction) => (
                    <li key={instruction}>{instruction}</li>
                  ))}
                </ul>
              ),
            },
            {
              question: "Shipping & Returns",
              answer:
                "Standard delivery in 5–7 business days for in-stock items. Made-to-order pieces ship in 3–5 weeks. Returns accepted within 14 days of delivery on unused items — see our Returns page for full details.",
            },
          ]}
        />
      </div>
    </div>
  );
}
