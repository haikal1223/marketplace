import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENT
import BlogCard from "./blog-card";
// API FUNCTIONS
import api from "utils/__api__/fashion-2";

export default async function Section8() {
  const blogs = await api.getBlogs();

  return (
    <Container className="mt-4">
      <Typography variant="h2" sx={{ mb: "2rem", textAlign: "center" }}>
        Latest Articles
      </Typography>

      <Grid container spacing={3}>
        {blogs.map((item) => (
          <Grid size={{ md: 4, xs: 12 }} key={item.id}>
            <BlogCard
              title={item.title}
              date={item.createdAt}
              image={item.thumbnail}
              description={item.description!}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
