import { Hero } from "@/components/home/Hero";
import { ShopBySpace } from "@/components/home/ShopBySpace";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { Bestsellers } from "@/components/home/Bestsellers";
import { LifestyleSection } from "@/components/home/LifestyleSection";
import { TrustSection } from "@/components/home/TrustSection";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <ShopBySpace />
      <FeaturedCollections />
      <Bestsellers />
      <TrustSection />
      <LifestyleSection />
      <Testimonials />
    </>
  );
}
