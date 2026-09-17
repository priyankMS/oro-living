import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
  className,
}: {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const stars = [0, 1, 2, 3, 4];
  const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5" aria-hidden>
        {stars.map((index) => {
          const fill = Math.max(0, Math.min(1, rating - index));
          return (
            <span key={index} className={cn("relative", starSize)}>
              <svg viewBox="0 0 20 20" className={cn("absolute inset-0", starSize)}>
                <path
                  d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6L1.3 7.7l6.1-.6L10 1.5z"
                  className="fill-sand-dark"
                />
              </svg>
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <svg viewBox="0 0 20 20" className={starSize}>
                  <path
                    d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6L1.3 7.7l6.1-.6L10 1.5z"
                    className="fill-brand"
                  />
                </svg>
              </span>
            </span>
          );
        })}
      </div>
      <span className="sr-only">{rating.toFixed(1)} out of 5 stars</span>
      {typeof reviewCount === "number" && (
        <span className="text-xs text-muted">
          {rating.toFixed(1)} {reviewCount > 0 && `(${reviewCount})`}
        </span>
      )}
    </div>
  );
}
