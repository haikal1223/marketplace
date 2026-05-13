import Link from "next/link";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import WishlistHeartButton from "components/wishlist/wishlist-heart-button";
// LOCAL CUSTOM COMPONENTS
import AddToCart from "./add-to-cart";
import DiscountChip from "../discount-chip";
// CUSTOM UTILS LIBRARY FUNCTIONS
import { calculateDiscount, currency } from "lib";
// STYLED COMPONENTS
import { PriceText, StyledRoot } from "./styles";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ==============================================================
type Props = { product: Product; wishlisted?: boolean };
// ==============================================================

export default function ProductCard16({ product, wishlisted = false }: Props) {
  const { id, slug, title, thumbnail, price, discount, rating } = product;

  return (
    <StyledRoot>
      <div className="img-wrapper">
        <Link href={`/products/${slug}`}>
          <LazyImage alt={title} width={380} height={379} src={thumbnail} />
        </Link>
        {discount ? <DiscountChip discount={discount} sx={{ left: 20, top: 20 }} /> : null}
        <WishlistHeartButton
          productId={id}
          initialWishlisted={wishlisted}
          sx={{ position: "absolute", top: 12, right: 12, zIndex: 2, bgcolor: "background.paper" }}
        />
      </div>

      <div className="content">
        <div>
          <Link href={`/products/${slug}`}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {title}
            </Typography>
          </Link>

          <Rating readOnly value={rating} size="small" precision={0.5} />

          <PriceText>
            {calculateDiscount(price, discount)}
            {discount && <span className="base-price">{currency(price)}</span>}
          </PriceText>
        </div>

        {/* ADD TO CART BUTTON */}
        <AddToCart product={product} />
      </div>
    </StyledRoot>
  );
}
