import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// LOCAL CUSTOM COMPONENT
import BoxButton from "../shared/box-button";
// STYLED COMPONENT
import { RootStyle } from "./styles";
// IMPORT BANNER IMAGE
import banner from "../../../../public/assets/images/banners/banner-48.jpg";

export default async function Section6() {
  return (
    <Container className="mt-4">
      <RootStyle>
        <LazyImage src={banner} alt="banner" />

        <div className="content">
          <Typography
            variant="body1"
            sx={{
              fontSize: { xl: 24, md: 20, xs: 16 }
            }}>
            UP TO
          </Typography>

          <Typography
            variant="h3"
            sx={{
              lineHeight: 1.3,
              fontSize: { xl: 60, lg: 48, xs: 36 }
            }}>
            30% OFF
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              fontSize: { xl: 24, md: 20, xs: 16 },
              span: { fontWeight: 700 }
            }}>
            FOR ALL KIND OF <span>BAG ITEMS</span>
          </Typography>

          <BoxButton>Shop Now</BoxButton>
        </div>
      </RootStyle>
    </Container>
  );
}
