import Link from "next/link";
// GLOBAL CUSTOM COMPONENTS
import Container from "components/Container";
import ProductCard11 from "components/product-cards/product-card-11";
// LOCAL CUSTOM COMPONENTS
import ProductsCarousel from "./products-carousel";
// API FUNCTIONS
import api from "utils/__api__/gadget-2";

export default async function Section4() {
  const products = await api.getNewArrivalProducts();
  if (!products || !products.length) return null;

  return (
    <Container>
      <ProductsCarousel>
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`}>
            <ProductCard11 product={product} />
          </Link>
        ))}
      </ProductsCarousel>
    </Container>
  );
}
