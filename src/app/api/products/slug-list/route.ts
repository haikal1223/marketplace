import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";

// GET /api/products/slug-list — returns all product slugs for static generation
export async function GET() {
  const products = await prisma.product.findMany({
    where: { published: true },
    select: { slug: true }
  });

  return NextResponse.json(products.map((p) => ({ params: { slug: p.slug } })));
}
