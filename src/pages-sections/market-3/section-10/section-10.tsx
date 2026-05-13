import Link from "next/link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import Container from "components/Container";
import { FlexBetween } from "components/flex-box";
import ShopCard from "pages-sections/shops/shop-card/shop-card";
// API FUNCTIONS
import api from "utils/__api__/market-3";

export default async function Section10() {
  const shops = await api.getShops();
  if (!shops || shops.length === 0) return null;

  return (
    <Container>
      <FlexBetween mb={4} flexWrap="wrap" gap={2}>
        <div>
          <Typography variant="h2" fontWeight={700} fontSize={{ sm: 32, xs: 27 }}>
            Featured Vendors
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Shop directly from our trusted sellers
          </Typography>
        </div>

        <Link href="/shops" passHref>
          <Button variant="outlined" color="primary">
            View All Shops
          </Button>
        </Link>
      </FlexBetween>

      <Grid container spacing={3}>
        {shops.map((shop) => (
          <Grid size={{ lg: 4, sm: 6, xs: 12 }} key={shop.id}>
            <ShopCard {...shop} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
