import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENTS
import Container from "components/Container";
import BlogCard2 from "components/blog-cards/blog-card-2";
import { SectionHeader } from "components/section-header";
// API FUNCTIONS
import api from "utils/__api__/gadget-2";

export default async function Section6() {
  const blogs = await api.getBlogs();
  if (!blogs || !blogs.length) return null;

  return (
    <Container>
      <SectionHeader title="Latest Posts" seeMoreLink="#" linkText="View all posts" />

      <Grid container spacing={3}>
        {blogs.slice(0, 2).map((blog) => (
          <Grid size={{ md: 6, xs: 12 }} key={blog.id}>
            <BlogCard2
              title={blog.title}
              date={blog.createdAt}
              thumbnail={blog.thumbnail}
              description={blog.description!}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
