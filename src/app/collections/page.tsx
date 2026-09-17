import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { COLLECTIONS } from "@/data/collections";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Curated OROLiving collections — editorial edits of outdoor furniture built around how each space is actually used.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collections" }]} className="mb-6" />

      <h1 className="font-display text-3xl text-ink sm:text-4xl">Collections</h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
        Curated edits built around how a space is actually used, not just a product category.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((collection) => (
          <Link
            key={collection.slug}
            href={`/shop?collection=${collection.slug}`}
            className="group relative flex aspect-[4/5] overflow-hidden rounded-md"
          >
            <PlaceholderArt
              motif={collection.motif}
              tone={collection.tone}
              alt={collection.name}
              className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="relative mt-auto flex flex-col gap-1 p-5">
              <h2 className="font-display text-xl text-ivory">{collection.name}</h2>
              <p className="max-w-xs text-sm text-ivory/80">{collection.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
