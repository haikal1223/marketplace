import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import Container from "components/Container";
import ProductCard17 from "components/product-cards/product-card-17";
// LOCAL CUSTOM COMPONENTS
import ProductsCarousel from "./products-carousel";
// API FUNCTIONS
import api from "utils/__api__/market-1";

export default async function Section6() {
  const products = await api.getNewArrivalList();
  if (!products || products.length === 0) return null;

  return (
    <Container>
      <Typography variant="h2" fontWeight={700} fontSize={{ sm: 32, xs: 27 }}>
        New Arrivals
      </Typography>

      <ProductsCarousel>
        {products.map((product) => (
          <ProductCard17 key={product.id} product={product} />
        ))}
      </ProductsCarousel>
    </Container>
  );
}
