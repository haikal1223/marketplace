import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";

// GET /api/products/search?name=keyword&category=slug
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const category = searchParams.get("category");

  const products = await prisma.product.findMany({
    where: {
      published: true,
      ...(name ? { title: { contains: name, mode: "insensitive" } } : {}),
      ...(category
        ? {
            categories: {
              some: { category: { slug: { contains: category, mode: "insensitive" } } }
            }
          }
        : {})
    },
    select: { title: true, slug: true, thumbnail: true, price: true },
    take: 20
  });

  return NextResponse.json(products.map((p) => p.title));
}
