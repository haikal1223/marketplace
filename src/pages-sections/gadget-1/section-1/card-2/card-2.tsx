import Link from "next/link";
import Image from "next/image";
import Typography from "@mui/material/Typography";
// STYLED COMPONENT
import { Wrapper } from "./styles";

// ==========================================================
interface Props {
  badge: string;
  title: string;
  imgUrl: string;
  url?: string;
}
// ==========================================================

export default function CardTwo({ badge, title, imgUrl, url }: Props) {
  return (
    <Link href="/sales-1">
      <Wrapper>
        <Image fill alt={title} sizes="(min-width: 768px) 50vw, 100vw" src={imgUrl} />

        <div className="content">
          <small className="badge">{badge}</small>
          <Typography
            variant="body1"
            fontWeight={700}
            lineHeight={1.3}
            fontSize={{ sm: 32, xs: 27 }}>
            {title}
          </Typography>
        </div>
      </Wrapper>
    </Link>
  );
}
