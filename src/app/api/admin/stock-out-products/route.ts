import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/admin/stock-out-products
export async function GET() {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const products = await prisma.product.findMany({
    where: { status: "out-of-stock" },
    select: { title: true, price: true },
    take: 10
  });

  return NextResponse.json(
    products.map((p) => ({ product: p.title, amount: p.price, stock: "00" }))
  );
}
