import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";

// GET /api/shops/slugs — all shop slugs for static generation
export async function GET() {
  const shops = await prisma.shop.findMany({
    select: { slug: true }
  });

  return NextResponse.json(shops.map((s) => ({ params: { slug: s.slug } })));
}
