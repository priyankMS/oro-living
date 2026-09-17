import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for shopping with ${SITE_NAME}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} className="mb-6" />
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted">Last updated: September 2026</p>

      <div className="mt-8 flex max-w-2xl flex-col gap-6 text-[15px] leading-relaxed text-muted">
        <p>
          This is a demo terms page for the {SITE_NAME} storefront and should be replaced with
          counsel-reviewed terms before launch.
        </p>
        <div>
          <h2 className="font-display text-xl text-ink">Orders & Pricing</h2>
          <p className="mt-2">
            All prices are listed in Indian Rupees (INR) and are subject to change without
            notice. We reserve the right to refuse or cancel any order.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-ink">Product Information</h2>
          <p className="mt-2">
            We aim to display product details, including materials and dimensions, as accurately
            as possible. Minor variations may occur due to the handmade nature of some materials.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-ink">Limitation of Liability</h2>
          <p className="mt-2">
            {SITE_NAME} is not liable for indirect or consequential damages arising from the use
            of our products or website.
          </p>
        </div>
      </div>
    </Container>
  );
}
