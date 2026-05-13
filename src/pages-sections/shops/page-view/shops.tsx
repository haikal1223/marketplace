import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENT
import ShopCard from "../shop-card";
import ShopPagination from "../shop-pagination";
// CUSTOM DATA MODEL
import Shop from "models/Shop.model";

// =============================================
interface Props {
  shops: Shop[];
  totalShops: number;
  totalPages: number;
  firstIndex: number;
  lastIndex: number;
}
// =============================================

export default function ShopsPageView({
  totalShops,
  totalPages,
  firstIndex,
  lastIndex,
  shops
}: Props) {
  return (
    <Container className="mt-2 mb-3">
      <Typography variant="h2" sx={{ mb: 3 }}>
        All Shops
      </Typography>

      {/* ALL SHOP LIST AREA */}
      <Grid container spacing={3}>
        {shops.map((item) => (
          <Grid size={{ lg: 4, sm: 6, xs: 12 }} key={item.id}>
            <ShopCard
              name={item.name}
              slug={item.slug}
              phone={item.phone}
              address={item.address}
              coverPicture={item.coverPicture}
              profilePicture={item.profilePicture}
            />
          </Grid>
        ))}
      </Grid>

      {/* PAGINATION AREA */}
      <ShopPagination
        lastIndex={lastIndex}
        firstIndex={firstIndex}
        totalPages={totalPages}
        totalShops={totalShops}
      />
    </Container>
  );
}
