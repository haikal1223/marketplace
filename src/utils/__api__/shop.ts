import { cache } from "react";
// CUSTOM DATA MODEL
import Shop from "models/Shop.model";
import { SlugParams } from "models/Common";
import {
  getShopsPaginated,
  getShopSingleBySlug,
  getShopSlugParamsList,
} from "lib/shops-server";

const shopList = [
  {
    name: "Tech Friend",
    imgUrl: "/assets/images/faces/propic.png",
    url: "/shops/scarlett-beauty",
  },
  {
    name: "Smart Shop",
    imgUrl: "/assets/images/faces/propic(1).png",
    url: "/shops/scarlett-beauty",
  },
  {
    name: "Gadget 360",
    imgUrl: "/assets/images/faces/propic(8).png",
    url: "/shops/scarlett-beauty",
  },
];

export const getShopList = cache(async () => {
  return getShopsPaginated(1, 9);
});

export const getSlugs = cache(async () => {
  return getShopSlugParamsList() as unknown as SlugParams[];
});

export const getProductsBySlug = cache(async (slug: string) => {
  const shop = await getShopSingleBySlug(slug);
  return shop as unknown as Shop | null;
});

export const getAvailableShops = cache(async () => {
  return shopList;
});

export default { getShopList, getSlugs, getProductsBySlug };
