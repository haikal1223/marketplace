import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireAuth } from "lib/auth-helpers";

// GET /api/users/dashboard-counts — counts for customer dashboard sidebar
export async function GET() {
  const { user, response } = await requireAuth();
  if (response) return response;

  const uid = user!.id;
  const wishlistModel = (prisma as any).wishlistItem;

  try {
    const [orders, wishlist, tickets, addresses, paymentMethods] = await Promise.all([
      prisma.order.count({ where: { userId: uid } }),
      wishlistModel ? wishlistModel.count({ where: { userId: uid } }) : Promise.resolve(0),
      prisma.ticket.count({ where: { userId: uid } }),
      prisma.address.count({ where: { userId: uid } }),
      prisma.payment.count({ where: { userId: uid } })
    ]);

    return NextResponse.json({
      orders,
      wishlist,
      tickets,
      addresses,
      paymentMethods
    });
  } catch (error: any) {
    // P2021 = table doesn't exist yet (migration not applied)
    if (error?.code === "P2021") {
      const [orders, tickets, addresses, paymentMethods] = await Promise.all([
        prisma.order.count({ where: { userId: uid } }),
        prisma.ticket.count({ where: { userId: uid } }),
        prisma.address.count({ where: { userId: uid } }),
        prisma.payment.count({ where: { userId: uid } })
      ]);

      return NextResponse.json({
        orders,
        wishlist: 0,
        tickets,
        addresses,
        paymentMethods
      });
    }

    throw error;
  }
}
