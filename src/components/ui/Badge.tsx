import { cn } from "@/lib/utils";

type Tone = "cream" | "olive" | "charcoal" | "outline";

const TONE_CLASSES: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  olive: "bg-brand text-ivory",
  charcoal: "bg-charcoal text-ivory",
  outline: "border border-border text-ink bg-surface/80",
};

export function Badge({
  tone = "cream",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em]",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
