import { cache } from "react";
import { getServerAxios } from "utils/serverAxios";
// CUSTOM DATA MODEL
import User from "models/User.model";

const INFO_LIST = [
  { title: "16", subtitle: "All Orders" },
  { title: "02", subtitle: "Awaiting Payments" },
  { title: "00", subtitle: "Awaiting Shipment" },
  { title: "01", subtitle: "Awaiting Delivery" }
];

export const getUser = cache(async (): Promise<User> => {
  const api = await getServerAxios();
  const response = await api.get("/api/users");
  return response.data;
});

export const getUserAnalytics = cache(async (_id: string) => {
  return {
    balance: 0,
    type: "SILVER USER",
    orderSummary: INFO_LIST
  };
});

export default { getUser, getUserAnalytics };
