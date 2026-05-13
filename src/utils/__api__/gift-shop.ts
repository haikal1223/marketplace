import { cache } from "react";
import axios from "utils/axiosInstance";
import Product from "models/Product.model";
import Service from "models/Service.model";
import Category from "models/Category.model";
import { GiftCarouselItem } from "models/Carousel.model";
import CategoryNavList from "models/CategoryNavList.model";

const getMainCarouselData = cache(async (): Promise<GiftCarouselItem[]> => {
  const response = await axios.get("/api/gift-shop/main-carousel");
  return response.data;
});

const getCategoryNavigation = cache(async (): Promise<CategoryNavList[]> => {
  const response = await axios.get("/api/gift-shop-navigation");
  return response.data;
});

const getPopularProducts = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/gift-shop/products?tag=popular");
  return response.data;
});

const getTopSailedProducts = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/gift-shop/products?tag=top-sailed");
  return response.data;
});

const getAllProducts = cache(async (category?: string): Promise<Product[]> => {
  const response = await axios.get("/api/gift-shop/products", { params: { category } });
  return response.data;
});

const getServiceList = cache(async (): Promise<Service[]> => {
  const response = await axios.get("/api/gift-shop/service-list");
  return response.data;
});

const getTopCategories = cache(async (): Promise<Partial<Category>[]> => {
  const response = await axios.get("/api/gift-shop/top-categories");
  return response.data;
});

const getCategory = cache(async (category: string): Promise<{ title: string }> => {
  const response = await axios.get("/api/gift-shop/category", { params: { category } });
  return response.data;
});

export default {
  getCategory,
  getAllProducts,
  getServiceList,
  getTopCategories,
  getPopularProducts,
  getMainCarouselData,
  getTopSailedProducts,
  getCategoryNavigation
};
