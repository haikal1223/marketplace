import Link from "next/link";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// LOCAL CUSTOM COMPONENTS
import DiscountChip from "../discount-chip";
import ProductPrice from "../product-price";
import ProductTags from "./components/tags";
import AddToCartButton from "./components/add-to-cart";
import WishlistHeartButton from "components/wishlist/wishlist-heart-button";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
// STYLED COMPONENT
import { ContentWrapper, Wrapper } from "./styles";

// ===========================================================
type Props = { product: Product; wishlisted?: boolean };
// ===========================================================

export default function ProductCard9({ product, wishlisted = false }: Props) {
  const { id, thumbnail, title, price, discount, rating, slug } = product;

  return (
    <Wrapper>
      <WishlistHeartButton
        productId={id}
        initialWishlisted={wishlisted}
        sx={{ position: "absolute", top: 15, right: 15, zIndex: 1, bgcolor: "background.paper" }}
      />

      <ContentWrapper>
        <div className="img-wrapper">
          {/* DISCOUNT PERCENT CHIP IF AVAILABLE */}
          <DiscountChip discount={discount} />

          {/* PRODUCT IMAGE / THUMBNAIL */}
          <LazyImage src={thumbnail} alt={title} width={500} height={500} />
        </div>

        <div className="content">
          <div>
            {/* PRODUCT TAG LIST */}
            <ProductTags tags={["Bike", "Motor", "Ducati"]} />

            {/* PRODUCT TITLE / NAME */}
            <Link href={`/products/${slug}`}>
              <Typography variant="h5" sx={{ mt: 1, mb: 2 }}>
                {title}
              </Typography>
            </Link>

            {/* PRODUCT RATING / REVIEW  */}
            <Rating size="small" value={rating} color="warn" readOnly />

            {/* PRODUCT PRICE */}
            <ProductPrice price={price} discount={discount} />
          </div>

          {/* PRODUCT ADD TO CART BUTTON */}
          <AddToCartButton product={product} />
        </div>
      </ContentWrapper>
    </Wrapper>
  );
}
