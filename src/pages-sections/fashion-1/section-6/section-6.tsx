import Grid from "@mui/material/Grid";
// LOCAL CUSTOM COMPONENT
import LongProductCard from "./long-product-card";
// GLOBAL CUSTOM COMPONENTS
import { SectionCreator } from "components/section-header";
import ProductCard2 from "components/product-cards/product-card-2";
// API FUNCTIONS
import api from "utils/__api__/fashion-1";

export default async function Section6() {
  const products = await api.getTrendingItems();

  // REMAINING TRENDING PRODUCTS
  const TRENDING_ITEMS = products.slice(1, products.length);

  return (
    <SectionCreator title="Trending Items">
      <Grid container spacing={4}>
        <Grid size={{ md: 3, xs: 12 }}>
          <LongProductCard product={products[0]} />
        </Grid>

        <Grid container spacing={4} size={{ md: 9, xs: 12 }}>
          {TRENDING_ITEMS.map((product) => (
            <Grid size={{ sm: 4, xs: 16 }} key={product.id}>
              <ProductCard2 product={product} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </SectionCreator>
  );
}
