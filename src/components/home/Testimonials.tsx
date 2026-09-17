import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { TESTIMONIALS } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="bg-charcoal py-16 text-ivory sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="From Our Customers"
          title="Furniture people keep coming back to"
          align="center"
          tone="light"
          className="mx-auto"
        />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <figure key={testimonial.author} className="flex flex-col items-center text-center">
              <StarRating rating={5} className="justify-center" />
              <blockquote className="mt-4 text-balance text-[15px] leading-relaxed text-ivory/85">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-xs uppercase tracking-[0.08em] text-ivory/55">
                {testimonial.author} — {testimonial.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
