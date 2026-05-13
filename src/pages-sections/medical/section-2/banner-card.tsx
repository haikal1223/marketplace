import { ReactNode } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// STYLED COMPONENTS
import { BannerCardWrapper } from "./styles";

// ==============================================================
interface Props {
  tag: string;
  price: string;
  title: string;
  bgColor?: string;
  ImageComponent: ReactNode;
}
// ==============================================================

export default function BannerCard({ ImageComponent, tag, title, price, bgColor }: Props) {
  return (
    <BannerCardWrapper bgColor={bgColor}>
      <div className="content">
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            fontSize: { xl: 20, sm: 16, xs: 14 }
          }}>
          {tag}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            lineHeight: 1,
            fontWeight: 600,
            fontSize: { xl: 33, sm: 27, xs: 22 }
          }}>
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mt: 1,
            mb: 2,
            fontWeight: 600,
            color: "error.main",
            fontSize: { xl: 24, sm: 20, xs: 18 }
          }}>
          {price}
        </Typography>

        <Button variant="contained" color="primary">
          Shop Now
        </Button>
      </div>

      {/* IMAGE COMPONENT */}
      <div className="img-wrapper">{ImageComponent}</div>
    </BannerCardWrapper>
  );
}
