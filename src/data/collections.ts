import type { Collection } from "./types";

export const COLLECTIONS: Collection[] = [
  {
    slug: "balcony-edit",
    name: "The Balcony Edit",
    description:
      "Slim-profile seating and folding tables designed to fit spaces as narrow as 90cm without feeling cramped.",
    motif: "lounge-chair",
    tone: "cream",
    spaces: ["balcony"],
    src: "/images/products/kori-lounge-chair/2.jpg",
  },
  {
    slug: "garden-living",
    name: "Garden Living",
    description:
      "Rust-proof frames and all-weather weaves built to stay outdoors through every season.",
    motif: "bench",
    tone: "olive",
    spaces: ["garden"],
    src: "/images/collections/garden-living.jpg",
  },
  {
    slug: "terrace-collection",
    name: "Terrace Collection",
    description:
      "Modular lounge seating that adapts to rooftop and elevated terrace layouts of any shape.",
    motif: "sofa",
    tone: "sand",
    spaces: ["terrace", "rooftop"],
    src: "/images/products/avani-modular-sofa/1.jpg",
  },
  {
    slug: "outdoor-dining",
    name: "Outdoor Dining",
    description:
      "Tables and chairs made for long meals outside, from weekday breakfasts to weekend dinners.",
    motif: "dining-set",
    tone: "charcoal",
    spaces: ["patio", "garden", "terrace"],
    src: "/images/collections/outdoor-dining.jpg",
  },
  {
    slug: "lounge-collection",
    name: "Lounge Collection",
    description:
      "Deep-seated chairs and daybeds for slow mornings and longer evenings outdoors.",
    motif: "daybed",
    tone: "olive",
    spaces: ["patio", "rooftop", "veranda"],
    src: "/images/products/tanaya-daybed/3.jpg",
  },
  {
    slug: "weekend-retreat",
    name: "Weekend Retreat",
    description:
      "A relaxed edit of swing seats, side tables and planters for wherever you unwind on a Sunday.",
    motif: "swing",
    tone: "cream",
    spaces: ["veranda", "garden"],
    src: "/images/products/veda-swing-seat/1.jpg",
  },
];

export function getCollectionBySlug(slug: string) {
  return COLLECTIONS.find((collection) => collection.slug === slug);
}
