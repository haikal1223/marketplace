import { cache } from "react";
import axios from "utils/axiosInstance";
import Product from "models/Product.model";
import Service from "models/Service.model";
import { HealthCarouselItem } from "models/Carousel.model";

const getNavigation = cache(async () => {
  const response = await axios.get("/api/health-beauty/navigation");
  return response.data;
});

const getTopNewProducts = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/health-beauty/products?tag=new");
  return response.data;
});

const getProducts = cache(async (category?: string): Promise<Product[]> => {
  const response = await axios.get("/api/health-beauty/products", { params: { category } });
  return response.data;
});

const getServices = cache(async (): Promise<Service[]> => {
  const response = await axios.get("/api/health-beauty/services");
  return response.data;
});

const getMainCarousel = cache(async (): Promise<HealthCarouselItem[]> => {
  const response = await axios.get("/api/health-beauty/main-carousel");
  return response.data;
});

const getCategory = cache(async (category: string): Promise<{ title: string }> => {
  const response = await axios.get("/api/health-beauty/category", { params: { category } });
  return response.data;
});

export default {
  getCategory,
  getProducts,
  getServices,
  getNavigation,
  getMainCarousel,
  getTopNewProducts
};
