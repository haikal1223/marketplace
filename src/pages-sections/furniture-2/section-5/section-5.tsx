import Content from "./content";
import ProductCard12 from "components/product-cards/product-card-12";
// API FUNCTIONS
import api from "utils/__api__/furniture-2";

export default async function Section4() {
  const products = await api.getTrendingProducts();
  if (!products || !products.length) return null;

  return (
    <Content>
      {products.map((product) => (
        <ProductCard12 product={product} key={product.id} />
      ))}
    </Content>
  );
}
