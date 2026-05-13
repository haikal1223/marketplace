import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENTS
import { StyledLink, BannerRoot } from "../styles";
// IMPORT IMAGE
import chairImage from "../../../../../public/assets/images/furniture-products/b-4.png";

export default function Card1() {
  return (
    <BannerRoot>
      <div>
        <Typography variant="body1" sx={{ fontSize: 16 }}>
          Modern Furniture.
        </Typography>

        <Typography variant="h3" sx={{ fontSize: 36, color: "primary.main" }}>
          Big Sale
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 2,
            mt: 1,
            fontSize: 18,
            fontWeight: 600
          }}>
          UP TO 50% OFF
        </Typography>

        <StyledLink href="/sales-1">Shop Now</StyledLink>
      </div>

      <div className="img-wrapper img-res">
        <LazyImage alt="chair" src={chairImage} />
      </div>
    </BannerRoot>
  );
}
