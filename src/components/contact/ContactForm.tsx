"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="border border-border p-8">
        <h2 className="font-display text-xl text-ink">Message sent</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Thanks for reaching out — our team typically replies within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-[0.08em] text-ink">
            Name
          </label>
          <input id="name" name="name" type="text" required className="h-12 w-full border border-border px-4 text-sm text-ink" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-[0.08em] text-ink">
            Email
          </label>
          <input id="email" name="email" type="email" required className="h-12 w-full border border-border px-4 text-sm text-ink" />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-xs font-medium uppercase tracking-[0.08em] text-ink">
          Subject
        </label>
        <input id="subject" name="subject" type="text" required className="h-12 w-full border border-border px-4 text-sm text-ink" />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-[0.08em] text-ink">
          Message
        </label>
        <textarea id="message" name="message" required rows={5} className="w-full border border-border p-4 text-sm text-ink" />
      </div>

      <Button type="submit" variant="primary" size="lg" className="self-start">
        Send Message
      </Button>
    </form>
  );
}
