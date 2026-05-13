import { cache } from "react";
import Product from "models/Product.model";
import {
  getFrequentlyBoughtData,
  getRelatedProductsData,
} from "lib/related-products-server";

export const getFrequentlyBought = cache(
  async (slug?: string): Promise<Product[]> => {
    return getFrequentlyBoughtData(slug, 3);
  },
);

export const getRelatedProducts = cache(
  async (slug?: string): Promise<Product[]> => {
    return getRelatedProductsData(slug, 4);
  },
);
