import { cache } from "react";
import { getServerAxios } from "utils/serverAxios";
import Payment from "models/Payment.model";
import { auth } from "lib/auth";

function maskCardNo(cardNo: string) {
  const trimmed = String(cardNo ?? "").replace(/\s+/g, "");
  if (trimmed.length <= 4) return trimmed;
  return `${trimmed.slice(0, 4)} **** **** ${trimmed.slice(-4)}`;
}

function inferPaymentMethod(cardNo: string) {
  const n = String(cardNo ?? "");
  if (n.startsWith("4")) return "Visa";
  if (n.startsWith("5")) return "Mastercard";
  if (n.startsWith("3")) return "Amex";
  return "Card";
}

const getPayments = cache(
  async (page = 0): Promise<{ payments: Payment[]; totalPages: number }> => {
    const PAGE_SIZE = 5;
    const PAGE_NO = page - 1;

    const api = await getServerAxios();
    const session = await auth();
    const userName = session?.user?.name ?? "User";
    const res = await api.get("/api/payments");
    const rows = Array.isArray(res.data) ? res.data : [];
    const mapped: Payment[] = rows.map((p: any) => ({
      id: p.id,
      exp: p.exp,
      cvc: "",
      user: userName,
      payment_method: p.paymentMethod || inferPaymentMethod(p.cardNo),
      card_no: maskCardNo(p.cardNo)
    }));

    const totalPages = Math.ceil(mapped.length / PAGE_SIZE);
    const currentPayments = mapped.slice(PAGE_NO * PAGE_SIZE, (PAGE_NO + 1) * PAGE_SIZE);

    const result = { payments: currentPayments, totalPages };
    return result;
  }
);

const getPayment = cache(async (id: string) => {
  const api = await getServerAxios();
  const session = await auth();
  const userName = session?.user?.name ?? "User";
  const response = await api.get(`/api/payments/${id}`);
  const p = response.data;
  if (!p) return null;
  return {
    id: p.id,
    exp: p.exp,
    cvc: "",
    user: userName,
    payment_method: p.paymentMethod || inferPaymentMethod(p.cardNo),
    card_no: p.cardNo
  } as Payment;
});

export default { getPayment, getPayments };
