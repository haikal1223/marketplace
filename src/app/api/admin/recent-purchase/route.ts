import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/admin/recent-purchase
export async function GET() {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const orders = await prisma.order.findMany({
    include: { items: { take: 1 } },
    orderBy: { createdAt: "desc" },
    take: 10
  });

  return NextResponse.json(
    orders.map((o) => ({
      id: `#${o.id.slice(0, 8)}`,
      amount: o.totalPrice,
      payment: o.status === "Delivered" ? "Success" : "Pending",
      product: o.items[0]?.productName ?? "N/A"
    }))
  );
}
