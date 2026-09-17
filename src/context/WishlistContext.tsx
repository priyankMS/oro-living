"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface WishlistContextValue {
  ids: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "oroliving-wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // localStorage is unavailable during SSR, so this can only be read post-mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setIds(JSON.parse(raw));
    } catch {
      // ignore corrupted or unavailable storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // ignore storage write failures
    }
  }, [ids, hydrated]);

  const toggle = useCallback((productId: string) => {
    setIds((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  }, []);

  const has = useCallback((productId: string) => ids.includes(productId), [ids]);

  const value = useMemo(
    () => ({ ids, toggle, has, count: ids.length }),
    [ids, toggle, has],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
}
