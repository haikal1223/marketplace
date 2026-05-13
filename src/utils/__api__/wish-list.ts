import { cache } from "react";
import { getServerAxios } from "utils/serverAxios";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

export const getWishListProducts = cache(async (page = 1) => {
  const api = await getServerAxios();
  const { data } = await api.get<{ products: Product[]; totalPages: number; total: number }>(
    "/api/users/wishlist",
    { params: { page } }
  );
  return data;
});
