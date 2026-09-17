import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { PRODUCTS } from "@/data/products";
import { SPACES } from "@/data/spaces";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/collections",
    "/about",
    "/contact",
    "/faq",
    "/shipping",
    "/returns",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryRoutes = SPACES.map((space) => ({
    url: `${SITE_URL}/category/${space.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
