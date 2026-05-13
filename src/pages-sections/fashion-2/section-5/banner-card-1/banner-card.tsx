import Link from "next/link";
import Image from "next/image";
import Button from "@mui/material/Button";
// STYLED COMPONENTS
import { CardContent, CardWrapper } from "./styles";

// ========================================================
interface Props {
  img: string;
  url: string;
  text1: string;
  text2: string;
  text3: string;
}
// ========================================================

export default function BannerCard1({ img, url, text1, text2, text3 }: Props) {
  return (
    <CardWrapper>
      <Image fill alt="category" src={img} sizes="(100vw, 240px)" />

      <CardContent>
        <div>
          <p>{text1}</p>
          <h3>{text2}</h3>
          <h1>{text3}</h1>
        </div>

        <Button LinkComponent={Link} href={url} size="large" variant="outlined" color="info">
          Shop Now
        </Button>
      </CardContent>
    </CardWrapper>
  );
}
