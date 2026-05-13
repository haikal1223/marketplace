import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import CategoryCard1 from "components/category-cards/category-card-1";
// API FUNCTIONS
import api from "utils/__api__/fashion-2";

export default async function Section3() {
  const categories = await api.getCategories();
  if (!categories || !categories.length) return null;

  return (
    <Container className="mt-4">
      <Typography variant="h2" sx={{ mb: "2rem", textAlign: "center" }}>
        Best selling Categories
      </Typography>

      <Grid container spacing={3}>
        {categories.map((item) => (
          <Grid size={{ md: 3, sm: 6, xs: 12 }} key={item.id}>
            <CategoryCard1
              image={item.image!}
              title={item.name}
              href={`/products/search?category=${encodeURIComponent(item.slug)}`}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
