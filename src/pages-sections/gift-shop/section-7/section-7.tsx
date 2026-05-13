import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENT
import { RootStyle } from "./styles";
// IMPORT BANNER IMAGE
import banner from "../../../../public/assets/images/banners/banner-54.png";

export default async function Section7() {
  return (
    <div className="mt-4">
      <RootStyle>
        <LazyImage src={banner} alt="banner" className="banner" />

        <div className="content">
          <Typography variant="body1" sx={{ fontSize: { md: 18, xs: 16 } }}>
            Summer Offer!
          </Typography>

          <Typography variant="h3">30% off for All Items</Typography>

          <Button variant="contained" color="primary" disableElevation>
            Shop Now
          </Button>
        </div>
      </RootStyle>
    </div>
  );
}
