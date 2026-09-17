import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { ShopExperience } from "@/components/shop/ShopExperience";
import { SPACES, getSpaceBySlug } from "@/data/spaces";
import { getProductsBySpace } from "@/data/products";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return SPACES.map((space) => ({ slug: space.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const space = getSpaceBySlug(slug);
  if (!space) return {};

  const title = `${space.name} Furniture`;
  const description = `${space.description} Shop OROLiving ${space.name.toLowerCase()} furniture built for outdoor use.`;

  return {
    title,
    description,
    alternates: { canonical: `/category/${space.slug}` },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, url: `/category/${space.slug}` },
  };
}

const FAQS: Record<string, { question: string; answer: string }[]> = {
  balcony: [
    {
      question: "What size balcony do these pieces suit?",
      answer:
        "Our balcony range is designed for compact footprints starting from around 90cm in width, including slim lounge chairs, folding bistro sets and stackable side tables.",
    },
    {
      question: "Will the furniture survive direct sun and rain on an open balcony?",
      answer:
        "Yes — balcony pieces use UV-stabilised and weather-resistant materials such as powder-coated aluminium and quick-dry cushions, built for uncovered outdoor exposure.",
    },
  ],
  garden: [
    {
      question: "Is garden furniture safe to leave outside year-round?",
      answer:
        "Our garden collection uses rust-resistant frames and weather-ready hardwood or composite finishes designed to stay outdoors through every season.",
    },
  ],
  veranda: [
    {
      question: "What furniture works best for a covered veranda?",
      answer:
        "Swing seats, benches and lounge chairs with softer upholstery suit a covered veranda well, since they get partial protection from direct rain and sun.",
    },
  ],
  terrace: [
    {
      question: "Can the terrace collection handle wind at height?",
      answer:
        "Terrace and rooftop pieces use heavier aluminium and steel frames for added stability, and our cantilever umbrellas include a tilt lock for breezier days.",
    },
  ],
  patio: [
    {
      question: "What's the best dining set size for a patio?",
      answer:
        "Measure your patio's usable footprint first — our Solaya range is available in 4-seater and 6-seater configurations to match most patio dining areas.",
    },
  ],
  rooftop: [
    {
      question: "Do rooftop pieces need extra wind protection?",
      answer:
        "We recommend a filled or weighted umbrella base and securing lightweight accessories like planters in high-wind rooftop settings.",
    },
  ],
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const space = getSpaceBySlug(slug);
  if (!space) notFound();

  const products = getProductsBySpace(space.slug);
  const otherSpaces = SPACES.filter((s) => s.slug !== space.slug);
  const crumbs = [{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: space.name }];
  const faqs = FAQS[space.slug] ?? [];

  return (
    <Container className="py-8 lg:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />

      <Breadcrumbs items={crumbs} className="mb-6" />

      <h1 className="font-display text-3xl text-ink sm:text-4xl">{space.name} Furniture</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{space.description}</p>

      <div className="mt-8">
        <ShopExperience products={products} showSpaceFilter={false} />
      </div>

      {faqs.length > 0 && (
        <div className="mt-16 max-w-2xl border-t border-border pt-12 lg:mt-20">
          <h2 className="font-display text-2xl text-ink">{space.name} Furniture FAQs</h2>
          <Accordion className="mt-6" items={faqs} />
        </div>
      )}

      <div className="mt-14 border-t border-border pt-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.1em] text-muted">Explore Other Spaces</p>
        <div className="flex flex-wrap gap-2">
          {otherSpaces.map((other) => (
            <Link
              key={other.slug}
              href={`/category/${other.slug}`}
              className="rounded-sm border border-border px-4 py-2 text-sm text-ink transition-colors hover:bg-sand/50"
            >
              {other.name}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
