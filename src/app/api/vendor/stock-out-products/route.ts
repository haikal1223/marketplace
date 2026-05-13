import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/vendor/stock-out-products
export async function GET() {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const shop = await prisma.shop.findUnique({
    where: { userId: user!.id },
    select: { id: true }
  });

  if (!shop) return NextResponse.json([]);

  const products = await prisma.product.findMany({
    where: { shopId: shop.id, OR: [{ stock: { lte: 0 } }, { status: "out-of-stock" }] },
    select: { title: true, price: true, stock: true },
    take: 10
  });

  return NextResponse.json(
    products.map((p) => ({ product: p.title, amount: p.price, stock: String(p.stock) }))
  );
}
