import Link from "next/link";
import Image from "next/image";
// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import Order from "models/Order.model";

// ==============================================================
type Props = { product: Order["items"][0] };
// ==============================================================

export default function OrderedProduct({ product }: Props) {
  const { productImg, productName, productPrice, productQuantity, variant, product: prodRef } = product || {};
  const slug = prodRef?.slug;

  return (
    <Box my={2} gap={2} display="grid" gridTemplateColumns={{ md: "1fr 1fr", xs: "1fr" }}>
      <FlexBox flexShrink={0} gap={1.5} alignItems="center">
        <Box
          position="relative"
          width={64}
          height={64}
          flexShrink={0}
          borderRadius={1}
          overflow="hidden"
          bgcolor="grey.100">
          <Image
            fill
            alt={productName ?? ""}
            src={productImg ?? "/assets/images/products/placeholder.png"}
            sizes="64px"
            style={{ objectFit: "cover" }}
          />
        </Box>

        <div>
          {slug ? (
            <Link href={`/products/${slug}`}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {productName}
              </Typography>
            </Link>
          ) : (
            <Typography variant="h6" sx={{ mb: 1 }}>
              {productName}
            </Typography>
          )}

          <Typography variant="body1" sx={{ color: "grey.600" }}>
            {currency(productPrice ?? 0)} × {productQuantity ?? 0}
          </Typography>
        </div>
      </FlexBox>

      <FlexBetween flexShrink={0} alignItems="flex-start">
        <Typography variant="body1" sx={{ color: "grey.600" }}>
          Varian: {variant?.trim() ? variant : "—"}
        </Typography>
      </FlexBetween>
    </Box>
  );
}
