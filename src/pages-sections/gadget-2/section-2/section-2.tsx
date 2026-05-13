import Link from "next/link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import IconLink from "components/icon-link";
import Container from "components/Container";
import FlexBetween from "components/flex-box/flex-between";
import ProductCard11 from "components/product-cards/product-card-11";
// API FUNCTIONS
import api from "utils/__api__/gadget-2";

export default async function Section2() {
  const products = await api.getBestSellerProducts();
  if (!products || !products.length) return null;

  return (
    <Container>
      <FlexBetween gap={2} mb={3}>
        <div>
          <Typography variant="h2" fontWeight={700} fontSize={{ sm: 32, xs: 27 }}>
            Best Seller Products
          </Typography>

          <Typography variant="body1" color="text.secondary" fontSize={{ sm: 16, xs: 14 }}>
            There are many variations passages
          </Typography>
        </div>

        <IconLink title="Show More" url="#" />
      </FlexBetween>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }} key={product.id}>
            <Link href={`/products/${product.slug}`}>
              <ProductCard11 product={product} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
