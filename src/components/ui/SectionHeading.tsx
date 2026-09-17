import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-xs font-medium uppercase tracking-[0.18em]",
            tone === "dark" ? "text-brand-dark" : "text-cream",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-balance font-display text-[28px] font-medium leading-[1.15] sm:text-[34px] lg:text-[40px]",
          tone === "dark" ? "text-ink" : "text-ivory",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-balance text-[15px] leading-relaxed sm:text-base",
            tone === "dark" ? "text-muted" : "text-ivory/75",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
