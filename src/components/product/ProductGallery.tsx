"use client";

import { useState } from "react";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/data/types";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const activeImage = images[active];

  return (
    <div>
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto no-scrollbar lg:hidden">
        {images.map((image, index) => (
          <PlaceholderArt
            key={index}
            motif={image.motif}
            tone={image.tone}
            alt={image.alt}
            className="aspect-square w-[85%] shrink-0 snap-center rounded-md"
          />
        ))}
      </div>

      <div className="hidden gap-4 lg:grid lg:grid-cols-[88px_1fr]">
        <div className="flex flex-col gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={active === index}
              className={cn(
                "overflow-hidden rounded-sm border-2 transition-colors",
                active === index ? "border-ink" : "border-transparent",
              )}
            >
              <PlaceholderArt motif={image.motif} tone={image.tone} alt={image.alt} className="aspect-square" />
            </button>
          ))}
        </div>
        <PlaceholderArt
          motif={activeImage.motif}
          tone={activeImage.tone}
          alt={activeImage.alt}
          className="aspect-square rounded-md"
        />
      </div>
    </div>
  );
}
