import { cache } from "react";
import axios from "utils/axiosInstance";
import Product from "models/Product.model";
import Category from "models/Category.model";
import products from "data/product-database";

const getCategories = cache(async (): Promise<Category[]> => {
  const response = await axios.get("/api/sales-1/categories");
  return response.data;
});

const getCategoriesTwo = cache(async (): Promise<Category[]> => {
  const response = await axios.get("/api/sales-2/categories");
  return response.data;
});

const getProducts = cache(
  async (
    page = 1,
    category?: string
  ): Promise<{
    products: Product[];
    totalProducts: number;
    pageSize: number;
  }> => {
    const PAGE_SIZE = 20;

    let currentProducts = [];
    let totalProducts = products.length;

    if (category) {
      let categorized = products
        .map((pro) => (pro.categories.includes(category) ? pro : null))
        .filter(Boolean);

      if (categorized.length === 0) {
        categorized = products.slice(
          Math.floor(Math.random() * 10),
          Math.floor((Math.random() + 1) * 100) + 20
        );
      }

      totalProducts = categorized.length;
      currentProducts = categorized.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
    } else {
      currentProducts = products.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
    }

    const data = {
      totalProducts,
      pageSize: PAGE_SIZE,
      products: currentProducts as Product[]
    };

    return data;
  }
);

export default { getCategories, getProducts, getCategoriesTwo };
