import { cn } from "@/lib/utils";
import type { PlaceholderMotif, PlaceholderTone } from "@/data/types";

const TONE_STYLES: Record<PlaceholderTone, { bg: string; line: string; grain: string }> = {
  olive: {
    bg: "linear-gradient(150deg, #838a67 0%, #6b7154 55%, #565b41 100%)",
    line: "rgba(251, 248, 242, 0.85)",
    grain: "rgba(251, 248, 242, 0.08)",
  },
  charcoal: {
    bg: "linear-gradient(150deg, #565a49 0%, #454738 55%, #302f27 100%)",
    line: "rgba(252, 227, 197, 0.75)",
    grain: "rgba(252, 227, 197, 0.06)",
  },
  cream: {
    bg: "linear-gradient(150deg, #fef0dc 0%, #fce3c5 55%, #f2cd9e 100%)",
    line: "rgba(75, 77, 65, 0.65)",
    grain: "rgba(75, 77, 65, 0.06)",
  },
  sand: {
    bg: "linear-gradient(150deg, #f3eddd 0%, #eae2ce 55%, #ded2b4 100%)",
    line: "rgba(75, 77, 65, 0.6)",
    grain: "rgba(75, 77, 65, 0.06)",
  },
};

const MOTIFS: Record<PlaceholderMotif, string> = {
  "lounge-chair":
    "M20 62h56M28 62V44a8 8 0 0 1 8-8h24a8 8 0 0 1 8 8v18M24 62l-2 14M76 62l2 14M32 36V24a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v12",
  sofa: "M14 68h72M20 68V46a6 6 0 0 1 6-6h48a6 6 0 0 1 6 6v22M14 68v10M86 68v10M26 40V30a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v10M20 52h60",
  "dining-set":
    "M18 30h28M32 30v34M22 40h20M50 74h40M58 52V38a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v14M58 52h28M62 52v22M84 52v22",
  "coffee-table": "M20 40h60l-8 32H28l-8-32ZM30 40l6 32M70 40l-6 32M22 40h56",
  daybed:
    "M12 70h76M18 70V48a6 6 0 0 1 6-6h56a6 6 0 0 1 6 6v22M12 70v8M88 70v8M26 42V34a3 3 0 0 1 3-3h42a3 3 0 0 1 3 3v8M18 58h64",
  umbrella:
    "M50 14c18 0 32 14 32 26H18c0-12 14-26 32-26ZM50 14V78M50 78a6 6 0 0 0 12 0M40 78h-4",
  "side-table": "M32 30h36l-6 40H38l-6-40ZM38 30l4 40M62 30l-4 40",
  bench: "M16 52h68M22 52V38a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v14M16 52v20M84 52v20",
  armchair:
    "M28 66h44M34 66V48a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v18M22 66l3-24a5 5 0 0 1 5-4M78 66l-3-24a5 5 0 0 1-5-4M38 42V28a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v14",
  swing:
    "M22 10 40 76M78 10 60 76M28 40h44M40 76h20M60 76h20M20 76h20",
  planter: "M28 32h44l-6 40a4 4 0 0 1-4 4H38a4 4 0 0 1-4-4l-6-40ZM24 32h52",
  rug: "M14 26h72v48H14zM24 36h52M24 48h52M24 60h52M24 26v48M76 26v48",
};

interface PlaceholderArtProps {
  motif: PlaceholderMotif;
  tone: PlaceholderTone;
  alt: string;
  className?: string;
  priority?: boolean;
  showIcon?: boolean;
}

export function PlaceholderArt({ motif, tone, alt, className, showIcon = true }: PlaceholderArtProps) {
  const style = TONE_STYLES[tone];
  const path = MOTIFS[motif];

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("relative isolate flex items-center justify-center overflow-hidden", className)}
      style={{ background: style.bg }}
    >
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.5] mix-blend-overlay"
        preserveAspectRatio="none"
      >
        <filter id={`grain-${tone}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${tone})`} fill={style.grain} />
      </svg>
      {showIcon && (
        <svg
          viewBox="0 0 100 90"
          className="relative h-[46%] w-[46%] min-h-[64px] min-w-[64px]"
          aria-hidden
        >
          <path
            d={path}
            fill="none"
            stroke={style.line}
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
