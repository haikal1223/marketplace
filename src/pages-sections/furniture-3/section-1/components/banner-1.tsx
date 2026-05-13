import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENT
import { StyledRoot } from "./styles";
// IMPORT IMAGES
import banner1 from "../../../../../public/assets/images/banners/banner-55.jpg";

export default function BannerOne() {
  return (
    <StyledRoot>
      <LazyImage src={banner1} alt="banner" />

      <div className="text-content">
        <Typography
          variant="h2"
          sx={{ lineHeight: 1.2, fontSize: { xl: 52, lg: 40, sm: 52, xs: 32 } }}>
          50% off For Your <br /> First Order
        </Typography>

        <Typography variant="body1" sx={{ fontSize: { xl: 18, lg: 16, sm: 18 } }}>
          50% discount on any product
        </Typography>
      </div>

      <div className="button-wrapper">
        <Button color="primary" size="large" variant="contained">
          Shop Now
        </Button>
      </div>
    </StyledRoot>
  );
}
