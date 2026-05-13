import { cache } from "react";
import axios from "utils/axiosInstance";
import Product from "models/Product.model";

export const getFrequentlyBought = cache(async (slug?: string): Promise<Product[]> => {
  const response = await axios.get("/api/frequently-bought-products", {
    params: slug ? { slug } : {}
  });
  return response.data;
});

export const getRelatedProducts = cache(async (slug?: string): Promise<Product[]> => {
  const response = await axios.get("/api/related-products", {
    params: slug ? { slug } : {}
  });
  return response.data;
});
