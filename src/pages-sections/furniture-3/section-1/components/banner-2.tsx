import { PropsWithChildren } from "react";
import Link from "next/link";
import Typography from "@mui/material/Typography";
// STYLED COMPONENTS
import { StyledWrapper } from "./styles";

// ==============================================================
interface Props extends PropsWithChildren {
  title: string;
  description: string;
}
// ==============================================================

export default function BannerTwo({ children, title, description }: Props) {
  return (
    <StyledWrapper>
      <Link href="#">
        {children}

        <div className="text-content">
          <Typography variant="h2" className="title">
            {title}
          </Typography>

          <Typography variant="body1" className="description">
            {description}
          </Typography>
        </div>
      </Link>
    </StyledWrapper>
  );
}
