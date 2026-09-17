export type PlaceholderTone = "olive" | "charcoal" | "cream" | "sand";

export type PlaceholderMotif =
  | "lounge-chair"
  | "sofa"
  | "dining-set"
  | "coffee-table"
  | "daybed"
  | "umbrella"
  | "side-table"
  | "bench"
  | "armchair"
  | "swing"
  | "planter"
  | "rug";

export interface ProductImage {
  motif: PlaceholderMotif;
  tone: PlaceholderTone;
  alt: string;
}

export interface Space {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  motif: PlaceholderMotif;
  tone: PlaceholderTone;
}

export interface Collection {
  slug: string;
  name: string;
  description: string;
  motif: PlaceholderMotif;
  tone: PlaceholderTone;
  spaces: string[];
}

export type Availability = "in-stock" | "made-to-order" | "out-of-stock";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductDimensions {
  width: number;
  depth: number;
  height: number;
  seatHeight?: number;
  unit: "cm";
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  productType: string;
  spaces: string[];
  collections: string[];
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  material: string;
  frameMaterial: string;
  cushionMaterial?: string;
  colors: ProductColor[];
  dimensions: ProductDimensions;
  weatherAttributes: string[];
  careInstructions: string[];
  availability: Availability;
  rating: number;
  reviewCount: number;
  badge?: "New" | "Bestseller" | "Limited Edition";
  featured?: boolean;
  reviews: Review[];
}
