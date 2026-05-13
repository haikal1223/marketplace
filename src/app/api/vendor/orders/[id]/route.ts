import { NextRequest, NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

const ORDER_STATUSES = Object.values(OrderStatus);

// GET /api/vendor/orders/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const { id } = await params;
  const shop = await prisma.shop.findUnique({
    where: { userId: user!.id },
    select: { id: true },
  });

  if (!shop)
    return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  const order = await prisma.order.findFirst({
    where: {
      id,
      items: { some: { product: { shopId: shop.id } } },
    },
    include: {
      user: {
        select: { firstName: true, lastName: true, email: true, avatar: true },
      },
      items: {
        where: { product: { shopId: shop.id } },
        include: {
          product: { select: { slug: true } },
        },
      },
    },
  });

  if (!order)
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  return NextResponse.json(order);
}

// PUT /api/vendor/orders/[id] — update order status for vendor-owned order
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const status = body?.status as string | undefined;

  if (!status || !ORDER_STATUSES.includes(status as OrderStatus)) {
    return NextResponse.json(
      { error: "Invalid status", allowed: ORDER_STATUSES },
      { status: 400 },
    );
  }

  const shop = await prisma.shop.findUnique({
    where: { userId: user!.id },
    select: { id: true },
  });
  if (!shop)
    return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  const allowed = await prisma.order.findFirst({
    where: { id, items: { some: { product: { shopId: shop.id } } } },
    select: { id: true },
  });
  if (!allowed)
    return NextResponse.json({ error: "Order not found" }, { status: 404 });

  const data: {
    status: OrderStatus;
    isDelivered?: boolean;
    deliveredAt?: Date;
  } = {
    status: status as OrderStatus,
  };
  if (status === "Delivered") {
    data.isDelivered = true;
    data.deliveredAt = new Date();
  }

  const updated = await prisma.order.update({
    where: { id },
    data,
  });

  return NextResponse.json(updated);
}
