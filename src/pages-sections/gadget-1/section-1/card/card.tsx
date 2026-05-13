import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import IconLink from "components/icon-link";
// STYLED COMPONENT
import { Wrapper } from "./styles";

// ==========================================================
interface Props {
  badge: string;
  body: string;
  title: string;
  imgUrl: string;
  badgeColor?: "success" | "primary" | "info";
}
// ==========================================================

export default function Card({ body, title, imgUrl, badge, badgeColor = "primary" }: Props) {
  return (
    <Link href="/sales-1">
      <Wrapper>
        <Image fill alt={title} sizes="(min-width: 768px) 50vw, 100vw" src={imgUrl} />

        <div className="content">
          <small
            className={clsx("badge", {
              info: badgeColor === "info",
              success: badgeColor === "success",
              primary: badgeColor === "primary"
            })}>
            {badge}
          </small>

          <Typography
            variant="body1"
            fontWeight={700}
            lineHeight={1.3}
            fontSize={{ sm: 32, xs: 27 }}>
            {title}
          </Typography>

          <Typography variant="body1" fontSize={{ sm: 16, xs: 14 }} className="body">
            {body}
          </Typography>

          <span className="btn">Explore Now</span>
        </div>
      </Wrapper>
    </Link>
  );
}
