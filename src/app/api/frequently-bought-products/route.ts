import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";

// GET /api/frequently-bought-products?slug=product-slug&limit=3
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const limit = parseInt(searchParams.get("limit") ?? "3");

  // Return products that were ordered together (same order as current product)
  // Fallback: return random published products excluding current
  let products: any[] = [];

  if (slug) {
    const product = await prisma.product.findUnique({ where: { slug }, select: { id: true } });

    if (product) {
      // Find products bought in the same orders
      const coOrdered = await prisma.orderItem.findMany({
        where: {
          order: {
            items: { some: { productId: product.id } }
          },
          productId: { not: product.id }
        },
        select: { productId: true },
        distinct: ["productId"],
        take: limit
      });

      const productIds = coOrdered.map((i) => i.productId).filter(Boolean) as string[];

      if (productIds.length > 0) {
        products = await prisma.product.findMany({
          where: { id: { in: productIds }, published: true },
          take: limit
        });
      }
    }
  }

  // Fallback to top-rated products
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
