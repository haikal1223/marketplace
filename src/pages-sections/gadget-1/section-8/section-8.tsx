import Container from "components/Container";
import ProductsCarousel from "./products-carousel";
import { SectionHeader } from "components/section-header";
import ProductCard18 from "components/product-cards/product-card-18";
// API FUNCTIONS
import api from "utils/__api__/market-1";

export default async function Section8() {
  const products = await api.getFlashDeals();
  if (!products || products.length === 0) return null;

  return (
    <Container>
      <SectionHeader title="Best Selling Products" linkText="Browse All" seeMoreLink="#" />

      <ProductsCarousel>
        {products.map((product) => (
          <ProductCard18 key={product.id} product={product} />
        ))}
      </ProductsCarousel>
    </Container>
  );
}
