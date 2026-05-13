import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/admin/orders
export async function GET(req: NextRequest) {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      skip,
      take: limit,
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        items: true
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.order.count()
  ]);

  return NextResponse.json({ orders, total, totalPages: Math.ceil(total / limit) });
}
