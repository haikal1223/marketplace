import Link from "next/link";
import Typography from "@mui/material/Typography";
import LazyImage from "components/LazyImage";
import { StyledRoot } from "./styles";

// ==============================================================
interface Props {
  image: string;
  title: string;
  description: string;
  imageWidth?: number;
  imageHeight?: number;
  centerContent?: boolean;
}
// ==============================================================

export default function BannerCard({
  image,
  title,
  description,
  imageWidth = 480,
  imageHeight = 300,
  centerContent = false
}: Props) {
  return (
    <StyledRoot center={centerContent}>
      <LazyImage width={imageWidth} height={imageHeight} src={image} alt={title} />

      <div className="content">
        <Typography variant="body1" fontWeight={700} fontSize={{ lg: 32, xs: 27 }}>
          {title}
        </Typography>

        <Typography variant="body1" fontSize={16}>
          {description}
        </Typography>

        <Link href="/">
          <span className="btn">Explore Now</span>
        </Link>
      </div>
    </StyledRoot>
  );
}
