import Link from "next/link";
import Image from "next/image";
import Button from "@mui/material/Button";
// STYLED COMPONENT
import { Wrapper } from "./styles";

// ==========================================================
type Props = { title: string; imgUrl: string };
// ==========================================================

export default function Card({ title, imgUrl }: Props) {
  return (
    <Wrapper>
      <Image fill alt={title} sizes="(min-width: 768px) 50vw, 100vw" src={imgUrl} />

      <div className="content">
        <p className="title">{title}</p>

        <Button
          color="dark"
          className="btn"
          href="/sales-1"
          variant="contained"
          LinkComponent={Link}>
          Discover Now
        </Button>
      </div>
    </Wrapper>
  );
}
