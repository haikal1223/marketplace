import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import ProductCard13 from "components/product-cards/product-card-13";
// API FUNCTIONS
import api from "utils/__api__/medical";

export default async function Section3() {
  const products = await api.getFeaturedProducts();
  if (!products || !products.length) return null;

  return (
    <Container>
      <Typography variant="h3" fontSize={{ sm: 30, xs: 27 }} sx={{ mt: 8, mb: 4 }}>
        Featured Product
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }} key={product.id}>
            <ProductCard13 product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
