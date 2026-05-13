import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/vendor/product-reviews
export async function GET() {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const shop = await prisma.shop.findUnique({ where: { userId: user!.id } });
  if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  const reviews = await prisma.review.findMany({
    where: { product: { shopId: shop.id } },
    include: {
      product: { select: { id: true, title: true, thumbnail: true } },
      customer: { select: { id: true, firstName: true, lastName: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(
    reviews.map((r) => ({
      rating: r.rating,
      comment: r.comment,
      name: r.product.title,
      image: r.product.thumbnail,
      customer: `${r.customer.firstName} ${r.customer.lastName}`
    }))
  );
}
