import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/vendor/orders
export async function GET() {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const shop = await prisma.shop.findUnique({
    where: { userId: user!.id },
    select: { id: true },
  });

  if (!shop) return NextResponse.json({ orders: [], total: 0, totalPages: 0 });

  const orders = await prisma.order.findMany({
    where: { items: { some: { product: { shopId: shop.id } } } },
    include: {
      items: {
        where: { product: { shopId: shop.id } },
        include: { product: { select: { slug: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ orders, total: orders.length, totalPages: 1 });
}
