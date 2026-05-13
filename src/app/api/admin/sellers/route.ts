import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/admin/sellers
export async function GET(req: NextRequest) {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const skip = (page - 1) * limit;

  const [sellers, total] = await Promise.all([
    prisma.shop.findMany({
      skip,
      take: limit,
      include: {
        user: { select: { firstName: true, lastName: true, email: true, avatar: true } },
        _count: { select: { products: true } }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.shop.count()
  ]);

  return NextResponse.json({ sellers, total, totalPages: Math.ceil(total / limit) });
}
