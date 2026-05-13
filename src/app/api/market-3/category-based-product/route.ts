import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";

const TAG_CATEGORY_MAP: Record<string, string> = {
  electronics: "Electronics",
  men: "Men's Fashion",
  women: "Women's Fashion"
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get("tag") ?? "electronics";
  const categoryTitle = TAG_CATEGORY_MAP[tag] ?? "Electronics";

  const category = await prisma.category.findFirst({
    where: { name: { contains: categoryTitle, mode: "insensitive" } },
    include: { children: { select: { name: true } } }
  });

  const products = await prisma.product.findMany({
    where: {
      published: true,
      ...(category
        ? {
            categories: { some: { categoryId: category.id } }
          }
        : {})
    },
    include: {
      shop: { select: { id: true, name: true, slug: true } }
    },
    take: 10
  });

  return NextResponse.json({
    category: {
      title: categoryTitle,
      children: category?.children.map((c) => c.name) ?? []
    },
    products
  });
}
