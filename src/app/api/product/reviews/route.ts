import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";

// GET /api/product/reviews?productId=xxx
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  const reviews = await prisma.review.findMany({
    where: {
      published: true,
      ...(productId ? { productId } : {})
    },
    include: {
      customer: { select: { id: true, firstName: true, lastName: true, avatar: true } }
    },
    orderBy: { createdAt: "desc" },
    take: 20
  });

  return NextResponse.json(
    reviews.map((r) => ({
      ...r,
      name: `${r.customer.firstName} ${r.customer.lastName}`,
      imgUrl: r.customer.avatar,
      date: r.createdAt.toISOString()
    }))
  );
}
