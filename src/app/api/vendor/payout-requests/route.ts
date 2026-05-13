import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";
import { fetchVendorPayoutRequestsForUser } from "lib/vendor-public-server";

// GET /api/vendor/payout-requests
export async function GET() {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const data = await fetchVendorPayoutRequestsForUser(user!.id);
  if (!data) return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  return NextResponse.json(data);
}

// POST /api/vendor/payout-requests — request payout
export async function POST(req: NextRequest) {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const shop = await prisma.shop.findUnique({ where: { userId: user!.id } });
  if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  const body = await req.json();
  const { amount, message } = body;

  const payout = await prisma.payoutRequest.create({
    data: { shopId: shop.id, amount, message },
  });

  return NextResponse.json(payout, { status: 201 });
}
