"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SPACES } from "@/data/spaces";
import { useWishlist } from "@/context/WishlistContext";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function IconLink({
  href,
  label,
  count,
  children,
}: {
  href: string;
  label: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative flex h-11 w-11 items-center justify-center text-ink"
    >
      {children}
      {!!count && (
        <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-dark px-1 text-[10px] font-semibold text-ivory">
          {count}
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [spacesOpen, setSpacesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const { count: wishlistCount } = useWishlist();

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-ivory/95 backdrop-blur transition-shadow duration-200",
        scrolled && "shadow-header",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-12">
        <Link href="/" className="flex items-center" aria-label="OROLiving home">
          <Image src="/logo.svg" alt="OROLiving" width={160} height={120} className="h-12 w-auto lg:h-16" priority />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          <div
            className="group relative"
            onMouseEnter={() => setSpacesOpen(true)}
            onMouseLeave={() => setSpacesOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-[13px] font-medium uppercase tracking-[0.06em] text-ink"
              aria-expanded={spacesOpen}
            >
              Shop by Space
              <svg viewBox="0 0 12 8" className="h-2 w-2.5" fill="none" stroke="currentColor" strokeWidth={1.4}>
                <path d="M1 1l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              className={cn(
                "absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-4 transition-all duration-150",
                spacesOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <div className="grid grid-cols-3 gap-1 rounded-md border border-border bg-surface p-4 shadow-elevated">
                {SPACES.map((space) => (
                  <Link
                    key={space.slug}
                    href={`/category/${space.slug}`}
                    className="rounded-sm p-3 transition-colors hover:bg-sand/50"
                  >
                    <span className="block text-sm font-medium text-ink">{space.name}</span>
                    <span className="mt-0.5 block text-xs text-muted">{space.tagline}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium uppercase tracking-[0.06em] text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <IconLink href="/search" label="Search">
            <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
          </IconLink>
          <IconLink href="/wishlist" label="Wishlist" count={wishlistCount}>
            <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path d="M12 20s-7.2-4.5-9.8-9.1C.6 7.7 1.9 4 5.4 3.4c2-.4 3.9.6 5 2.2 1.1-1.6 3-2.6 5-2.2 3.5.6 4.8 4.3 3.2 7.5C19.2 15.5 12 20 12 20Z" />
            </svg>
          </IconLink>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center text-ink lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
