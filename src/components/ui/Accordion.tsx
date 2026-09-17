"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: React.ReactNode;
}

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full min-h-[52px] items-center justify-between gap-4 py-4 text-left"
            >
              <span className="text-[15px] font-medium text-ink">{item.question}</span>
              <span
                aria-hidden
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center text-lg text-brand-dark transition-transform duration-200",
                  isOpen && "rotate-45",
                )}
              >
                +
              </span>
            </button>
            <div className={cn("grid transition-all duration-200 ease-out", isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden">
                <div className="max-w-2xl text-sm leading-relaxed text-muted">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
