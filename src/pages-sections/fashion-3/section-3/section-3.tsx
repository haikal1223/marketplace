import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENT
import BoxButton from "../shared/box-button";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENTS
import { BannerWrapper, ImgWrapper, RootStyle } from "./styles";
// IMPORT IMAGES
import banner1 from "../../../../public/assets/images/banners/banner-44.jpg";
import banner2 from "../../../../public/assets/images/banners/banner-45.jpg";
import banner3 from "../../../../public/assets/images/banners/banner-46.png";
import banner4 from "../../../../public/assets/images/banners/banner-47.png";

export default async function Section3() {
  return (
    <RootStyle>
      <Container className="mt-4">
        <Grid container spacing={3}>
          <Grid size={{ md: 3, xs: 6 }} className="item-1">
            <ImgWrapper>
              <LazyImage src={banner1} alt="banner" />
            </ImgWrapper>
          </Grid>

          <Grid size={{ md: 6, xs: 12 }} className="item-2">
            <BannerWrapper>
              <div className="img-box">
                <LazyImage src={banner3} alt="banner" />
              </div>

              <div className="content">
                <Typography variant="body1" fontSize={{ lg: 20, md: 16 }}>
                  UP TO
                </Typography>

                <Typography variant="h3" lineHeight={1.3} fontSize={{ lg: 48, md: 42, xs: 36 }}>
                  25% OFF
                </Typography>

                <Typography
                  variant="body1"
                  fontSize={{ lg: 20, md: 16 }}
                  sx={{ mb: 4, span: { fontWeight: 600 } }}>
                  FOR ALL KIND OF <span>BAG ITEMS</span>
                </Typography>

                <BoxButton>Shop Now</BoxButton>
              </div>

              <div className="img-box">
                <LazyImage src={banner4} alt="banner" />
              </div>
            </BannerWrapper>
          </Grid>

          <Grid size={{ md: 3, xs: 6 }} className="item-3">
            <ImgWrapper>
              <LazyImage src={banner2} alt="banner" />
            </ImgWrapper>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
