import { cache } from "react";
import axios from "utils/axiosInstance";
import Brand from "models/Brand.model";
import Product from "models/Product.model";
import Service from "models/Service.model";
import { MainCarouselItem } from "models/Market-2.model";
import Category from "models/Category.model";
import Blog from "models/Blog.model";
import Shop from "models/Shop.model";

const getProducts = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-2/products");
  return response.data;
});

const getFlashProducts = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-2/flash-deals");
  return response.data;
});

const getTopRatedProducts = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-2/top-rated");
  return response.data;
});

const getServices = cache(async (): Promise<Service[]> => {
  const response = await axios.get("/api/market-2/service");
  return response.data;
});

const getCategories = cache(async () => {
  const response = await axios.get<Category[]>("/api/market-2/categories");
  return response.data;
});

const getBrands = cache(async (): Promise<Brand[]> => {
  const response = await axios.get("/api/market-2/brand");
  return response.data;
});

const getShops = cache(async (): Promise<Shop[]> => {
  const response = await axios.get("/api/market-2/shops");
  return response.data;
});

const getMainCarouselData = cache(async (): Promise<MainCarouselItem[]> => {
  const response = await axios.get("/api/market-2/main-carousel");
  return response.data;
});

const getBlogs = cache(async (): Promise<Blog[]> => {
  const response = await axios.get("/api/market-2/articles");
  return response.data;
});

const getClients = cache(async (): Promise<Brand[]> => {
  const response = await axios.get("/api/market-2/clients");
  return response.data;
});

export default {
  getBrands,
  getServices,
  getCategories,
  getFlashProducts,
  getTopRatedProducts,
  getMainCarouselData,
  getBlogs,
  getProducts,
  getShops,
  getClients
};
