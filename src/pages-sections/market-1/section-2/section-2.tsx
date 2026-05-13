import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENTS
import Container from "components/Container";
import ProductCard17 from "components/product-cards/product-card-17";
// LOCAL CUSTOM COMPONENTS
import ProductsCarousel from "./products-carousel";
// API FUNCTIONS
import api from "utils/__api__/market-1";

export default async function Section2() {
  const products = await api.getFlashDeals();
  if (!products || products.length === 0) return null;

  return (
    <Container>
      <ProductsCarousel>
        {products.map((product) => (
          <Box pb={0.6} key={product.id}>
            <ProductCard17 product={product} />
          </Box>
        ))}
      </ProductsCarousel>
    </Container>
  );
}
