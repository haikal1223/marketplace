import { cache } from "react";
import axios from "utils/axiosInstance";
// CUSTOM DATA MODEL
import Shop from "models/Shop.model";
import { SlugParams } from "models/Common";

const shopList = [
  {
    name: "Tech Friend",
    imgUrl: "/assets/images/faces/propic.png",
    url: "/shops/scarlett-beauty"
  },
  {
    name: "Smart Shop",
    imgUrl: "/assets/images/faces/propic(1).png",
    url: "/shops/scarlett-beauty"
  },
  {
    name: "Gadget 360",
    imgUrl: "/assets/images/faces/propic(8).png",
    url: "/shops/scarlett-beauty"
  }
];

interface Response {
  shops: Shop[];
  meta: { totalShops: number; totalPages: number; firstIndex: number; lastIndex: number };
}

export const getShopList = cache(async () => {
  const response = await axios.get<Response>("/api/shops");
  const { shops, meta } = response.data;
  return { shops, meta };
});

export const getSlugs = cache(async () => {
  const response = await axios.get<SlugParams[]>("/api/shops/slugs");
  return response.data;
});

export const getProductsBySlug = cache(async (slug: string) => {
  const response = await axios.get<Shop>("/api/shops/single", { params: { slug } });
  return response.data;
});

export const getAvailableShops = cache(async () => {
  return shopList;
});

export default { getShopList, getSlugs, getProductsBySlug };
