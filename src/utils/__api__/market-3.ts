import { cache } from "react";
import axios from "utils/axiosInstance";
import Brand from "models/Brand.model";
import Product from "models/Product.model";
import Service from "models/Service.model";
import Shop from "models/Shop.model";
import { CategoryBasedProducts, MainCarouselItem } from "models/Market-2.model";
import Category from "models/Category.model";

const getProducts = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-3/products");
  return response.data;
});

const getServices = cache(async (): Promise<Service[]> => {
  const response = await axios.get("/api/market-3/service");
  return response.data;
});

const getCategories = cache(async () => {
  const response = await axios.get<Category[]>("/api/market-3/categories");
  return response.data;
});

const getBrands = cache(async (): Promise<Brand[]> => {
  const response = await axios.get("/api/market-3/brand");
  return response.data;
});

const getMainCarouselData = cache(async (): Promise<MainCarouselItem[]> => {
  const response = await axios.get("/api/market-3/main-carousel");
  return response.data;
});

const getElectronicsProducts = cache(async (): Promise<CategoryBasedProducts> => {
  const response = await axios.get("/api/market-3/category-based-product?tag=electronics");
  return response.data;
});

const getMenFashionProducts = cache(async (): Promise<CategoryBasedProducts> => {
  const response = await axios.get("/api/market-3/category-based-product?tag=men");
  return response.data;
});

const getWomenFashionProducts = cache(async (): Promise<CategoryBasedProducts> => {
  const response = await axios.get("/api/market-3/category-based-product?tag=women");
  return response.data;
});

const getShops = cache(async (): Promise<Shop[]> => {
  const response = await axios.get("/api/market-3/shops");
  return response.data;
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
  getWomenFashionProducts
};
