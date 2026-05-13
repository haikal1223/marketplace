import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import ProductCard14 from "components/product-cards/product-card-14";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ==============================================================
interface Props {
  products: Product[];
  breadcrumb?: string;
}
// ==============================================================

export default async function Section2({ products, breadcrumb = "All Products" }: Props) {
  return (
    <Box sx={{ mb: { sm: 8, xs: 12 } }}>
      <Typography
        variant="h2"
        fontWeight={700}
        fontSize={{ sm: 27, xs: 24 }}
        sx={{ mb: { sm: 3, xs: 2 } }}>
        {breadcrumb}
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, xl: 3 }} key={product.id}>
            <ProductCard14 product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
