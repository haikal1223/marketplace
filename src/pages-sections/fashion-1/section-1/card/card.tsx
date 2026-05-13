import Link from "next/link";
import Image from "next/image";
// STYLED COMPONENT
import { Wrapper } from "./styles";

// ==========================================================
interface Props {
  badge: string;
  body: string;
  title: string;
  imgUrl: string;
}
// ==========================================================

export default function Card({ body, title, imgUrl, badge }: Props) {
  return (
    <Link href="/sales-1">
      <Wrapper>
        <Image fill alt={title} sizes="(min-width: 768px) 50vw, 100vw" src={imgUrl} />

        <div className="content">
          <small className="badge">{badge}</small>
          <h2 className="title">{title}</h2>
          <p className="body">{body}</p>
          <span className="btn">SHOP NOW</span>
        </div>
      </Wrapper>
    </Link>
  );
}
