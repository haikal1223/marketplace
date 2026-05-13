import Image from "next/image";
import Typography from "@mui/material/Typography";
// STYLED COMPONENT
import { Card4Wrapper } from "./styles";
// IMPORT IMAGES
import banner4 from "../../../../../public/assets/images/banners/banner-42.png";

export default function Card4() {
  return (
    <Card4Wrapper>
      <Image src={banner4} alt="banner" className="banner-img" />

      <div className="content">
        <Typography variant="body1" sx={{ fontSize: 16 }}>
          #SUNGLASSES
        </Typography>

        <Typography
          variant="h3"
          sx={{
            lineHeight: 1.2,
            fontSize: { xl: 36, lg: 30, xs: 28 }
          }}>
          50% OFF
        </Typography>
      </div>
    </Card4Wrapper>
  );
}
