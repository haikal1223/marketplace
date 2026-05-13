import { cache } from "react";
import { getServerAxios } from "utils/serverAxios";

const earningHistory = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get("/api/vendor/earning-history");
  const rows = Array.isArray(response.data) ? response.data : [];

  return rows.map((row: any, index: number) => {
    const amount = Number(row?.amount ?? 0);
    const sellerEarning = Number.isFinite(Number(row?.sellerEarning))
      ? Number(row.sellerEarning)
      : Number.isFinite(amount)
        ? amount
        : 0;
    const adminCommission = Number.isFinite(Number(row?.adminCommission))
      ? Number(row.adminCommission)
      : 0;
    const date = row?.date ? new Date(row.date).toLocaleDateString("en-GB") : "-";

    return {
      no: Number.isFinite(Number(row?.no)) ? Number(row.no) : index + 1,
      orderNo:
        typeof row?.orderNo === "string" && row.orderNo.length > 0
          ? row.orderNo
          : row?.date
            ? `EARN-${String(row.date).replaceAll("-", "")}`
            : `EARN-${index + 1}`,
      shopName: "My Shop",
      sellerEarning,
      adminCommission,
      date
    };
  });
});

const payouts = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get("/api/vendor/payouts");
  const rows = Array.isArray(response.data) ? response.data : [];

  return rows.map((row: any, index: number) => ({
    no: index + 1,
    amount: Number(row?.amount ?? 0),
    payment: row?.status ?? "Accepted",
    date: row?.createdAt ? new Date(row.createdAt).toLocaleDateString("en-GB") : "-",
    sellerInfo: row?.message ?? "-"
  }));
});

const refundRequests = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get("/api/vendor/refund-requests");
  const rows = Array.isArray(response.data) ? response.data : [];

  return rows.map((row: any) => ({
    name: row?.productName ?? "-",
    image: row?.productImage ?? "/assets/images/products/placeholder.png",
    amount: Number(row?.amount ?? 0),
    status: row?.status ?? "Pending",
    orderNo: row?.orderNo ?? row?.id ?? "-",
    shopName: row?.shopName ?? "My Shop"
  }));
});

export default { earningHistory, payouts, refundRequests };
