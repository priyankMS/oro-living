"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { EmptyState } from "@/components/ui/EmptyState";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { lines, updateQuantity, removeItem, subtotal } = useCart();
  const [checkoutMessage, setCheckoutMessage] = useState(false);

  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} className="mb-6" />
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Your Cart</h1>

      {lines.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          description="Browse our range and add pieces you love."
          actionLabel="Shop All Furniture"
          actionHref="/shop"
        />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <ul className="flex flex-col divide-y divide-border border-y border-border">
            {lines.map((line) => (
              <li key={`${line.productId}-${line.color}`} className="flex gap-4 py-6">
                <Link href={`/product/${line.slug}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-sm sm:h-28 sm:w-28">
                  <PlaceholderArt motif={line.image.motif} tone={line.image.tone} alt={line.image.alt} className="h-full w-full" />
                </Link>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/product/${line.slug}`} className="text-[15px] font-medium text-ink">
                        {line.name}
                      </Link>
                      {line.color && <p className="mt-1 text-xs text-muted">Colour: {line.color}</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(line.productId, line.color)}
                      aria-label={`Remove ${line.name} from cart`}
                      className="text-xs uppercase tracking-[0.08em] text-muted underline underline-offset-2 hover:text-ink"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <QuantitySelector
                      quantity={line.quantity}
                      onChange={(next) => updateQuantity(line.productId, line.color, next)}
                    />
                    <span className="text-sm font-medium text-ink">{formatPrice(line.price * line.quantity)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="h-fit border border-border p-6">
            <h2 className="font-display text-lg text-ink">Order Summary</h2>
            <div className="mt-4 flex items-center justify-between text-sm text-muted">
              <span>Subtotal</span>
              <span className="text-ink">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-muted">Shipping and taxes calculated at checkout.</p>

            <Button
              variant="primary"
              size="lg"
              className="mt-6 w-full"
              onClick={() => setCheckoutMessage(true)}
            >
              Proceed to Checkout
            </Button>
            {checkoutMessage && (
              <p role="status" className="mt-3 text-xs text-muted">
                This is a demo storefront — checkout isn&rsquo;t connected to payment processing yet.
              </p>
            )}
            <Link href="/shop" className="mt-4 block text-center text-xs uppercase tracking-[0.08em] text-ink underline underline-offset-4">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </Container>
  );
}
