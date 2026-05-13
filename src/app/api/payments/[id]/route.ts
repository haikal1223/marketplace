import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireAuth } from "lib/auth-helpers";

// GET /api/payments/[id]
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { user, response } = await requireAuth();
  if (response) return response;
  const { id } = await params;

  const payment = await prisma.payment.findFirst({
    where: { id, userId: user!.id }
  });
  if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  return NextResponse.json(payment);
}

// PUT /api/payments/[id]
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { user, response } = await requireAuth();
  if (response) return response;
  const { id } = await params;

  const existing = await prisma.payment.findFirst({ where: { id, userId: user!.id } });
  if (!existing) return NextResponse.json({ error: "Payment not found" }, { status: 404 });

  const body = await req.json();
  const { exp, cardNo, paymentMethod } = body;

  const updated = await prisma.payment.update({
    where: { id },
    data: {
      ...(exp !== undefined && { exp }),
      ...(cardNo !== undefined && { cardNo }),
      ...(paymentMethod !== undefined && { paymentMethod })
    }
  });
  return NextResponse.json(updated);
}

// DELETE /api/payments/[id]
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { user, response } = await requireAuth();
  if (response) return response;
  const { id } = await params;

  const existing = await prisma.payment.findFirst({ where: { id, userId: user!.id } });
  if (!existing) return NextResponse.json({ error: "Payment not found" }, { status: 404 });

  await prisma.payment.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
