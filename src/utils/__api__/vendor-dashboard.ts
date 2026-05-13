import { cache } from "react";
import { getServerAxios } from "utils/serverAxios";

const getAllCard = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get("/api/vendor/dashboard-cards");
  return response.data;
});

const recentPurchase = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get("/api/vendor/recent-purchase");
  return response.data;
});

const stockOutProducts = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get("/api/vendor/stock-out-products");
  return response.data;
});

const dashboardMetrics = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get("/api/vendor/dashboard-metrics");
  return response.data;
});

export default { getAllCard, recentPurchase, stockOutProducts, dashboardMetrics };
