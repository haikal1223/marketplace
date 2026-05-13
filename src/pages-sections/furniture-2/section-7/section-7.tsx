import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENT
import TestimonialCard from "./testimonial-card";
// API FUNCTIONS
import api from "utils/__api__/furniture-2";
// STYLED COMPONENT
import { RootStyled } from "./styles";

export default async function Section7() {
  const testimonials = await api.getTestimonial();
  if (!testimonials || !testimonials.length) return null;

  return (
    <RootStyled>
      <Container>
        <div className="heading">
          <h3 className="title">Testimonial</h3>
          <p className="description">There are many variations passages</p>
        </div>

        <Grid container spacing={3}>
          {testimonials.map((item) => (
            <Grid size={{ md: 4, xs: 12 }} key={item.id}>
              <TestimonialCard testimonial={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyled>
  );
}
