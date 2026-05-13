import { SectionCreator } from "components/section-header";
import ProductCard2 from "components/product-cards/product-card-2";
import ProductsCarousel from "./products-carousel";
// API FUNCTIONS
import api from "utils/__api__/fashion-1";

export default async function Section3() {
  const products = await api.getNewArrivals();
  if (!products || !products.length) return null;

  return (
    <SectionCreator title="New Arrivals" seeMoreLink="#">
      <ProductsCarousel>
        {products.map((product) => (
          <ProductCard2 key={product.id} product={product} showReview={false} />
        ))}
      </ProductsCarousel>
    </SectionCreator>
  );
}
