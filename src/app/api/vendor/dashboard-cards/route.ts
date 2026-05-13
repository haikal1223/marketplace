import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/vendor/dashboard-cards
export async function GET() {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const shop = await prisma.shop.findUnique({
    where: { userId: user!.id },
    select: { id: true }
  });

  if (!shop) {
    return NextResponse.json([
      { id: 1, title: "Order", amount1: 0, amount2: 0, color: "info.main", percentage: "0%" },
      { id: 2, title: "Revenue", amount1: 0, amount2: 0, color: "success.main", percentage: "0%" },
      { id: 3, title: "Products", amount1: 0, amount2: 0, color: "warning.main", percentage: "0%" },
      { id: 4, title: "Reviews", amount1: 0, amount2: 0, color: "error.main", percentage: "0%" }
    ]);
  }

  const [orderCount, revenueAgg, productCount, reviewCount] = await Promise.all([
    prisma.order.count({
      where: { items: { some: { product: { shopId: shop.id } } } }
    }),
    prisma.orderItem.aggregate({
      where: { product: { shopId: shop.id } },
      _sum: { productPrice: true }
    }),
    prisma.product.count({ where: { shopId: shop.id } }),
    prisma.review.count({ where: { product: { shopId: shop.id } } })
  ]);

  const revenue = revenueAgg._sum.productPrice ?? 0;

  return NextResponse.json([
    { id: 1, title: "Order", amount1: orderCount, amount2: orderCount, color: "info.main", percentage: "0%" },
    { id: 2, title: "Revenue", amount1: revenue, amount2: 0, color: "success.main", percentage: "0%" },
    { id: 3, title: "Products", amount1: productCount, amount2: productCount, color: "warning.main", percentage: "0%" },
    { id: 4, title: "Reviews", amount1: reviewCount, amount2: reviewCount, color: "error.main", percentage: "0%" }
  ]);
}
