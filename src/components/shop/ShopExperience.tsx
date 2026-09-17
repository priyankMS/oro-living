"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Filters } from "./Filters";
import { FilterDrawer } from "./FilterDrawer";
import { SortMenu } from "./SortMenu";
import { EMPTY_FILTERS, filterProducts, getFacets, sortProducts, type ShopFilters, type SortOption } from "@/lib/shop";
import type { Product } from "@/data/types";

function activeFilterCount(filters: ShopFilters) {
  return (
    filters.spaces.length +
    filters.types.length +
    filters.materials.length +
    filters.colors.length +
    filters.availability.length +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0) +
    (filters.minRating ? 1 : 0)
  );
}

export function ShopExperience({
  products,
  showSpaceFilter = true,
  initialFilters,
}: {
  products: Product[];
  showSpaceFilter?: boolean;
  initialFilters?: Partial<ShopFilters>;
}) {
  const [filters, setFilters] = useState<ShopFilters>({ ...EMPTY_FILTERS, ...initialFilters });
  const [sort, setSort] = useState<SortOption>("featured");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const facets = useMemo(() => getFacets(products), [products]);
  const filtered = useMemo(() => filterProducts(products, filters), [products, filters]);
  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);
  const activeCount = activeFilterCount(filters);

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-5 flex items-center justify-between gap-3 border-b border-border bg-ivory/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex h-11 items-center gap-2 border border-border px-4 text-xs font-medium uppercase tracking-[0.08em] text-ink lg:hidden"
        >
          Filters
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-dark text-[10px] text-ivory">
              {activeCount}
            </span>
          )}
        </button>
        <p className="hidden text-sm text-muted lg:block">{sorted.length} products</p>
        <SortMenu value={sort} onChange={setSort} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:mt-8 lg:grid-cols-[240px_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          <Filters filters={filters} onChange={setFilters} facets={facets} showSpaceFilter={showSpaceFilter} />
        </aside>

        <div>
          <p className="mb-4 text-sm text-muted lg:hidden">{sorted.length} products</p>
          <ProductGrid products={sorted} />
        </div>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters({ ...EMPTY_FILTERS, ...initialFilters })}
        resultCount={sorted.length}
        facets={facets}
        showSpaceFilter={showSpaceFilter}
      />
    </div>
  );
}
