"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { SPACES } from "@/data/spaces";
import { CONTACT_PHONE } from "@/lib/site";

const LINKS = [
  { href: "/shop", label: "Shop All" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // document.body is unavailable during SSR, so the portal target can only
    // be used once mounted on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted) return null;

  // Rendered via portal so this fixed overlay is positioned against the
  // viewport rather than the header, whose backdrop-blur creates its own
  // containing block for fixed-position descendants.
  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 overflow-hidden lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-ink/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-ivory shadow-elevated transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <span className="font-display text-lg tracking-wide text-ink">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-5 py-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted">Shop by Space</p>
          <ul className="mb-6 grid grid-cols-2 gap-2">
            {SPACES.map((space) => (
              <li key={space.slug}>
                <Link
                  href={`/category/${space.slug}`}
                  onClick={onClose}
                  className="flex min-h-[48px] items-center rounded-sm border border-border px-3 text-sm text-ink"
                >
                  {space.name}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex flex-col divide-y divide-border border-y border-border">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex min-h-[52px] items-center text-[15px] font-medium text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border px-5 py-5 text-sm text-muted">
          <p>Need help choosing?</p>
          <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="mt-1 block font-medium text-ink">
            {CONTACT_PHONE}
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
