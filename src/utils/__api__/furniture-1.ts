import { cache } from "react";
import axios from "utils/axiosInstance";
// CUSTOM DATA MODELS
import Product from "models/Product.model";
import CategoryNavList from "models/CategoryNavList.model";
import { FurnitureCarouselItem } from "models/Carousel.model";

const getTopNewProducts = cache(async () => {
  const response = await axios.get<Product[]>("/api/furniture-1/products?tag=new");
  return response.data;
});

const getTopSellingProducts = cache(async () => {
  const response = await axios.get<Product[]>("/api/furniture-1/products?tag=top-selling");
  return response.data;
});

const getFurnitureProducts = cache(async (category?: string) => {
  const response = await axios.get<Product[]>("/api/furniture-1/all-products", {
    params: { category }
  });

  return response.data;
});

const getFurnitureShopNavList = cache(async () => {
  const response = await axios.get<CategoryNavList[]>("/api/furniture-1/navigation");
  return response.data;
});

const getMainCarouselData = cache(async () => {
  const response = await axios.get<FurnitureCarouselItem[]>("/api/furniture-1/main-carousel");
  return response.data;
});

const getCategory = cache(async (category: string): Promise<{ title: string }> => {
  const response = await axios.get("/api/furniture-1/category", { params: { category } });
  return response.data;
});

export default {
  getCategory,
  getTopNewProducts,
  getMainCarouselData,
  getFurnitureProducts,
  getTopSellingProducts,
  getFurnitureShopNavList
};
