import Link from "next/link";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import ArrowForward from "@mui/icons-material/ArrowForward";
// STYLED COMPONENTS
import { CardButton, CardContent, StyledRoot } from "./styles";

// ==============================================================
interface Props {
  name: string;
  link: string;
  image: string;
}
// ==============================================================

export default function Card({ name, image, link }: Props) {
  return (
    <Link href={link} aria-label={`Go to ${name} category`}>
      <StyledRoot>
        <Image
          fill
          priority
          quality={90}
          alt={name}
          src={image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <CardContent>
          <Typography
            className="card-title"
            variant="h3"
            fontWeight={600}
            fontSize={{
              sm: 22,
              xs: 18
            }}>
            {name}
          </Typography>

          <CardButton aria-label={`See more about ${name}`}>
            <ArrowForward fontSize="small" />
          </CardButton>
        </CardContent>
      </StyledRoot>
    </Link>
  );
}
