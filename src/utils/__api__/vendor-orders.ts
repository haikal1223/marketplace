import { cache } from "react";
import axios from "axios";
import { getServerAxios } from "utils/serverAxios";
import Order from "models/Order.model";

const orders = cache(async (): Promise<Order[]> => {
  const api = await getServerAxios();
  const response = await api.get("/api/vendor/orders");
  return response.data.orders ?? response.data;
});

const getOrder = cache(async (id: string): Promise<Order | null> => {
  try {
    const api = await getServerAxios();
    const response = await api.get(`/api/vendor/orders/${id}`);
    return response.data as Order;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 404) return null;
    throw err;
  }
});

export default { orders, getOrder };
