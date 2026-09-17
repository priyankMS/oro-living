"use client";

import { SPACES } from "@/data/spaces";
import { formatPrice } from "@/lib/utils";
import type { ShopFilters } from "@/lib/shop";

const AVAILABILITY_LABELS: Record<string, string> = {
  "in-stock": "In Stock",
  "made-to-order": "Made to Order",
  "out-of-stock": "Out of Stock",
};

interface FiltersProps {
  filters: ShopFilters;
  onChange: (next: ShopFilters) => void;
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

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border py-6 first:pt-0 last:border-0">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.1em] text-ink">{title}</p>
      {children}
    </div>
  );
}

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex min-h-[36px] cursor-pointer items-center gap-3 text-sm text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded-[3px] border-border text-brand-dark accent-brand-dark"
      />
      {label}
    </label>
  );
}

export function Filters({ filters, onChange, facets, showSpaceFilter = true }: FiltersProps) {
  return (
    <div>
      {showSpaceFilter && (
        <FilterGroup title="Space">
          {SPACES.map((space) => (
            <CheckboxRow
              key={space.slug}
              label={space.name}
              checked={filters.spaces.includes(space.slug)}
              onChange={() => onChange({ ...filters, spaces: toggle(filters.spaces, space.slug) })}
            />
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="Product Type">
        {facets.types.map((type) => (
          <CheckboxRow
            key={type}
            label={type}
            checked={filters.types.includes(type)}
            onChange={() => onChange({ ...filters, types: toggle(filters.types, type) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Material">
        {facets.materials.map((material) => (
          <CheckboxRow
            key={material}
            label={material}
            checked={filters.materials.includes(material)}
            onChange={() => onChange({ ...filters, materials: toggle(filters.materials, material) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Colour">
        {facets.colors.map((color) => (
          <CheckboxRow
            key={color}
            label={color}
            checked={filters.colors.includes(color)}
            onChange={() => onChange({ ...filters, colors: toggle(filters.colors, color) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        <div className="flex items-center gap-3 text-sm text-muted">
          <input
            type="number"
            inputMode="numeric"
            placeholder={formatPrice(facets.minPrice)}
            value={filters.minPrice ?? ""}
            onChange={(event) =>
              onChange({ ...filters, minPrice: event.target.value ? Number(event.target.value) : undefined })
            }
            className="h-10 w-full min-w-0 border border-border px-3 text-ink"
            aria-label="Minimum price"
          />
          <span aria-hidden>&ndash;</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder={formatPrice(facets.maxPrice)}
            value={filters.maxPrice ?? ""}
            onChange={(event) =>
              onChange({ ...filters, maxPrice: event.target.value ? Number(event.target.value) : undefined })
            }
            className="h-10 w-full min-w-0 border border-border px-3 text-ink"
            aria-label="Maximum price"
          />
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        {facets.availability.map((value) => (
          <CheckboxRow
            key={value}
            label={AVAILABILITY_LABELS[value] ?? value}
            checked={filters.availability.includes(value)}
            onChange={() => onChange({ ...filters, availability: toggle(filters.availability, value) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Rating">
        {[4, 3].map((rating) => (
          <label key={rating} className="flex min-h-[36px] cursor-pointer items-center gap-3 text-sm text-ink">
            <input
              type="radio"
              name="min-rating"
              checked={filters.minRating === rating}
              onChange={() => onChange({ ...filters, minRating: rating })}
              className="h-4 w-4 border-border accent-brand-dark"
            />
            {rating}+ stars
          </label>
        ))}
        <label className="flex min-h-[36px] cursor-pointer items-center gap-3 text-sm text-ink">
          <input
            type="radio"
            name="min-rating"
            checked={!filters.minRating}
            onChange={() => onChange({ ...filters, minRating: undefined })}
            className="h-4 w-4 border-border accent-brand-dark"
          />
          Any rating
        </label>
      </FilterGroup>
    </div>
  );
}
