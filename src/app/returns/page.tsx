import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Returns",
  description: "OROLiving returns and refund policy for outdoor furniture orders.",
  alternates: { canonical: "/returns" },
};

export default function ReturnsPage() {
  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Returns" }]} className="mb-6" />
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Returns</h1>

      <div className="mt-8 flex max-w-2xl flex-col gap-8 text-[15px] leading-relaxed text-muted">
        <div>
          <h2 className="font-display text-xl text-ink">Return Window</h2>
          <p className="mt-2">
            Unused items in their original packaging can be returned within 14 days of delivery
            for a full refund to your original payment method.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink">Made-to-Order Items</h2>
          <p className="mt-2">
            Made-to-order pieces are built specifically for your order and are non-returnable
            except in the case of manufacturing defects or shipping damage.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink">Damaged or Defective Items</h2>
          <p className="mt-2">
            If your order arrives damaged, contact us within 48 hours of delivery with photos and
            we&apos;ll arrange a replacement or refund at no extra cost.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink">How to Start a Return</h2>
          <p className="mt-2">
            Email our team with your order number and reason for return, and we&apos;ll guide you
            through pickup and refund scheduling.
          </p>
        </div>
      </div>
    </Container>
  );
}
