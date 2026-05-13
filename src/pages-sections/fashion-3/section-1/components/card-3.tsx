import Image from "next/image";
import Typography from "@mui/material/Typography";
// STYLED COMPONENT
import { Card3Wrapper } from "./styles";
// IMPORT IMAGES
import banner3 from "../../../../../public/assets/images/banners/banner-41.png";

export default function Card3() {
  return (
    <Card3Wrapper>
      <Image src={banner3} alt="banner" className="banner-img" />

      <div className="content">
        <Typography variant="body1" sx={{ fontSize: 16 }}>
          #DRESS
        </Typography>

        <Typography
          variant="h3"
          sx={{
            lineHeight: 1.2,
            fontSize: { lg: 30, xs: 28 }
          }}>
          WOMEN
        </Typography>
      </div>
    </Card3Wrapper>
  );
}
