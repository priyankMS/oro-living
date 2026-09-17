"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { PRODUCTS } from "@/data/products";
import { SPACES } from "@/data/spaces";
import { COLLECTIONS } from "@/data/collections";

const POPULAR_SEARCHES = ["Lounge chair", "Dining set", "Balcony", "Daybed", "Outdoor sofa"];
const RECENT_STORAGE_KEY = "oroliving-recent-searches";

function useRecentSearches() {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(RECENT_STORAGE_KEY);
      // localStorage is unavailable during SSR, so this can only be read post-mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setRecent(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  function add(term: string) {
    setRecent((prev) => {
      const next = [term, ...prev.filter((item) => item.toLowerCase() !== term.toLowerCase())].slice(0, 6);
      try {
        window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  return { recent, add };
}

export function SearchView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);
  const { recent, add } = useRecentSearches();

  if (initialQuery !== prevInitialQuery) {
    setPrevInitialQuery(initialQuery);
    setQuery(initialQuery);
  }

  const normalized = query.trim().toLowerCase();

  const productResults = useMemo(() => {
    if (!normalized) return [];
    return PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(normalized) ||
        product.productType.toLowerCase().includes(normalized) ||
        product.spaces.some((space) => space.includes(normalized)),
    );
  }, [normalized]);

  const spaceResults = useMemo(() => {
    if (!normalized) return [];
    return SPACES.filter((space) => space.name.toLowerCase().includes(normalized));
  }, [normalized]);

  const collectionResults = useMemo(() => {
    if (!normalized) return [];
    return COLLECTIONS.filter((collection) => collection.name.toLowerCase().includes(normalized));
  }, [normalized]);

  function handleSubmit(term: string) {
    const trimmed = term.trim();
    if (!trimmed) return;
    add(trimmed);
    router.replace(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(query);
        }}
        className="relative"
      >
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products, spaces or collections"
          autoFocus
          className="h-14 w-full border-b-2 border-ink bg-transparent pr-12 text-lg text-ink placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ink"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
        </button>
      </form>

      {!normalized ? (
        <div className="mt-10 flex flex-col gap-8">
          {recent.length > 0 && (
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-muted">Recent Searches</p>
              <div className="flex flex-wrap gap-2">
                {recent.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleSubmit(term)}
                    className="rounded-full border border-border px-4 py-2 text-sm text-ink"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-muted">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleSubmit(term)}
                  className="rounded-full border border-border px-4 py-2 text-sm text-ink"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10">
          {productResults.length === 0 && spaceResults.length === 0 && collectionResults.length === 0 ? (
            <div className="flex flex-col items-center gap-6 py-16 text-center">
              <h2 className="font-display text-2xl text-ink">
                We couldn&rsquo;t find what you&rsquo;re looking for.
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                <Button href="/category/balcony" variant="secondary">
                  Browse Balcony Furniture
                </Button>
                <Button href="/category/garden" variant="secondary">
                  Browse Garden Furniture
                </Button>
                <Button href="/collections" variant="secondary">
                  Explore Collections
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              {(spaceResults.length > 0 || collectionResults.length > 0) && (
                <div className="flex flex-wrap gap-2">
                  {spaceResults.map((space) => (
                    <Link
                      key={space.slug}
                      href={`/category/${space.slug}`}
                      className="rounded-full bg-sand px-4 py-2 text-sm text-ink"
                    >
                      {space.name} Furniture
                    </Link>
                  ))}
                  {collectionResults.map((collection) => (
                    <Link
                      key={collection.slug}
                      href={`/shop?collection=${collection.slug}`}
                      className="rounded-full bg-sand px-4 py-2 text-sm text-ink"
                    >
                      {collection.name}
                    </Link>
                  ))}
                </div>
              )}
              <ProductGrid products={productResults} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
