import { cache } from "react";
import { getServerAxios } from "utils/serverAxios";
import Brand from "models/Brand.model";
import Order from "models/Order.model";
import Review from "models/Review.model";
import Product from "models/Product.model";
import Category from "models/Category.model";

// dashboard
const getAllCard = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get("/api/admin/dashboard-cards");
  return response.data;
});

const recentPurchase = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get("/api/admin/recent-purchase");
  return response.data;
});

const stockOutProducts = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get("/api/admin/stock-out-products");
  return response.data;
});

const dashboardMetrics = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get("/api/admin/dashboard-metrics");
  return response.data;
});

// products
const products = cache(async (): Promise<Product[]> => {
  const api = await getServerAxios();
  const response = await api.get("/api/admin/products");
  return response.data.products ?? response.data;
});

const category = cache(async (): Promise<Category[]> => {
  const api = await getServerAxios();
  const response = await api.get("/api/admin/category");
  return response.data; // returns array directly
});

const brands = cache(async (): Promise<Brand[]> => {
  const api = await getServerAxios();
  const response = await api.get("/api/admin/brands");
  return response.data; // returns array directly
});

const reviews = cache(async (): Promise<Review[]> => {
  const api = await getServerAxios();
  const response = await api.get("/api/admin/reviews");
  return response.data.reviews ?? response.data;
});

// orders
const orders = cache(async (): Promise<Order[]> => {
  const api = await getServerAxios();
  const response = await api.get("/api/admin/orders");
  return response.data.orders ?? response.data;
});

const getOrder = cache(async (id: string): Promise<Order> => {
  const api = await getServerAxios();
  const response = await api.get(`/api/admin/orders/${id}`);
  return response.data;
});

// customers
const customers = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get("/api/admin/customers");
  return response.data.customers ?? response.data;
});

// refund request
const refundRequests = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get("/api/admin/refund-requests");
  return response.data.refunds ?? response.data;
});

// sellers
const sellers = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get("/api/admin/sellers");
  return response.data.sellers ?? response.data;
});

const packagePayments = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get("/api/admin/package-payments");
  return response.data;
});

const earningHistory = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get("/api/admin/earning-history");
  return response.data;
});

const payouts = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get("/api/admin/payouts");
  return response.data;
});

const payoutRequests = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get("/api/admin/payout-requests");
  return response.data.payouts ?? response.data;
});

export default {
  brands,
  orders,
  reviews,
  sellers,
  payouts,
  products,
  category,
  getOrder,
  customers,
  getAllCard,
  payoutRequests,
  recentPurchase,
  refundRequests,
  earningHistory,
  packagePayments,
  stockOutProducts,
  dashboardMetrics
};
