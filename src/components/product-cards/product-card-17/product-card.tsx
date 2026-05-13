import Link from "next/link";
import Image from "next/image";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENTS
import Discount from "./discount";
import HoverActions from "./hover-actions";
// STYLED COMPONENTS
import { ImageWrapper, ContentWrapper, StyledCard } from "./styles";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
// CUSTOM UTILS FUNCTION
import { currency } from "lib";

// ========================================================
interface Props {
  product: Product;
  bgWhite?: boolean;
}
// ========================================================

export default function ProductCard17({ product, bgWhite = false }: Props) {
  const { slug, title, price, thumbnail, images, discount, categories } = product;

  return (
    <StyledCard elevation={0} bgWhite={bgWhite}>
      <ImageWrapper>
        <Discount discount={discount} />
        <HoverActions product={product} />

        <Link href={`/products/${slug}`} aria-label={`View ${title}`}>
          <Image
            width={750}
            height={750}
            src={thumbnail}
            alt={`Thumbnail for ${title}`}
            className={images.length > 1 ? "thumbnail" : ""}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading={images.length > 1 ? "lazy" : "eager"}
          />

          {images.length > 1 && (
            <Image
              width={750}
              height={750}
              src={images[1]}
              loading="lazy"
              className="hover-thumbnail"
              alt={`Hover thumbnail for ${title}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </Link>
      </ImageWrapper>

      <ContentWrapper>
        <Typography noWrap variant="body2" className="category">
          {categories.length > 0 ? categories[0] : "N/A"}
        </Typography>

        <Link href={`/products/${slug}`} aria-label={`View ${title}`}>
          <Typography noWrap variant="h5" className="title">
            {title}
          </Typography>
        </Link>

        <Typography variant="subtitle1" color="primary" fontWeight={600}>
          {currency(price)}
        </Typography>
      </ContentWrapper>
    </StyledCard>
  );
}
