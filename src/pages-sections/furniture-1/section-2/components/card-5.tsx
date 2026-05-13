import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENTS
import { BannerRoot, StyledLink } from "../styles";
// IMPORT IMAGE
import sofaImage from "../../../../../public/assets/images/furniture-products/b-2.png";

export default function Card5() {
  return (
    <BannerRoot>
      <div>
        <Typography variant="body1">December New!</Typography>

        <Typography
          variant="h3"
          sx={{
            mb: 2,
            fontSize: 22,
            fontWeight: 600,
            color: "primary.main"
          }}>
          Sofa Chair
        </Typography>

        <StyledLink href="/sales-1">Shop Now</StyledLink>
      </div>

      <div className="img-wrapper max-w-lg">
        <LazyImage alt="chair" src={sofaImage} />
      </div>
    </BannerRoot>
  );
}
