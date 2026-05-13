"use client";

import ProductCard9 from "components/product-cards/product-card-9";
import { useWishlistProductIds } from "hooks/use-wishlist-product-ids";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ==========================================================
type Props = { products: Product[] };
// ==========================================================

export default function ProductsListView({ products }: Props) {
  const wishlisted = useWishlistProductIds(products);

  return products.map((product) => (
    <ProductCard9 key={product.id} product={product} wishlisted={wishlisted.has(product.id)} />
  ));
}
