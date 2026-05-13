import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { FooterApps } from "components/footer";
// STYLED COMPONENT
import { RootStyle } from "./styles";
// IMPORT BANNER IMAGE
import phone from "../../../../public/assets/images/banners/banner-53.png";
import banner from "../../../../public/assets/images/headers/fashion-3.jpg";

export default function Section12() {
  return (
    <Container className="mt-4">
      <RootStyle>
        <LazyImage src={banner} alt="banner" />

        <div className="content">
          <Typography variant="h3" lineHeight={1.3} fontSize={{ xl: 48, lg: 42, xs: 36 }}>
            DOWNLOAD <br />
            OUR APP
          </Typography>

          <Typography variant="body1" fontSize={{ md: 16, xs: 14 }} sx={{ mt: 1, mb: 4 }}>
            Fashion you can buy, but style you possess. <br /> The key to style is learning who you
            are, which takes years.
          </Typography>

          <FooterApps appleStoreUrl="#" playStoreUrl="#" />
        </div>

        <div className="mobile-img">
          <LazyImage src={phone} alt="banner" />
        </div>
      </RootStyle>
    </Container>
  );
}
