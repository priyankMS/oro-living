"use client";

import { cn } from "@/lib/utils";

export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 9,
  className,
}: {
  quantity: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex h-11 items-center border border-border", className)}>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className="flex h-11 w-11 items-center justify-center text-base text-ink transition-colors hover:bg-sand/60 disabled:text-muted"
      >
        &minus;
      </button>
      <span className="flex h-11 w-10 items-center justify-center text-sm font-medium" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="flex h-11 w-11 items-center justify-center text-base text-ink transition-colors hover:bg-sand/60 disabled:text-muted"
      >
        +
      </button>
    </div>
  );
}
