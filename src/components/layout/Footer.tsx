import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { CONTACT_EMAIL, CONTACT_PHONE, SITE_NAME, SOCIAL_LINKS } from "@/lib/site";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All Furniture", href: "/shop" },
      { label: "Balcony", href: "/category/balcony" },
      { label: "Garden", href: "/category/garden" },
      { label: "Terrace", href: "/category/terrace" },
      { label: "Veranda", href: "/category/veranda" },
      { label: "Patio", href: "/category/patio" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About OROLiving", href: "/about" },
      { label: "Collections", href: "/collections" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <Container className="py-14 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Image
              src="/logo.svg"
              alt={SITE_NAME}
              width={160}
              height={120}
              className="h-16 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed text-ivory/70">
              Bring better living outdoors. Join our list for new collections, restocks and
              seasonal care tips.
            </p>
            <NewsletterForm className="mt-6" />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-ivory/50">
                  {column.title}
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-ivory/80 transition-colors hover:text-cream">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-ivory/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ivory/60">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ivory/60">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-cream">
              {CONTACT_EMAIL}
            </a>
            <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="hover:text-cream">
              {CONTACT_PHONE}
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs text-ivory/60">
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="hover:text-cream">
              Instagram
            </a>
            <a href={SOCIAL_LINKS.pinterest} target="_blank" rel="noreferrer" className="hover:text-cream">
              Pinterest
            </a>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="hover:text-cream">
              Facebook
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
