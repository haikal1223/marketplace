import { NextRequest, NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

const ORDER_STATUSES = Object.values(OrderStatus);

// GET /api/admin/orders/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: {
        select: { firstName: true, lastName: true, email: true, avatar: true },
      },
      items: true,
    },
  });

  if (!order)
    return NextResponse.json({ error: "Order not found" }, { status: 404 });

  return NextResponse.json(order);
}

// PUT /api/admin/orders/[id] — update order status
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { response } = await requireRole("ADMIN");
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
