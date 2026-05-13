import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";

// GET /api/related-products?slug=product-slug&limit=4
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const limit = parseInt(searchParams.get("limit") ?? "4");

  let categoryIds: string[] = [];

  if (slug) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { categories: { select: { categoryId: true } } }
    });
    categoryIds = product?.categories.map((c) => c.categoryId) ?? [];
  }

  const products = await prisma.product.findMany({
    where: {
      published: true,
      ...(slug ? { slug: { not: slug } } : {}),
      ...(categoryIds.length > 0
        ? { categories: { some: { categoryId: { in: categoryIds } } } }
        : {})
    },
    take: limit,
    orderBy: { rating: "desc" }
  });

  // Fallback: if not enough related products, fill with top-rated
  if (products.length < limit) {
    const extra = await prisma.product.findMany({
      where: {
        published: true,
        ...(slug ? { slug: { not: slug } } : {}),
        id: { notIn: products.map((p) => p.id) }
      },
      take: limit - products.length,
      orderBy: { rating: "desc" }
    });
    products.push(...extra);
  }

  return NextResponse.json(products);
}
