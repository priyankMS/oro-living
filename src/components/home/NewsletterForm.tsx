"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  if (status === "submitted") {
    return (
      <p role="status" className={cn("max-w-sm text-sm text-cream", className)}>
        Thanks for subscribing — look out for OROLiving in your inbox.
      </p>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!email) return;
        setStatus("submitted");
        setEmail("");
      }}
      className={cn("flex max-w-sm items-stretch gap-2", className)}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email address"
        className="h-12 flex-1 min-w-0 border border-ivory/25 bg-transparent px-4 text-sm text-ivory placeholder:text-ivory/50 focus:border-cream"
      />
      <button
        type="submit"
        className="h-12 shrink-0 bg-cream px-5 text-xs font-medium uppercase tracking-[0.08em] text-ink transition-colors hover:bg-cream-dark"
      >
        Subscribe
      </button>
    </form>
  );
}
