"use client";

import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENTS
import ProductCard16 from "components/product-cards/product-card-16";
import { useWishlistProductIds } from "hooks/use-wishlist-product-ids";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ========================================================
type Props = { products: Product[] };
// ========================================================

export default function ProductsGridView({ products }: Props) {
  const wishlisted = useWishlistProductIds(products);

  return (
    <Grid container spacing={3}>
      {products.map((product: Product) => (
        <Grid size={{ lg: 4, sm: 6, xs: 12 }} key={product.id}>
          <ProductCard16 product={product} wishlisted={wishlisted.has(product.id)} />
        </Grid>
      ))}
    </Grid>
  );
}
