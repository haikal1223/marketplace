import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/admin/payouts — completed payouts summary
export async function GET() {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const payouts = await prisma.payoutRequest.findMany({
    where: { status: "Accepted" },
    include: { shop: { select: { name: true } } },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(payouts);
}
