import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENTS
import { StyledLink, Banner3Root } from "../styles";
// IMPORT IMAGE
import sofaImage from "../../../../../public/assets/images/furniture-products/b-3.png";

export default function Card3() {
  return (
    <Banner3Root>
      <div>
        <Typography variant="body1" sx={{ fontSize: 24 }}>
          Winter Offer!
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontWeight: 600,
            color: "primary.main",
            fontSize: { xl: 42, xs: 36 }
          }}>
          50% OFF
        </Typography>

        <Typography variant="body1" sx={{ fontSize: 16, mb: 2 }}>
          All Kind of Furniture Items
        </Typography>

        <StyledLink href="/sales-1">Shop Now</StyledLink>
      </div>

      <div className="img-wrapper max-w-xl">
        <LazyImage alt="Sofa" src={sofaImage} />
      </div>
    </Banner3Root>
  );
}
