"use client";

import { SORT_OPTIONS, type SortOption } from "@/lib/shop";

export function SortMenu({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink">
      <span className="hidden sm:inline text-muted">Sort by</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        className="h-11 min-w-0 border border-border bg-surface px-3 text-sm text-ink"
        aria-label="Sort products"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
