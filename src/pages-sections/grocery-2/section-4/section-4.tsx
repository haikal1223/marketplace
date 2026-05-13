import Link from "next/link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import BannersCarousel from "./banners-carousel";
// STYLED COMPONENT
import { H3, H5, StyledGrid } from "./styles";
// CUSTOM DATA MODEL
import { Banner } from "models/Grocery-2.model";
// API FUNCTIONS
import api from "utils/__api__/grocery-2";

export default async function Section4() {
  const discountBanners: Banner[] = await api.getDiscountBannerList();
  if (!discountBanners || discountBanners.length < 1) return null;

  return (
    <div className="mb-3">
      <BannersCarousel>
        {discountBanners.map((item, ind) => (
          <div key={ind}>
            <StyledGrid spacing={3} container sx={{ bgcolor: item.bgColor }}>
              <Grid size={{ lg: 5, md: 6, sm: 7, xs: 12 }}>
                <H5>{item.subtitle}</H5>
                <H3>{item.title}</H3>

                <Button
                  color="primary"
                  variant="contained"
                  LinkComponent={Link}
                  href={item.shopUrl}>
                  Shop Now
                </Button>
              </Grid>

              <Grid offset={{ lg: 2, md: 1 }} size={{ lg: 5, md: 5, sm: 5, xs: 12 }}>
                <LazyImage width={320} height={200} alt={item.title} src={item.imgUrl} />
              </Grid>
            </StyledGrid>
          </div>
        ))}
      </BannersCarousel>
    </div>
  );
}
