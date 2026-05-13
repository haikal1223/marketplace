import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/vendor/refund-requests
export async function GET() {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const shop = await prisma.shop.findUnique({ where: { userId: user!.id } });
  if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  const refunds = await prisma.refundRequest.findMany({
    where: { shopId: shop.id },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(refunds);
}

// POST /api/vendor/refund-requests — create refund request
export async function POST(req: NextRequest) {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const shop = await prisma.shop.findUnique({ where: { userId: user!.id } });
  if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  const body = await req.json();
  const { orderId, amount, productName, productImage, orderNo } = body;

  const refund = await prisma.refundRequest.create({
    data: { shopId: shop.id, orderId, amount, productName, productImage, orderNo }
  });

  return NextResponse.json(refund, { status: 201 });
}
