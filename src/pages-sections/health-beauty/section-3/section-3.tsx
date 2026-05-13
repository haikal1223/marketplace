import Typography from "@mui/material/Typography";
// CUSTOM COMPONENTS
import { ProductCard5 } from "components/product-cards/product-card-5";
import ProductsCarousel from "./products-carousel";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
// STYLED COMPONENT
import { SubTitle } from "../styles";

// ================================================================
type Props = { products: Product[] };
// ================================================================

export default function Section3({ products }: Props) {
  return (
    <div className="mb-2">
      <Typography variant="h2">Top New Products</Typography>
      <SubTitle>Best deal with medical and beauty items</SubTitle>

      <ProductsCarousel>
        {products.map((product) => (
          <div className="pb-1" key={product.id}>
            <ProductCard5 product={product} />
          </div>
        ))}
      </ProductsCarousel>
    </div>
  );
}
