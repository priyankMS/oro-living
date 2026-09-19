import type { Product } from "@/data/types";

export type SortOption = "featured" | "newest" | "price-asc" | "price-desc" | "popular";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most Popular" },
];

export interface ShopFilters {
  spaces: string[];
  types: string[];
  materials: string[];
  colors: string[];
  availability: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

export const EMPTY_FILTERS: ShopFilters = {
  spaces: [],
  types: [],
  materials: [],
  colors: [],
  availability: [],
};

const MATERIAL_FAMILIES = [
  "Aluminium",
  "Teak",
  "Eucalyptus Wood",
  "Synthetic Rattan",
  "Steel",
  "Composite",
  "Polypropylene",
  "Polyresin",
] as const;

export function materialFamilies(product: Product): string[] {
  const haystack = `${product.material} ${product.frameMaterial}`.toLowerCase();
  return MATERIAL_FAMILIES.filter((family) => haystack.includes(family.toLowerCase()));
}

export function getFacets(products: Product[]) {
  const types = new Set<string>();
  const materials = new Set<string>();
  const colors = new Set<string>();
  const availability = new Set<Product["availability"]>();
  let minPrice = Infinity;
  let maxPrice = 0;

  for (const product of products) {
    types.add(product.productType);
    materialFamilies(product).forEach((m) => materials.add(m));
    product.colors.forEach((c) => colors.add(c.name));
    availability.add(product.availability);
    minPrice = Math.min(minPrice, product.price);
    maxPrice = Math.max(maxPrice, product.price);
  }

  return {
    types: Array.from(types).sort(),
    materials: Array.from(materials).sort(),
    colors: Array.from(colors).sort(),
    availability: Array.from(availability),
    minPrice: minPrice === Infinity ? 0 : minPrice,
    maxPrice,
  };
}

export function filterProducts(products: Product[], filters: ShopFilters): Product[] {
  return products.filter((product) => {
    if (filters.spaces.length && !product.spaces.some((s) => filters.spaces.includes(s))) return false;
    if (filters.types.length && !filters.types.includes(product.productType)) return false;
    if (filters.materials.length) {
      const families = materialFamilies(product);
      if (!filters.materials.some((m) => families.includes(m))) return false;
    }
    if (filters.colors.length && !product.colors.some((c) => filters.colors.includes(c.name))) return false;
    if (filters.availability.length && !filters.availability.includes(product.availability)) return false;
    if (typeof filters.minPrice === "number" && product.price < filters.minPrice) return false;
    if (typeof filters.maxPrice === "number" && product.price > filters.maxPrice) return false;
    if (typeof filters.minRating === "number" && product.rating < filters.minRating) return false;
    return true;
  });
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "popular":
      return list.sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
    case "newest":
      return list.reverse();
    case "featured":
    default:
      return list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }
}
