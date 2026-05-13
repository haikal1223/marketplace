import { SectionCreator } from "components/section-header";
import ProductCard2 from "components/product-cards/product-card-2";
import ProductsCarousel from "./products-carousel";
// API FUNCTIONS
import api from "utils/__api__/fashion-1";

export default async function Section2() {
  const products = await api.getFlashDeals();
  if (!products || !products.length) return null;

  return (
    <SectionCreator title="Flash Deals">
      <ProductsCarousel>
        {products.map((product) => (
          <ProductCard2 key={product.id} product={product} />
        ))}
      </ProductsCarousel>
    </SectionCreator>
  );
}
