import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/vendor/recent-purchase
export async function GET() {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const shop = await prisma.shop.findUnique({
    where: { userId: user!.id },
    select: { id: true }
  });

  if (!shop) return NextResponse.json([]);

  const items = await prisma.orderItem.findMany({
    where: { product: { shopId: shop.id } },
    include: { order: { select: { id: true, status: true } } },
    orderBy: { order: { createdAt: "desc" } },
    take: 10
  });

  return NextResponse.json(
    items.map((item) => ({
      id: `#${item.order.id.slice(0, 8)}`,
      amount: item.productPrice * item.productQuantity,
      payment: item.order.status === "Delivered" ? "Success" : "Pending",
      product: item.productName
    }))
  );
}
