import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";

// GET /api/products — list all published products (used by admin)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: limit,
      include: {
        shop: { select: { id: true, name: true, slug: true } },
        brand: { select: { id: true, name: true } },
        categories: { include: { category: { select: { id: true, name: true, slug: true } } } }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.product.count()
  ]);

  return NextResponse.json({
    products: products.map((p) => ({ ...p, categories: p.categories.map((pc) => pc.category) })),
    total,
    totalPages: Math.ceil(total / limit),
    page
  });
}
