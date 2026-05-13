import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// LOCAL CUSTOM COMPONENT
import BoxButton from "../shared/box-button";
// STYLED COMPONENT
import { BannerWrapper } from "./styles";
// IMPORT BANNER IMAGE
import banner1 from "../../../../public/assets/images/banners/banner-51.jpg";
import banner2 from "../../../../public/assets/images/banners/banner-52.png";

export default function Section10() {
  return (
    <Container className="mt-4">
      <Grid container spacing={3}>
        <Grid size={{ md: 6, xs: 12 }}>
          <BannerWrapper>
            <LazyImage src={banner1} alt="banner" />

            <div className="content">
              <p className="tag">#NEW_YEAR</p>
              <h3 className="title">WOMEN EXCLUSIVE</h3>
              <BoxButton variant="dark">Shop Now</BoxButton>
            </div>
          </BannerWrapper>
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <BannerWrapper>
            <LazyImage src={banner2} alt="banner" />

            <div className="content-2">
              <p className="tag">#NEW_YEAR</p>
              <h3 className="title">MEN EXCLUSIVE</h3>
              <BoxButton variant="dark">Shop Now</BoxButton>
            </div>
          </BannerWrapper>
        </Grid>
      </Grid>
    </Container>
  );
}
