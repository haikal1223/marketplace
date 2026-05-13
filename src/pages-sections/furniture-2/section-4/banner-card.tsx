import { ReactNode } from "react";
import Button from "@mui/material/Button";
// STYLED COMPONENTS
import { BannerCardWrapper } from "./styles";

// ==============================================================
interface Props {
  title: string;
  description: string;
  ImageComponent: ReactNode;
}
// ==============================================================

export default function BannerCard({ ImageComponent, title, description }: Props) {
  return (
    <BannerCardWrapper>
      {/* BACKGROUND IMAGE */}
      {ImageComponent}

      <div className="content">
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>

        <div className="btn-wrapper">
          <Button fullWidth variant="contained" color="orange">
            Shop Now
          </Button>
        </div>
      </div>
    </BannerCardWrapper>
  );
}
