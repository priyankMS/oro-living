import { Container } from "@/components/ui/Container";

const POINTS = [
  {
    title: "Designed for Outdoor Living",
    description: "Every piece is engineered specifically for sun, rain and open-air use — not adapted from indoor furniture.",
  },
  {
    title: "Premium Materials",
    description: "Powder-coated aluminium, marine-grade foam and FSC-sourced hardwood chosen for how they age outdoors.",
  },
  {
    title: "Thoughtful Craftsmanship",
    description: "Considered proportions and finishes, from cushion stitching to frame welds.",
  },
  {
    title: "Easy Care",
    description: "Clear care guidance with every product, so your furniture stays looking its best for years.",
  },
];

export function TrustSection() {
  return (
    <section className="border-y border-border bg-surface py-14 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {POINTS.map((point) => (
            <div key={point.title}>
              <h3 className="font-display text-lg text-ink">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
