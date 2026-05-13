import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import ProductCard7 from "components/product-cards/product-card-7";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ===================================================================
type Props = { heading: string; products: Product[] };
// ===================================================================

export default function Section4({ heading, products }: Props) {
  return (
    <div>
      <Typography variant="h1">{heading}</Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "grey.600" }}>
        Tall blind but were, been folks not the expand
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <ProductCard7 product={product} />
          </Grid>
        ))}
      </Grid>

      <Box mt={6} display="flex" justifyContent="center">
        <Button color="primary" variant="contained">
          Load More...
        </Button>
      </Box>
    </div>
  );
}
