import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// CUSTOM COMPONENTS
import BannerCard from "./banner-card";
import IconLink from "components/icon-link";
import Container from "components/Container";

export default function Offers() {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <BannerCard img="/assets/images/banners/banner-18.jpg">
            <Typography variant="body1" sx={{ fontSize: 13, letterSpacing: 1.2 }}>
              NEW ARRIVALS
            </Typography>

            <Typography
              variant="h4"
              sx={{
                my: 2,
                fontSize: 20,
                letterSpacing: 1,
                span: { fontWeight: 400, fontSize: 14, color: "error.main" }
              }}>
              SKI CLOTHES SALE
              <br />
              <span>Up to 35% Off</span>
            </Typography>

            <IconLink url="/" title="Shop Now" />
          </BannerCard>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <BannerCard img="/assets/images/banners/banner-19.jpg" color="white">
            <Typography variant="body1" sx={{ fontSize: 13, letterSpacing: 1.2 }}>
              BEST SELLER
            </Typography>

            <Typography
              variant="h4"
              sx={{
                my: 2,
                fontSize: 20,
                letterSpacing: 1,
                span: { fontWeight: 400, fontSize: 14 }
              }}>
              TRENDING WOMEN
              <br />
              <span>SUNGLASSES</span>
            </Typography>

            <IconLink url="/" title="Shop Now" sx={{ color: "inherit" }} />
          </BannerCard>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <BannerCard img="/assets/images/banners/banner-20.jpg">
            <Typography variant="body1" sx={{ fontSize: 13, letterSpacing: 1.2 }}>
              NEW ARRIVALS
            </Typography>

            <Typography
              variant="h4"
              sx={{
                my: 2,
                fontSize: 20,
                letterSpacing: 1,
                span: { fontWeight: 400, fontSize: 14 }
              }}>
              NEW LATEST BAG
              <br />
              <span>COLLECTION</span>
            </Typography>

            <IconLink url="/" title="Shop Now" />
          </BannerCard>
        </Grid>
      </Grid>
    </Container>
  );
}
