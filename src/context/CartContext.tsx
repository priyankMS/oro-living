"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/data/types";

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: Product["images"][number];
  color?: string;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  addItem: (product: Product, options?: { color?: string; quantity?: number }) => void;
  removeItem: (productId: string, color?: string) => void;
  updateQuantity: (productId: string, color: string | undefined, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "oroliving-cart";

function lineKey(productId: string, color?: string) {
  return `${productId}::${color ?? "default"}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // localStorage is unavailable during SSR, so this can only be read post-mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupted or unavailable storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore storage write failures (private mode, quota, etc.)
    }
  }, [lines, hydrated]);

  const addItem = useCallback<CartContextValue["addItem"]>((product, options) => {
    const color = options?.color ?? product.colors[0]?.name;
    const quantity = options?.quantity ?? 1;

    setLines((prev) => {
      const key = lineKey(product.id, color);
      const existing = prev.find((line) => lineKey(line.productId, line.color) === key);
      if (existing) {
        return prev.map((line) =>
          lineKey(line.productId, line.color) === key
            ? { ...line, quantity: line.quantity + quantity }
            : line,
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.images[0],
          color,
          quantity,
        },
      ];
    });
  }, []);

  const removeItem = useCallback<CartContextValue["removeItem"]>((productId, color) => {
    setLines((prev) => prev.filter((line) => lineKey(line.productId, line.color) !== lineKey(productId, color)));
  }, []);

  const updateQuantity = useCallback<CartContextValue["updateQuantity"]>((productId, color, quantity) => {
    setLines((prev) =>
      prev
        .map((line) =>
          lineKey(line.productId, line.color) === lineKey(productId, color)
            ? { ...line, quantity: Math.max(1, quantity) }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { count, subtotal } = useMemo(
    () => ({
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: lines.reduce((sum, line) => sum + line.quantity * line.price, 0),
    }),
    [lines],
  );

  const value = useMemo(
    () => ({ lines, addItem, removeItem, updateQuantity, clear, count, subtotal }),
    [lines, addItem, removeItem, updateQuantity, clear, count, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
