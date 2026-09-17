import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses and protects your information.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} className="mb-6" />
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: September 2026</p>

      <div className="mt-8 flex max-w-2xl flex-col gap-6 text-[15px] leading-relaxed text-muted">
        <p>
          This is a demo policy for the {SITE_NAME} storefront and should be replaced with
          counsel-reviewed terms before launch.
        </p>
        <div>
          <h2 className="font-display text-xl text-ink">Information We Collect</h2>
          <p className="mt-2">
            We collect information you provide directly, such as your name, email address,
            shipping address and order details, along with basic usage data to improve the site.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-ink">How We Use Your Information</h2>
          <p className="mt-2">
            Your information is used to process orders, provide customer support, and, where you
            opt in, send updates about new collections and offers.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-ink">Data Sharing</h2>
          <p className="mt-2">
            We share information only with service providers necessary to fulfil orders, such as
            payment processors and delivery partners.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-ink">Contact Us</h2>
          <p className="mt-2">
            For privacy questions or requests, reach us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </div>
    </Container>
  );
}
