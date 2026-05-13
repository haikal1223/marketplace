import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import ProductCard8 from "components/product-cards/product-card-8";
import ProductsCarousel from "./products-carousel";
// API FUNCTIONS
import api from "utils/__api__/fashion-2";

export default async function Section6() {
  const products = await api.getFeatureProducts();
  if (!products || !products.length) return null;

  return (
    <Container className="mt-4">
      <Typography variant="h2" sx={{ textAlign: "center", mb: "2rem" }}>
        Featured Products
      </Typography>

      <ProductsCarousel>
        {products.map((product) => (
          <ProductCard8 key={product.id} product={product} />
        ))}
      </ProductsCarousel>
    </Container>
  );
}
