import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireAuth } from "lib/auth-helpers";

// GET /api/users/order-ids — for static generation of order detail pages
export async function GET() {
  const { user, response } = await requireAuth();
  if (response) return response;

  const orders = await prisma.order.findMany({
    where: { userId: user!.id },
    select: { id: true }
  });

  return NextResponse.json(orders.map((o) => ({ params: { id: o.id } })));
}
