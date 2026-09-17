"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Filters } from "./Filters";
import type { ShopFilters } from "@/lib/shop";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: ShopFilters;
  onChange: (next: ShopFilters) => void;
  onClear: () => void;
  resultCount: number;
  facets: {
    types: string[];
    materials: string[];
    colors: string[];
    availability: string[];
    minPrice: number;
    maxPrice: number;
  };
  showSpaceFilter?: boolean;
}

export function FilterDrawer({
  open,
  onClose,
  filters,
  onChange,
  onClear,
  resultCount,
  facets,
  showSpaceFilter,
}: FilterDrawerProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={cn("fixed inset-0 z-50 overflow-hidden lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
      <div
        className={cn("absolute inset-0 bg-ink/40 transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-lg bg-ivory transition-transform duration-300 ease-out",
          open ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-lg text-ink">Filters</h2>
          <button type="button" onClick={onClose} aria-label="Close filters" className="flex h-11 w-11 items-center justify-center text-ink">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          <Filters filters={filters} onChange={onChange} facets={facets} showSpaceFilter={showSpaceFilter} />
        </div>

        <div className="flex shrink-0 items-center gap-3 border-t border-border p-5 [padding-bottom:calc(1.25rem+env(safe-area-inset-bottom))]">
          <button type="button" onClick={onClear} className="h-12 flex-1 border border-ink text-xs font-medium uppercase tracking-[0.08em] text-ink">
            Clear All
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-12 flex-[2] bg-ink text-xs font-medium uppercase tracking-[0.08em] text-ivory"
          >
            Show {resultCount} Results
          </button>
        </div>
      </div>
    </div>
  );
}
