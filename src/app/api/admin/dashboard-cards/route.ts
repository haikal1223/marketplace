import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/admin/dashboard-cards
export async function GET() {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const [orderCount, totalRevenue, customerCount, shopCount] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { totalPrice: true } }),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.shop.count()
  ]);

  return NextResponse.json([
    { id: 1, title: "Order", amount1: orderCount, amount2: orderCount, color: "info.main", percentage: "0%" },
    { id: 2, title: "Revenue", amount1: totalRevenue._sum.totalPrice ?? 0, amount2: 0, color: "success.main", percentage: "0%" },
    { id: 3, title: "Customers", amount1: customerCount, amount2: customerCount, color: "warning.main", percentage: "0%" },
    { id: 4, title: "Shops", amount1: shopCount, amount2: shopCount, color: "error.main", percentage: "0%" }
  ]);
}
