import { cache } from "react";
import axios from "utils/axiosInstance";
// CUSTOM DATA MODEL
import { SlugParams } from "models/Common";
import Product from "models/Product.model";

// get all product slug
const getSlugs = cache(async () => {
  const response = await axios.get<SlugParams[]>("/api/products/slug-list");
  return response.data;
});

// get product based on slug
const getProduct = cache(async (slug: string) => {
  const response = await axios.get<Product>("/api/products/slug", { params: { slug } });
  return response.data;
});

// search products
const searchProducts = cache(async (name?: string, category?: string) => {
  const response = await axios.get<string[]>("/api/products/search", {
    params: { name, category }
  });
  return response.data;
});

interface ProductReview {
  name: string;
  date: string;
  imgUrl: string;
  rating: number;
  comment: string;
}

// product reviews
const getProductReviews = cache(async () => {
  const response = await axios.get<ProductReview[]>("/api/product/reviews");
  return response.data;
});

export default { getSlugs, getProduct, searchProducts, getProductReviews };
