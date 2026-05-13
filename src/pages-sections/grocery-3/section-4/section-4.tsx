import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
// GLOBAL CUSTOM COMPONENTS
import ProductCard3 from "components/product-cards/product-card-3";
// STYLED COMPONENT
import { TitleBox } from "../styles";
// API FUNCTIONS
import api from "utils/__api__/grocery-3";

export default async function Section4() {
  const products = await api.getAllProducts();

  return (
    <div>
      <TitleBox>
        <h1>Our All Products</h1>
        <div />
      </TitleBox>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ProductCard3 product={product} />
          </Grid>
        ))}
      </Grid>

      <Box mt={6} display="flex" justifyContent="center">
        <Button variant="contained" color="primary" sx={{ fontSize: 13 }}>
          Load More...
        </Button>
      </Box>
    </div>
  );
}
