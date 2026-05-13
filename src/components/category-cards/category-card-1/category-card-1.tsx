import Link from "next/link";
import LazyImage from "components/LazyImage";
import { CategoryTitle, Wrapper } from "./styles";

// ============================================================
interface Props {
  image: string;
  title: string;
  /** e.g. `/products/search?category=slug` */
  href?: string;
}
// ============================================================

export default function CategoryCard1({ image, title, href }: Props) {
  const inner = (
    <Wrapper>
      <LazyImage src={image} width={213} height={213} alt={title} />

      <CategoryTitle className="category-title">
        <p>{title}</p>
      </CategoryTitle>
    </Wrapper>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        {inner}
      </Link>
    );
  }

  return inner;
}
