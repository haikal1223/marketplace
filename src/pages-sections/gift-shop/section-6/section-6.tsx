import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import ProductCard6 from "components/product-cards/product-card-6";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// =========================================================
type Props = { title: string; products: Product[] };
// =========================================================

export default function Section6({ products, title }: Props) {
  if (!products || products.length < 1) return null;

  return (
    <div>
      <Typography variant="h2" sx={{ lineHeight: 1, my: "1.5rem" }}>
        {title}
      </Typography>

      <Grid container mb={-0.5} spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} size={{ md: 3, sm: 6, xs: 12 }}>
            <ProductCard6 product={product} />
          </Grid>
        ))}
      </Grid>

      <Box mt={8} display="flex" justifyContent="center">
        <Button
          color="primary"
          variant="contained"
          sx={{ borderRadius: 0, padding: ".75em 1.5rem" }}>
          Load More...
        </Button>
      </Box>
    </div>
  );
}
