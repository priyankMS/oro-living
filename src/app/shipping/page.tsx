import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Shipping",
  description: "OROLiving shipping timelines, delivery areas and order tracking information.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shipping" }]} className="mb-6" />
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Shipping</h1>

      <div className="mt-8 flex max-w-2xl flex-col gap-8 text-[15px] leading-relaxed text-muted">
        <div>
          <h2 className="font-display text-xl text-ink">Delivery Timelines</h2>
          <p className="mt-2">
            In-stock items ship within 5–7 business days of your order being confirmed.
            Made-to-order pieces, including select dining sets and sofa modules, ship in 3–5
            weeks and this is noted clearly on the product page before you order.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink">Delivery Areas</h2>
          <p className="mt-2">
            We currently deliver across major metro and tier-1 cities in India, with expanding
            coverage to additional pin codes. Delivery availability for your address is confirmed
            at checkout.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink">Tracking Your Order</h2>
          <p className="mt-2">
            Once your order ships, you&apos;ll receive tracking details by email and SMS. For large
            furniture items, our delivery partner will call ahead to schedule a convenient time.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink">Assembly & Unpacking</h2>
          <p className="mt-2">
            Most pieces require minimal, tool-light assembly with instructions included in the
            box. Packaging is designed to be easy to break down for recycling.
          </p>
        </div>
      </div>
    </Container>
  );
}
