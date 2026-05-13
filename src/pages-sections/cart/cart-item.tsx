import Link from "next/link";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

import Trash from "icons/Trash";
import useCart from "hooks/useCart";
import { currency } from "lib";
import { ContentWrapper, ImageWrapper, QuantityButton, Wrapper } from "./styles";
import { CartItem as CartModel } from "contexts/CartContext";

// =========================================================
type Props = { item: CartModel };
// =========================================================

export default function CartItem({ item }: Props) {
  const { id, title, price, thumbnail, slug, qty } = item;

  const { dispatch } = useCart();

  const handleCartAmountChange = (amount: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        id,
        title,
        price,
        thumbnail,
        slug,
        qty: amount
      }
    });
  };

  return (
    <Wrapper elevation={0}>
      <ImageWrapper>
        <Image alt={title} fill src={thumbnail} sizes="100px" />
      </ImageWrapper>

      <ContentWrapper>
        <Stack spacing={0.5} overflow="hidden">
          <Link href={`/products/${slug}`}>
            <Typography noWrap variant="body1" fontSize={16}>
              {title}
            </Typography>
          </Link>

          <Typography noWrap variant="body1" fontWeight={600}>
            {currency(price)}
          </Typography>
        </Stack>

        <div className="quantity-buttons-wrapper">
          <QuantityButton disabled={qty === 1} onClick={handleCartAmountChange(qty - 1)}>
            <Remove fontSize="small" />
          </QuantityButton>

          <Typography variant="h6">{qty}</Typography>

          <QuantityButton disabled={qty === 10} onClick={handleCartAmountChange(qty + 1)}>
            <Add fontSize="small" />
          </QuantityButton>
        </div>

        <Typography noWrap variant="body1" fontSize={16} fontWeight={600}>
          {currency(price * qty)}
        </Typography>

        <IconButton className="remove-item" size="small" onClick={handleCartAmountChange(0)}>
          <Trash fontSize="small" color="error" />
        </IconButton>
      </ContentWrapper>
    </Wrapper>
  );
}
