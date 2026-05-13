import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENTS
import { StyledLink, Banner3Root } from "../styles";
// IMPORT IMAGE
import sofaImage from "../../../../../public/assets/images/furniture-products/b-5.png";

export default function Card2() {
  return (
    <Banner3Root>
      <div>
        <Typography variant="body1" sx={{ fontSize: 16 }}>
          Sofa Collection
        </Typography>

        <Typography
          variant="h3"
          sx={{ mb: 1, fontSize: 22, fontWeight: 600, color: "primary.main" }}>
          UP TO 60% OFF
        </Typography>

        <StyledLink href="/sales-1">Shop Now</StyledLink>
      </div>

      <div className="img-wrapper">
        <LazyImage alt="chair" src={sofaImage} />
      </div>
    </Banner3Root>
  );
}
