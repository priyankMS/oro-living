import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "cream";
type Size = "md" | "lg" | "sm";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-ink text-ivory hover:bg-charcoal-dark active:bg-charcoal-dark disabled:bg-muted",
  secondary:
    "border border-ink text-ink bg-transparent hover:bg-ink hover:text-ivory disabled:border-muted disabled:text-muted",
  ghost: "text-ink hover:bg-sand/60 disabled:text-muted",
  cream:
    "bg-cream text-ink hover:bg-cream-dark disabled:bg-sand",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-[52px] px-8 text-sm",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  React.ComponentProps<typeof Link> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-sans text-[13px] font-medium uppercase tracking-[0.08em] transition-colors duration-200 ease-out disabled:cursor-not-allowed",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as React.ComponentProps<typeof Link>;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
