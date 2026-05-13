import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

function getMonthLabels() {
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
}

// GET /api/admin/dashboard-metrics
export async function GET() {
  const { user, response } = await requireRole("ADMIN");
  if (response) return response;

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - 6);
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfPrevWeek = new Date(startOfWeek);
  startOfPrevWeek.setDate(startOfWeek.getDate() - 7);
  const endOfPrevWeek = new Date(startOfWeek);
  endOfPrevWeek.setMilliseconds(-1);

  const [ordersOfYear, thisWeekRevenue, prevWeekRevenue, thisMonthOrders, prevMonthOrders, totalProducts, inStockProducts] =
    await Promise.all([
      prisma.order.findMany({
        where: { createdAt: { gte: startOfYear } },
        select: { createdAt: true, totalPrice: true }
      }),
      prisma.order.aggregate({ where: { createdAt: { gte: startOfWeek } }, _sum: { totalPrice: true } }),
      prisma.order.aggregate({ where: { createdAt: { gte: startOfPrevWeek, lte: endOfPrevWeek } }, _sum: { totalPrice: true } }),
      prisma.order.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.order.count({ where: { createdAt: { gte: startOfPrevMonth, lte: endOfPrevMonth } } }),
      prisma.product.count(),
      prisma.product.count({ where: { stock: { gt: 0 } } })
    ]);

  const monthlySales = new Array(12).fill(0);
  for (const order of ordersOfYear) {
    const month = new Date(order.createdAt).getMonth();
    monthlySales[month] += order.totalPrice;
  }
  const monthlyExpense = monthlySales.map((value) => Math.round(value * 0.05));

  const weeklySales = thisWeekRevenue._sum.totalPrice ?? 0;
  const prevWeeklySales = prevWeekRevenue._sum.totalPrice ?? 0;
  const weeklySalesPercent = prevWeeklySales > 0 ? `${(((weeklySales - prevWeeklySales) / prevWeeklySales) * 100).toFixed(2)}%` : "0.00%";
  const totalOrderPercent = prevMonthOrders > 0 ? `${(((thisMonthOrders - prevMonthOrders) / prevMonthOrders) * 100).toFixed(2)}%` : "0.00%";
  const productShare = totalProducts > 0 ? Number(((inStockProducts / totalProducts) * 100).toFixed(2)) : 0;
  const marketShareTotal = monthlySales.reduce((a, b) => a + b, 0);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [todayVisit, todaySalesAgg] = await Promise.all([
    prisma.order.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.order.aggregate({ where: { createdAt: { gte: startOfToday } }, _sum: { totalPrice: true } })
  ]);

  return NextResponse.json({
    welcome: {
      userName: user?.name ?? "Admin",
      todayVisit,
      todaySales: todaySalesAgg._sum.totalPrice ?? 0
    },
    salesSummary: {
      weeklySales,
      weeklySalesPercent,
      totalOrder: thisMonthOrders,
      totalOrderPercent,
      productShare,
      productSharePercent: "0.00%",
      marketShareTotal,
      marketSharePercent: "0.00%"
    },
    analytics: {
      categories: getMonthLabels(),
      sales: monthlySales,
      expense: monthlyExpense
    }
  });
}
