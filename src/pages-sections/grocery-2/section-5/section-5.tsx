import Image from "next/image";
// LOCAL CUSTOM COMPONENTS
import TestimonialsCarousel from "./testimonials-carousel";
// STYLED COMPONENTS
import { StyledCard, StyledQuote, StyledAvatar, StyledContent } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/grocery-2";

export default async function Section5() {
  const testimonials = await api.getTestimonials();
  if (!testimonials || !testimonials.length) return null;

  return (
    <div className="mb-3">
      <TestimonialsCarousel>
        {testimonials.map((data) => (
          <StyledCard key={data.id} elevation={0}>
            <StyledContent>
              <StyledQuote className="first" />

              <div className="testimonial-content">
                <StyledAvatar>
                  <Image fill src={data.user.avatar} alt="User" sizes="(40px, 40px)" />
                </StyledAvatar>

                <p>{data.comment}</p>
                <h5>{data.user.name}</h5>
              </div>

              <StyledQuote className="last" />
            </StyledContent>
          </StyledCard>
        ))}
      </TestimonialsCarousel>
    </div>
  );
}
