import Typography from "@mui/material/Typography";
// CUSTOM COMPONENTS
import ProductCard7 from "components/product-cards/product-card-7";
import ProductsCarousel from "./products-carousel";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ====================================================
interface Props {
  heading: string;
  description: string;
  products: Product[];
}
// ====================================================

export default function Section3({ products, heading, description }: Props) {
  if (!products || !products.length) return null;

  return (
    <div className="mb-2">
      <Typography variant="h1">{heading}</Typography>
      <Typography variant="body1" sx={{ mt: 1, mb: 3, color: "grey.600" }}>
        {description}
      </Typography>

      <ProductsCarousel>
        {products.map((product) => (
          <div className="pt-1 pb-1" key={product.id}>
            <ProductCard7 product={product} />
          </div>
        ))}
      </ProductsCarousel>
    </div>
  );
}
