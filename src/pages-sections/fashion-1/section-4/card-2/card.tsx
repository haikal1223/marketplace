import Link from "next/link";
import Image from "next/image";
// STYLED COMPONENT
import { Wrapper } from "./styles";

// ==========================================================
interface Props {
  body: string;
  title: string;
  imgUrl: string;
}
// ==========================================================

export default function CardTwo({ body, title, imgUrl }: Props) {
  return (
    <Wrapper>
      <Image fill alt={title} sizes="(min-width: 768px) 50vw, 100vw" src={imgUrl} />

      <div className="content">
        <h2 className="title">{title}</h2>
        <p className="body">{body}</p>
        <Link href="/sales-1">
          <span className="btn">SHOP NOW</span>
        </Link>
      </div>
    </Wrapper>
  );
}
