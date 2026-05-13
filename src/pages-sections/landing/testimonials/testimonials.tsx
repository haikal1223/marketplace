"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FormatQuote from "@mui/icons-material/FormatQuote";

import { QuoteIcon, TestimonialCard, TestimonialsSection } from "./styles";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Frontend Developer",
    company: "TechStart Inc.",
    avatar: "/assets/images/faces/1.jpg",
    rating: 5,
    testimonial:
      "Bazaar saved us months of development time. The code quality is exceptional and the design is absolutely stunning. Our e-commerce site looks professional and modern."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "ShopEasy",
    avatar: "/assets/images/faces/2.jpg",
    rating: 5,
    testimonial:
      "Best React e-commerce template I've used. TypeScript support is excellent, and the component structure is very well organized. Highly recommended!"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "Fashion Forward",
    avatar: "/assets/images/faces/3.jpg",
    rating: 5,
    testimonial:
      "The multiple demo variations helped us find the perfect design for our brand. Customer support is fantastic and the documentation is comprehensive."
  },
  {
    id: 4,
    name: "David Kumar",
    role: "Full Stack Developer",
    company: "EcoMarket",
    avatar: "/assets/images/faces/4.jpg",
    rating: 5,
    testimonial:
      "Clean, modern design with excellent performance. The SEO optimization features helped us rank better on Google. Worth every penny!"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Startup Founder",
    company: "GreenGoods",
    avatar: "/assets/images/faces/5.jpg",
    rating: 5,
    testimonial:
      "As a non-technical founder, I was amazed at how easy it was to customize. The template is intuitive and the results look incredibly professional."
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Lead Developer",
    company: "Digital Solutions",
    avatar: "/assets/images/faces/6.jpg",
    rating: 5,
    testimonial:
      "Outstanding code architecture and design patterns. The component reusability is excellent, making it easy to scale and maintain our application."
  }
];

const ITEM_PER_PAGE = 3;
const TOTAL_PAGES = Math.ceil(TESTIMONIALS.length / ITEM_PER_PAGE);

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getCurrentTestimonials = () => {
    const start = currentIndex * ITEM_PER_PAGE;
    return TESTIMONIALS.slice(start, start + ITEM_PER_PAGE);
  };

  return (
    <TestimonialsSection>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" fontWeight={700} fontSize={{ xs: 28, md: 36 }} mb={1}>
            What Customers Say About Bazaar
          </Typography>

          <Typography variant="h6" color="text.secondary" maxWidth={600} mx="auto">
            Join thousands of satisfied customers who chose Bazaar for their e-commerce projects
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {getCurrentTestimonials().map((testimonial) => (
            <Grid size={{ xs: 12, md: 4 }} key={testimonial.id}>
              <TestimonialCard elevation={2}>
                <QuoteIcon>
                  <FormatQuote />
                </QuoteIcon>

                <Rating value={testimonial.rating} readOnly size="small" sx={{ mb: 2 }} />

                <Typography
                  variant="body1"
                  lineHeight={1.6}
                  color="text.secondary"
                  sx={{ fontStyle: "italic" }}>
                  "{testimonial.testimonial}"
                </Typography>
              </TestimonialCard>
            </Grid>
          ))}
        </Grid>

        {/* Navigation */}
        <Box display="flex" justifyContent="center" alignItems="center" mt={5} gap={2}>
          <Box display="flex" gap={1}>
            {Array.from({ length: TOTAL_PAGES }).map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentIndex(index)}
                sx={{
                  width: 8,
                  height: 8,
                  cursor: "pointer",
                  borderRadius: "50%",
                  transition: "all 0.3s ease",
                  bgcolor: currentIndex === index ? "primary.main" : "grey.300",
                  "&:hover": { bgcolor: "primary.main", transform: "scale(1.2)" }
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </TestimonialsSection>
  );
}
