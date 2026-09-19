"use client";

import { WishlistProvider } from "./WishlistContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <WishlistProvider>{children}</WishlistProvider>;
}
