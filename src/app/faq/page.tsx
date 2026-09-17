import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about OROLiving outdoor furniture, materials, care and orders.",
  alternates: { canonical: "/faq" },
};

const FAQ_SECTIONS = [
  {
    title: "Products & Materials",
    items: [
      {
        question: "Is OROLiving furniture safe to leave outside permanently?",
        answer:
          "Most pieces are designed for full outdoor exposure, using materials like powder-coated aluminium, UV-stabilised synthetic rattan and marine-grade foam. Each product page lists the specific weather attributes that apply to it.",
      },
      {
        question: "How do I clean and maintain my furniture?",
        answer:
          "Care instructions vary by material and are listed on every product page. In general, wipe frames with a damp cloth, remove cushion covers for washing when possible, and avoid abrasive cleaners.",
      },
      {
        question: "Can I order fabric or colour swatches before buying?",
        answer: "Swatch requests aren't available yet through the website — contact our team and we'll help where we can.",
      },
    ],
  },
  {
    title: "Orders & Delivery",
    items: [
      {
        question: "How long does delivery take?",
        answer:
          "In-stock items typically ship in 5–7 business days. Made-to-order pieces, such as select dining sets, ship in 3–5 weeks. Exact timelines are shown on each product page.",
      },
      {
        question: "Do you offer assembly?",
        answer: "Most furniture arrives with straightforward tool-free or minimal-tool assembly, with instructions included in the box.",
      },
    ],
  },
  {
    title: "Returns",
    items: [
      {
        question: "What is your return policy?",
        answer: "Unused items in original packaging can be returned within 14 days of delivery. See our Returns page for full details.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} className="mb-6" />
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Frequently Asked Questions</h1>

      <div className="mt-10 flex flex-col gap-12">
        {FAQ_SECTIONS.map((section) => (
          <div key={section.title} className="max-w-2xl">
            <h2 className="font-display text-xl text-ink">{section.title}</h2>
            <Accordion className="mt-4" items={section.items} />
          </div>
        ))}
      </div>
    </Container>
  );
}
