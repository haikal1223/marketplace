import Container from "components/Container";
import ProductsCarousel from "./products-carousel";
import { SectionHeader } from "components/section-header";
import ProductCard10 from "components/product-cards/product-card-10";
// API FUNCTIONS
import api from "utils/__api__/market-3";

export default async function Section4() {
  const products = await api.getProducts();
  if (!products || !products.length) return null;

  return (
    <Container>
      <SectionHeader title="Deals Of The Day" linkText="More Products" seeMoreLink="/" />

      <ProductsCarousel>
        {products.map((product) => (
          <ProductCard10 product={product} key={product.id} />
        ))}
      </ProductsCarousel>
    </Container>
  );
}
