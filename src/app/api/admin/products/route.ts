import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/admin/products
export async function GET(req: NextRequest) {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: limit,
      include: {
        shop: { select: { name: true } },
        categories: { include: { category: { select: { name: true } } } }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.product.count()
  ]);

  return NextResponse.json({ products, total, totalPages: Math.ceil(total / limit) });
}
