import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/vendor/earning-history
export async function GET() {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const shop = await prisma.shop.findUnique({
    where: { userId: user!.id },
    select: { id: true }
  });
  if (!shop) return NextResponse.json([]);

  const rows = await prisma.orderItem.findMany({
    where: { product: { shopId: shop.id } },
    include: { order: { select: { createdAt: true } } }
  });
  const commissionPercent = Number(process.env.ADMIN_COMMISSION_PERCENT ?? 5);

  const grouped = new Map<string, number>();
  for (const item of rows) {
    const key = item.order.createdAt.toISOString().slice(0, 10);
    const amount = item.productPrice * item.productQuantity;
    grouped.set(key, (grouped.get(key) ?? 0) + amount);
  }

  return NextResponse.json(
    Array.from(grouped.entries())
      .map(([date, amount], index) => {
        const adminCommission = Math.round(amount * (commissionPercent / 100));
        const sellerEarning = amount - adminCommission;
        return {
          no: index + 1,
          date,
          orderNo: `EARN-${date.replaceAll("-", "")}`,
          amount,
          adminCommission,
          sellerEarning
        };
      })
      .sort((a, b) => (a.date > b.date ? 1 : -1))
  );
}
