import Image from "next/image";
import Typography from "@mui/material/Typography";
// STYLED COMPONENT
import { Card1Wrapper } from "./styles";
// IMPORT IMAGES
import banner1 from "../../../../../public/assets/images/banners/banner-39.png";

export default function Card1() {
  return (
    <Card1Wrapper>
      <Image src={banner1} alt="banner" />

      <div className="content">
        <Typography variant="body1" sx={{ fontSize: 16 }}>
          #EXCLUSIVE
        </Typography>

        <Typography
          variant="h3"
          sx={{
            lineHeight: 1.2,
            fontSize: { xl: 48, lg: 40, xs: 34 }
          }}>
          MEN’S <br />
          COLLECTIONS
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mt: 4,
            fontSize: 18,
            fontWeight: 500
          }}>
          #LATEST_COLLECTION2022
        </Typography>
      </div>
    </Card1Wrapper>
  );
}
