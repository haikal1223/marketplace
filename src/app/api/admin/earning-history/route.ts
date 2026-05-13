import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/admin/earning-history
export async function GET() {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const orders = await prisma.order.groupBy({
    by: ["createdAt"],
    _sum: { totalPrice: true },
    orderBy: { createdAt: "asc" }
  });

  return NextResponse.json(
    orders.map((o) => ({
      date: o.createdAt,
      amount: o._sum.totalPrice ?? 0
    }))
  );
}
