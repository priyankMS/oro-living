import type { Space } from "./types";

export const SPACES: Space[] = [
  {
    slug: "balcony",
    name: "Balcony",
    tagline: "Small footprint, full comfort",
    description:
      "Compact, considered pieces that turn a narrow balcony into a proper place to sit down with your coffee.",
    motif: "lounge-chair",
    tone: "olive",
  },
  {
    slug: "garden",
    name: "Garden",
    tagline: "Furniture that lives outdoors",
    description:
      "Durable, weather-ready furniture built for lawns, flower beds and long afternoons in the shade.",
    motif: "bench",
    tone: "sand",
  },
  {
    slug: "veranda",
    name: "Veranda",
    tagline: "Covered comfort, open air",
    description:
      "Relaxed seating and side tables suited to a shaded veranda where the outdoors meets the home.",
    motif: "swing",
    tone: "charcoal",
  },
  {
    slug: "terrace",
    name: "Terrace",
    tagline: "An extra room, above it all",
    description:
      "Lounge and dining pieces scaled for rooftop and elevated terraces, with a view worth sitting for.",
    motif: "sofa",
    tone: "olive",
  },
  {
    slug: "patio",
    name: "Patio",
    tagline: "Everyday outdoor living",
    description:
      "Dependable dining and lounge sets designed for the patio you actually use, every single day.",
    motif: "dining-set",
    tone: "sand",
  },
  {
    slug: "rooftop",
    name: "Rooftop",
    tagline: "Elevated, weatherproof, calm",
    description:
      "Sculptural, low-maintenance furniture engineered for sun, wind and the best seat in the city.",
    motif: "daybed",
    tone: "charcoal",
  },
];

export function getSpaceBySlug(slug: string) {
  return SPACES.find((space) => space.slug === slug);
}
