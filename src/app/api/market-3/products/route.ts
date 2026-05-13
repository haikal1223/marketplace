import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const products = await prisma.product.findMany({
    where: { published: true },
    include: {
      shop: { select: { id: true, name: true, slug: true } },
      categories: { include: { category: { select: { id: true, name: true, slug: true } } } }
    },
    orderBy: type ? { createdAt: "desc" } : { rating: "desc" },
    take: 20
  });

  return NextResponse.json(
    products.map((p) => ({
      ...p,
      categories: p.categories.map((pc) => pc.category)
    }))
  );
}
