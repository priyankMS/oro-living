import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductReviews } from "@/components/product/ProductReviews";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { StickyAddToCart } from "@/components/product/StickyAddToCart";
import { getProductBySlug, getRelatedProducts, PRODUCTS } from "@/data/products";
import { breadcrumbSchema, productSchema } from "@/lib/schema";
import { SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = `${product.name} — ${product.productType}`;

  return {
    title,
    description: product.shortDescription,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: product.shortDescription,
      url: `/product/${product.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.shortDescription,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: product.productType, href: `/shop?type=${encodeURIComponent(product.productType)}` },
    { label: product.name },
  ];

  return (
    <div className="pb-24 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([productSchema(product), breadcrumbSchema(crumbs)]),
        }}
      />

      <Container className="py-6 lg:py-10">
        <Breadcrumbs items={crumbs} className="mb-6" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} />
          <ProductInfo product={product} />
        </div>

        <div className="mt-16 border-t border-border pt-14 lg:mt-20">
          <ProductReviews product={product} />
        </div>

        <div className="mt-16 border-t border-border pt-14 lg:mt-20">
          <RelatedProducts products={related} />
        </div>
      </Container>

      <StickyAddToCart product={product} />
    </div>
  );
}
