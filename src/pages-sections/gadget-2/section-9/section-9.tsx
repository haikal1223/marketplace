import Container from "components/Container";
import TestimonialCarousel from "./testimonial-carousel";
import TestimonialCard1 from "components/testimonial-cards/testimonial-card-1";
// API FUNCTIONS
import api from "utils/__api__/gadget-2";

export default async function Section9() {
  const testimonials = await api.getTestimonials();

  return (
    <Container maxWidth="lg">
      <TestimonialCarousel>
        {testimonials.map((testimonial) => (
          <TestimonialCard1 key={testimonial.id} {...testimonial} />
        ))}
      </TestimonialCarousel>
    </Container>
  );
}
