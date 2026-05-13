import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import { ProductCard5 } from "components/product-cards/product-card-5";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
// STYLED COMPONENT
import { SubTitle } from "../styles";

// ===========================================================
type Props = { products: Product[]; title: string };
// ===========================================================

export default function Section4({ products, title }: Props) {
  return (
    <div className="mb-3">
      <Typography variant="h2" sx={{ lineHeight: 1, mb: 0.5 }}>
        {title}
      </Typography>

      <SubTitle>Best deal with medical and beauty items</SubTitle>

      <Grid container spacing={3}>
        {products.slice(0, 8).map((product) => (
          <Grid key={product.id} size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
            <ProductCard5 product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
