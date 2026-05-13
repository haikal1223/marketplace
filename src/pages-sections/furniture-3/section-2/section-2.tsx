import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import ProductCard15 from "components/product-cards/product-card-15";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ==============================================================
interface Props {
  products: Product[];
  breadcrumb?: string;
}
// ==============================================================

export default async function Section2({ products = [], breadcrumb = "All Products" }: Props) {
  return (
    <div className="mb-4">
      <Typography variant="h3" sx={{ fontSize: 18, mb: 3 }}>
        {breadcrumb}
      </Typography>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid size={{ lg: 4, sm: 6, xs: 12 }} key={product.id}>
            <ProductCard15 product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
