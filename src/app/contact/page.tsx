import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the OROLiving team for product questions, orders or trade enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} className="mb-6" />

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <h1 className="font-display text-3xl text-ink sm:text-4xl">Get in Touch</h1>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
            Questions about a product, an order, or planning furniture for your space — we&apos;re
            happy to help.
          </p>

          <div className="mt-10 flex flex-col gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted">Email</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="mt-1 block text-sm text-ink">
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted">Phone</p>
              <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="mt-1 block text-sm text-ink">
                {CONTACT_PHONE}
              </a>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted">Hours</p>
              <p className="mt-1 text-sm text-ink">Monday – Saturday, 10am – 7pm IST</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </Container>
  );
}
