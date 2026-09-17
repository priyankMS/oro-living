import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SearchView } from "@/components/search/SearchView";

export const metadata: Metadata = {
  title: "Search",
  description: "Search OROLiving for outdoor furniture by product, space or collection.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Container className="py-8 lg:py-12">
      <Suspense fallback={null}>
        <SearchView />
      </Suspense>
    </Container>
  );
}
