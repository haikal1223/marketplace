import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import FlexRowCenter from "components/flex-box/flex-row-center";
import ProductCard4 from "components/product-cards/product-card-4";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
// STYLED COMPONENT
import { SubTitle } from "../styles";

// ========================================================
type Props = { products: Product[]; title?: string };
// ========================================================

export default function AllProducts({ products, title = "All Products" }: Props) {
  return (
    <div className="mb-3" id="products">
      <Typography variant="h2">{title}</Typography>
      <SubTitle>Best collection in {new Date().getFullYear()} for you!</SubTitle>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
            <ProductCard4 product={product} />
          </Grid>
        ))}
      </Grid>

      <FlexRowCenter mt={6}>
        <Button variant="contained" color="primary" sx={{ fontSize: 13 }}>
          Load More...
        </Button>
      </FlexRowCenter>
    </div>
  );
}
