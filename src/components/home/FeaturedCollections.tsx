import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaArt } from "@/components/ui/MediaArt";
import { COLLECTIONS } from "@/data/collections";

export function FeaturedCollections() {
  const featured = COLLECTIONS.slice(0, 3);

  return (
    <section className="bg-sand/50 py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Featured Collections"
            title="Editorial edits for outdoor living"
            description="Curated stories, not just categories — pieces that work together in a single space."
          />
          <Link
            href="/collections"
            className="hidden shrink-0 text-xs font-medium uppercase tracking-[0.08em] text-ink underline decoration-border underline-offset-4 sm:block"
          >
            View all collections
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {featured.map((collection, index) => (
            <Link
              key={collection.slug}
              href={`/shop?collection=${collection.slug}`}
              className={`group relative flex overflow-hidden rounded-md ${
                index === 0 ? "aspect-[4/5] sm:col-span-2 sm:row-span-2 sm:aspect-auto" : "aspect-[4/5]"
              }`}
            >
              <MediaArt
                src={collection.src}
                motif={collection.motif}
                tone={collection.tone}
                alt={collection.name}
                sizes="(min-width: 640px) 33vw, 100vw"
                className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
              <div className="relative mt-auto flex w-full flex-col gap-1 p-5">
                <h3 className="font-display text-xl text-ivory sm:text-2xl">{collection.name}</h3>
                <p className="max-w-xs text-sm text-ivory/80">{collection.description}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.08em] text-cream">
                  Shop the edit
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/collections"
          className="mt-8 block text-center text-xs font-medium uppercase tracking-[0.08em] text-ink underline decoration-border underline-offset-4 sm:hidden"
        >
          View all collections
        </Link>
      </Container>
    </section>
  );
}
