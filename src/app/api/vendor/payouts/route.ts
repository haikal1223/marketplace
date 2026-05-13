import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/vendor/payouts
export async function GET() {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const shop = await prisma.shop.findUnique({
    where: { userId: user!.id },
    select: { id: true }
  });
  if (!shop) return NextResponse.json([]);

  const payouts = await prisma.payoutRequest.findMany({
    where: { shopId: shop.id, status: "Accepted" },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(payouts);
}
