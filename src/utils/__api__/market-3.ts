import { cache } from "react";
import Brand from "models/Brand.model";
import Product from "models/Product.model";
import Service from "models/Service.model";
import Shop from "models/Shop.model";
import { CategoryBasedProducts, MainCarouselItem } from "models/Market-2.model";
import Category from "models/Category.model";
import {
  getMarket3Brands,
  getMarket3Categories,
  getMarket3CategoryBasedProduct,
  getMarket3MainCarousel,
  getMarket3ProductsList,
  getMarket3Services,
  getMarket3ShopsList,
} from "lib/market-3-server";

const getProducts = cache(async (): Promise<Product[]> => {
  return getMarket3ProductsList(null);
});

const getServices = cache(async (): Promise<Service[]> => {
  return getMarket3Services();
});

const getCategories = cache(async (): Promise<Category[]> => {
  return (await getMarket3Categories()) as unknown as Category[];
});

const getBrands = cache(async (): Promise<Brand[]> => {
  return getMarket3Brands();
});

const getMainCarouselData = cache(async (): Promise<MainCarouselItem[]> => {
  return getMarket3MainCarousel();
});

const getElectronicsProducts = cache(
  async (): Promise<CategoryBasedProducts> => {
    return getMarket3CategoryBasedProduct("electronics");
  },
);

const getMenFashionProducts = cache(
  async (): Promise<CategoryBasedProducts> => {
    return getMarket3CategoryBasedProduct("men");
  },
);

const getWomenFashionProducts = cache(
  async (): Promise<CategoryBasedProducts> => {
    return getMarket3CategoryBasedProduct("women");
  },
);

const getShops = cache(async (): Promise<Shop[]> => {
  return (await getMarket3ShopsList()) as unknown as Shop[];
});

export default {
  getBrands,
  getProducts,
  getServices,
  getShops,
  getCategories,
  getMainCarouselData,
  getMenFashionProducts,
  getElectronicsProducts,
  getWomenFashionProducts,
};
