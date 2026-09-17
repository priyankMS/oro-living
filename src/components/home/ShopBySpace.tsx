import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { SPACES } from "@/data/spaces";

export function ShopBySpace() {
  return (
    <section id="shop-by-space" className="py-16 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Shop by Space"
          title="Furniture for every open-air room"
          description="Each space asks for something different — from compact balcony seating to lounge sets built for a full rooftop."
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6">
          {SPACES.map((space) => (
            <Link
              key={space.slug}
              href={`/category/${space.slug}`}
              className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-md sm:aspect-[3/4]"
            >
              <PlaceholderArt
                motif={space.motif}
                tone={space.tone}
                alt={`${space.name} furniture setting`}
                className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" />
              <div className="relative flex items-center justify-between gap-2 p-4 sm:p-5">
                <div>
                  <h3 className="font-display text-lg text-ivory sm:text-xl">{space.name}</h3>
                  <p className="mt-0.5 hidden text-xs text-ivory/75 sm:block">{space.tagline}</p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ivory/90 text-ink transition-transform duration-200 group-hover:translate-x-0.5">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
