import Link from "next/link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// STYLED COMPONENT
import { CardWrapper } from "./styles";

// ===============================================================
interface Props {
  title: string;
  bgImage: string;
  category: string;
  discount: number;
  buttonLink: string;
  buttonText: string;
  description: string;
  mode?: "dark" | "light";
}
// ===============================================================

export default function CarouselCard({
  title,
  bgImage,
  category,
  discount,
  buttonLink,
  buttonText,
  description,
  mode = "dark"
}: Props) {
  return (
    <CardWrapper img={bgImage} mode={mode}>
      <div className="content">
        <Typography
          variant="body1"
          lineHeight={1}
          fontWeight={500}
          fontSize={{ xs: 24, sm: 30 }}
          textTransform="uppercase"
          className="title">
          {title}
        </Typography>

        <Typography
          variant="body1"
          lineHeight={1}
          fontWeight={700}
          fontSize={{ xs: 44, sm: 60 }}
          textTransform="uppercase">
          {category}
        </Typography>

        <Typography
          variant="body1"
          lineHeight={1}
          fontWeight={500}
          fontSize={{ xs: 24, sm: 30 }}
          textTransform="uppercase"
          className="discount">
          SALE UP TO <span>{discount}% OFF</span>
        </Typography>

        <Typography variant="body1" className="description">
          {description}
        </Typography>

        <Button
          size="large"
          color="dark"
          href={buttonLink}
          variant="contained"
          LinkComponent={Link}>
          {buttonText}
        </Button>
      </div>
    </CardWrapper>
  );
}
