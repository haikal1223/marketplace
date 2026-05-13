import { ComponentProps, memo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
// CUSTOM GLOBAL COMPONENTS
import IconComponent from "components/IconComponent";
// STYLED COMPONENTS
import { CategoryBoxWrapper, StyledChip, StyledRoot } from "./styles";
// CATEGORY INTERFACE MODEL
import Category from "models/Category.model";

// ==============================================================
interface Props extends ComponentProps<"div"> {
  categories: Category[];
}
// ==============================================================

const CategoryList = ({ categories, ref }: Props) => {
  const params = useParams<{ slug: string }>();

  return (
    <StyledRoot ref={ref}>
      {categories.map((item) => (
        <Link key={item.slug} href={`/sales-1/${item.slug}`}>
          <CategoryBoxWrapper selected={item.slug === params.slug}>
            <IconComponent icon={item.icon!} className="icon" />
            <p className="title">{item.name}</p>

            <StyledChip size="small" color="primary" label="Upto 40% off" />
          </CategoryBoxWrapper>
        </Link>
      ))}
    </StyledRoot>
  );
};

export default memo(CategoryList);
