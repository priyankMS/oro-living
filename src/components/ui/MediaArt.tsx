import Image from "next/image";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { cn } from "@/lib/utils";
import type { PlaceholderMotif, PlaceholderTone } from "@/data/types";

interface MediaArtProps {
  src?: string;
  motif: PlaceholderMotif;
  tone: PlaceholderTone;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/** Renders a real photo when `src` is available, falling back to the illustrated placeholder otherwise. */
export function MediaArt({ src, motif, tone, alt, className, sizes, priority }: MediaArtProps) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "100vw"}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return <PlaceholderArt motif={motif} tone={tone} alt={alt} className={className} />;
}
