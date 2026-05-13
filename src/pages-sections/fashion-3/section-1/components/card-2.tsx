import Image from "next/image";
import Typography from "@mui/material/Typography";
// STYLED COMPONENT
import { Card2Wrapper } from "./styles";
// IMPORT IMAGES
import banner2 from "../../../../../public/assets/images/banners/banner-40.png";

export default function Card2() {
  return (
    <Card2Wrapper>
      <Image src={banner2} alt="banner" className="banner-img" />

      <div className="content">
        <Typography variant="body1" sx={{ fontSize: 16 }}>
          #NEW
        </Typography>

        <Typography
          variant="h3"
          sx={{
            lineHeight: 1.2,
            fontSize: { xl: 36, lg: 30, xs: 28 }
          }}>
          SPORTS
        </Typography>
      </div>
    </Card2Wrapper>
  );
}
