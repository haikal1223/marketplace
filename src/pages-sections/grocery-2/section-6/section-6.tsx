import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import ProductsCarousel from "./products-carousel";
import ProductCard1 from "components/product-cards/product-card-1";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// =======================================================
type Props = { title: string; products: Product[] };
// =======================================================

export default function Section6({ products, title }: Props) {
  return (
    <div className="mb-3">
      <Typography variant="h2" sx={{ mb: 3 }}>
        {title}
      </Typography>

      <ProductsCarousel>
        {products.map((product) => (
          <Box py={0.5} key={product.id}>
            <ProductCard1 product={product} />
          </Box>
        ))}
      </ProductsCarousel>
    </div>
  );
}
