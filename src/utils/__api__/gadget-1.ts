import { cache } from "react";
import axios from "utils/axiosInstance";
import Blog from "models/Blog.model";
import Product from "models/Product.model";
import { Banner } from "models/Gadget.model";
import Testimonial from "models/Testimonial.model";

const getFeaturedCategories = cache(
  async (): Promise<{ id: number; title: string; image: string; totalProduct: number }[]> => {
    const response = await axios.get("/api/gadget-1/featured-categories");
    return response.data;
  }
);

const getMostViewedList = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/gadget-1/products?tag=most-viewed");
  return response.data;
});

const getSaleBanner = cache(async (): Promise<Banner[]> => {
  const response = await axios.get("/api/gadget-1/sale-banners");
  return response.data;
});

const getBlogLists = cache(async (): Promise<Blog[]> => {
  const response = await axios.get("/api/gadget-1/blog-lists");
  return response.data;
});

const getTopPicksList = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/gadget-1/products?tag=top-picks");
  return response.data;
});

const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const response = await axios.get("/api/gadget-1/testimonials");
  return response.data;
});

export default {
  getBlogLists,
  getSaleBanner,
  getTestimonials,
  getTopPicksList,
  getMostViewedList,
  getFeaturedCategories
};
