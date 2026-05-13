import { ReactNode } from "react";
import Button from "@mui/material/Button";
// STYLED COMPONENTS
import { BannerCardWrapper } from "./styles";

// ==============================================================
interface Props {
  tag: string;
  title: string;
  ImageComponent: ReactNode;
}
// ==============================================================

export default function BannerCard({ ImageComponent, tag, title }: Props) {
  return (
    <BannerCardWrapper>
      {/* IMAGE COMPONENT */}
      {ImageComponent}

      <div className="content">
        <p className="tag">{tag}</p>
        <h6 className="title">{title}</h6>
        <p className="price">
          Start from <span>$40.45</span>
        </p>

        <Button variant="contained" color="orange">
          Shop Now
        </Button>
      </div>
    </BannerCardWrapper>
  );
}
