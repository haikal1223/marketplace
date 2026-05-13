import { cache } from "react";
import axios from "utils/axiosInstance";
import Shop from "models/Shop.model";
import Blog from "models/Blog.model";
import Product from "models/Product.model";
import Service from "models/Service.model";
import Category from "models/Category.model";
import MainCarouselItem from "models/Market-1.model";

const getMainCarousel = cache(async (): Promise<MainCarouselItem[]> => {
  const response = await axios.get("/api/market-1/main-carousel");
  return response.data;
});

const getFlashDeals = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/flash-deals");
  return response.data;
});

const getCategories = cache(async (): Promise<Category[]> => {
  const response = await axios.get("/api/market-1/categories");
  return response.data;
});

const getJustForYou = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/just-for-you");
  return response.data;
});

const getNewArrivalList = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/new-arrivals");
  return response.data;
});

const getShops = cache(async (): Promise<Shop[]> => {
  const response = await axios.get("/api/market-1/shops");
  return response.data;
});

const getProducts = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/products");
  return response.data;
});

const getBlogs = cache(async (): Promise<Blog[]> => {
  const response = await axios.get("/api/market-1/blogs");
  return response.data;
});

const getServiceList = cache(async (): Promise<Service[]> => {
  const response = await axios.get("/api/market-1/services");
  return response.data;
});

export default {
  getMainCarousel,
  getFlashDeals,
  getNewArrivalList,
  getProducts,
  getShops,
  getBlogs,
  getCategories,
  getServiceList,
  getJustForYou
};
