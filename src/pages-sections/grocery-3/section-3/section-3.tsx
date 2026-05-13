import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENTS
import ProductsCarousel from "./products-carousel";
import ProductCard3 from "components/product-cards/product-card-3";
// STYLED COMPONENT
import { TitleBox } from "../styles";
// API FUNCTIONS
import api from "utils/__api__/grocery-3";

export default async function Section3() {
  const products = await api.getTopSailedProducts();
  if (!products || !products.length) return null;

  return (
    <div>
      <TitleBox>
        <h1>Top Sales Products</h1>
        <div />
      </TitleBox>

      <ProductsCarousel>
        {products.map((product) => (
          <Box py={0.5} key={product.id}>
            <ProductCard3 product={product} />
          </Box>
        ))}
      </ProductsCarousel>
    </div>
  );
}
