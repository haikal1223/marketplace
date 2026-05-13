import Link from "next/link";
import Image from "next/image";
// MUI
import Divider from "@mui/material/Divider";
import { BoxProps } from "@mui/material/Box";
// STYLED COMPONENTS
import { CardWrapper, CardContent, CardLink } from "./styles";

// ========================================================
interface Props extends BoxProps {
  img: string;
  url: string;
  title: string;
  subTitle: string;
  contentPosition?: "left" | "right";
}
// ========================================================

export default function BannerCard2({
  img,
  url,
  title,
  subTitle,
  contentPosition = "left",
  ...props
}: Props) {
  return (
    <CardWrapper {...props}>
      <Image fill alt="category" src={img} sizes="(100vw, 240px)" />

      <CardContent contentAlign={contentPosition} className="content">
        <h2 className="title">{title}</h2>
        <p>{subTitle}</p>
        <Divider className="divider" />

        <Link href={url}>
          <CardLink>Shop Now</CardLink>
        </Link>
      </CardContent>
    </CardWrapper>
  );
}
