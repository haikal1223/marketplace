import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";

// GET /api/products/slug?slug=product-slug
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      shop: true,
      brand: { select: { id: true, name: true, slug: true } },
      categories: { include: { category: true } },
      reviews: {
        include: { customer: { select: { id: true, firstName: true, lastName: true, avatar: true } } },
        where: { published: true }
      }
    }
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...product,
    brand: product.brand?.name ?? null,
    categories: product.categories.map((pc) => pc.category.name)
  });
}
