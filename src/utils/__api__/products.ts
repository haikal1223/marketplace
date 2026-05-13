import { cache } from "react";
// CUSTOM DATA MODEL
import type { SlugParams } from "models/Common";
import Product from "models/Product.model";
import {
  getProductSlugParamsList,
  getProductBySlugPayload,
  searchProductTitles,
  getPublishedReviewsFormatted,
} from "lib/product-server";

const getSlugs = cache(async () => {
  return getProductSlugParamsList();
});

const getProduct = cache(async (slug: string) => {
  const data = await getProductBySlugPayload(slug);
  return data as unknown as Product | null;
});

const searchProducts = cache(async (name?: string, category?: string) => {
  return searchProductTitles(name, category);
});

const getProductReviews = cache(async () => {
  return getPublishedReviewsFormatted();
});

export default { getSlugs, getProduct, searchProducts, getProductReviews };
