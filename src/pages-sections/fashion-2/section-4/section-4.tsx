import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import ProductCard8 from "components/product-cards/product-card-8";
import ProductsCarousel from "./products-carousel";
// API FUNCTIONS
import api from "utils/__api__/fashion-2";

export default async function Section4() {
  const products = await api.getProducts();
  if (!products || !products.length) return null;

  return (
    <Container className="mt-4">
      <Typography variant="h2" sx={{ mb: "2rem", textAlign: "center" }}>
        Best Selling Product
      </Typography>

      <ProductsCarousel>
        {products.map((product) => (
          <ProductCard8 key={product.id} product={product} />
        ))}
      </ProductsCarousel>
    </Container>
  );
}
