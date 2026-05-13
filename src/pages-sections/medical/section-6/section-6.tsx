import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENTS
import BlogCard from "./components/blog-card";
import TestimonialCarousel from "./components/testimonial-carousel";
// API FUNCTIONS
import api from "utils/__api__/medical";

export default async function Section6() {
  const [blogs, testimonials] = await Promise.all([api.getBlogs(), api.getTestimonials()]);

  return (
    <Container>
      <Typography variant="h3" sx={{ marginBlock: "4rem 2rem", fontSize: { sm: 30, xs: 27 } }}>
        From Our Blog
      </Typography>

      <Grid container spacing={3}>
        {/* BLOG SECTION */}
        <Grid size={{ md: 6, xs: 12 }}>
          <Stack spacing={3}>
            {blogs.map(({ id, thumbnail, title, createdAt }) => (
              <BlogCard key={id} title={title} date={createdAt} image={thumbnail} />
            ))}
          </Stack>
        </Grid>

        {/* TESTIMONIAL SECTION */}
        <Grid size={{ md: 6, xs: 12 }}>
          <TestimonialCarousel testimonials={testimonials} />
        </Grid>
      </Grid>
    </Container>
  );
}
