import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

function getMonthLabels() {
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
}

// GET /api/vendor/dashboard-metrics
export async function GET() {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const shop = await prisma.shop.findUnique({ where: { userId: user!.id }, select: { id: true } });
  if (!shop) {
    return NextResponse.json({
      salesSummary: { weeklySales: 0, weeklySalesPercent: "0.00%", totalOrder: 0, totalOrderPercent: "0.00%", productShare: 0, productSharePercent: "0.00%", marketShareTotal: 0, marketSharePercent: "0.00%" },
      analytics: { categories: getMonthLabels(), sales: new Array(12).fill(0), expense: new Array(12).fill(0) }
    });
  }

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

  const [yearItems, thisWeekItems, prevWeekItems, thisMonthOrders, prevMonthOrders, totalProducts, inStockProducts] =
    await Promise.all([
      prisma.orderItem.findMany({
        where: { product: { shopId: shop.id }, order: { createdAt: { gte: startOfYear } } },
        include: { order: { select: { createdAt: true } } }
      }),
      prisma.orderItem.aggregate({
        where: { product: { shopId: shop.id }, order: { createdAt: { gte: startOfWeek } } },
        _sum: { productPrice: true }
      }),
      prisma.orderItem.aggregate({
        where: { product: { shopId: shop.id }, order: { createdAt: { gte: startOfPrevWeek, lte: endOfPrevWeek } } },
        _sum: { productPrice: true }
      }),
      prisma.order.count({
        where: { createdAt: { gte: startOfMonth }, items: { some: { product: { shopId: shop.id } } } }
      }),
      prisma.order.count({
        where: { createdAt: { gte: startOfPrevMonth, lte: endOfPrevMonth }, items: { some: { product: { shopId: shop.id } } } }
      }),
      prisma.product.count({ where: { shopId: shop.id } }),
      prisma.product.count({ where: { shopId: shop.id, stock: { gt: 0 } } })
    ]);

  const monthlySales = new Array(12).fill(0);
  for (const item of yearItems) {
    const month = new Date(item.order.createdAt).getMonth();
    monthlySales[month] += item.productPrice * item.productQuantity;
  }
  const monthlyExpense = monthlySales.map((value) => Math.round(value * 0.05));

  const weeklySales = thisWeekItems._sum.productPrice ?? 0;
  const prevWeeklySales = prevWeekItems._sum.productPrice ?? 0;
  const weeklySalesPercent = prevWeeklySales > 0 ? `${(((weeklySales - prevWeeklySales) / prevWeeklySales) * 100).toFixed(2)}%` : "0.00%";
  const totalOrderPercent = prevMonthOrders > 0 ? `${(((thisMonthOrders - prevMonthOrders) / prevMonthOrders) * 100).toFixed(2)}%` : "0.00%";
  const productShare = totalProducts > 0 ? Number(((inStockProducts / totalProducts) * 100).toFixed(2)) : 0;
  const marketShareTotal = monthlySales.reduce((a, b) => a + b, 0);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [todayVisit, todaySalesAgg] = await Promise.all([
    prisma.order.count({
      where: { createdAt: { gte: startOfToday }, items: { some: { product: { shopId: shop.id } } } }
    }),
    prisma.orderItem.aggregate({
      where: { product: { shopId: shop.id }, order: { createdAt: { gte: startOfToday } } },
      _sum: { productPrice: true }
    })
  ]);

  return NextResponse.json({
    welcome: {
      userName: user?.name ?? "Vendor",
      todayVisit,
      todaySales: todaySalesAgg._sum.productPrice ?? 0
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
