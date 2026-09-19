import { SITE_NAME, SITE_URL } from "./site";
import { isComingSoon } from "@/data/products";
import type { Product } from "@/data/types";
import type { Crumb } from "@/components/ui/Breadcrumbs";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon`,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${SITE_URL}${item.href}` : undefined,
    })),
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.id,
    url: `${SITE_URL}/product/${product.slug}`,
    material: product.material,
    offers: {
      "@type": "Offer",
      availability: isComingSoon(product)
        ? "https://schema.org/PreOrder"
        : product.availability === "in-stock"
          ? "https://schema.org/InStock"
          : product.availability === "made-to-order"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/product/${product.slug}`,
    },
    ...(product.reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
          review: product.reviews.map((review) => ({
            "@type": "Review",
            author: { "@type": "Person", name: review.author },
            datePublished: review.date,
            reviewBody: review.body,
            name: review.title,
            reviewRating: {
              "@type": "Rating",
              ratingValue: review.rating,
              bestRating: 5,
            },
          })),
        }
      : {}),
  };
}
