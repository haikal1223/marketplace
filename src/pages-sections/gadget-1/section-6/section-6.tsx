import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import Container from "components/Container";
import ProductsCarousel from "./products-carousel";
import ProductCard18 from "components/product-cards/product-card-18";
// API FUNCTIONS
import api from "utils/__api__/market-1";

export default async function Section6() {
  const products = await api.getFlashDeals();
  if (!products || products.length === 0) return null;

  return (
    <Container>
      <Grid container spacing={{ md: 6, xs: 3 }}>
        <Grid size={{ md: 6, xs: 12 }}>
          <LazyImage
            width={700}
            height={450}
            src="/assets/images/gadget-1/banner-6.jpg"
            alt="Flash deals offer"
            sx={{ borderRadius: 3, height: "100%", objectFit: "cover" }}
          />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <ProductsCarousel>
            {products.map((product) => (
              <ProductCard18 key={product.id} product={product} />
            ))}
          </ProductsCarousel>
        </Grid>
      </Grid>
    </Container>
  );
}
