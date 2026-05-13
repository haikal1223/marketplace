import Image from "next/image";
import Typography from "@mui/material/Typography";
// STYLED COMPONENT
import { Card6Wrapper } from "./styles";
// IMPORT IMAGES
import banner5 from "../../../../../public/assets/images/banners/banner-43.png";

export default function Card6() {
  return (
    <Card6Wrapper>
      <Image src={banner5} alt="banner" className="banner-img" />

      <div className="content">
        <p className="tag">#EXCLUSIVE</p>

        <Typography
          variant="h3"
          sx={{
            lineHeight: 1.2,
            fontSize: { xl: 48, lg: 40, xs: 34 },
            span: { fontWeight: 400 }
          }}>
          <span>NEW</span> <br />
          GADGETS
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mt: 4,
            fontWeight: 500,
            fontSize: { sm: 18, xs: 16 }
          }}>
          #LATEST_COLLECTION2022
        </Typography>
      </div>
    </Card6Wrapper>
  );
}
