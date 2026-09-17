import { StarRating } from "@/components/ui/StarRating";
import type { Product } from "@/data/types";

export function ProductReviews({ product }: { product: Product }) {
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-2xl text-ink">Customer Reviews</h2>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
      </div>

      {product.reviews.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          No reviews yet for this product. Be the first to share your experience after your order
          arrives.
        </p>
      ) : (
        <ul className="mt-8 flex flex-col gap-8">
          {product.reviews.map((review) => (
            <li key={review.id} className="border-b border-border pb-8 last:border-0">
              <StarRating rating={review.rating} />
              <p className="mt-3 text-[15px] font-medium text-ink">{review.title}</p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{review.body}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.08em] text-muted">
                {review.author} &middot;{" "}
                {new Date(review.date).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
