import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireAuth } from "lib/auth-helpers";

// GET /api/payments
export async function GET() {
  const { user, response } = await requireAuth();
  if (response) return response;

  const rows = await prisma.payment.findMany({
    where: { userId: user!.id },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(rows);
}

// POST /api/payments
export async function POST(req: NextRequest) {
  const { user, response } = await requireAuth();
  if (response) return response;

  const body = await req.json();
  const { exp, cardNo, paymentMethod } = body;
  if (!exp || !cardNo || !paymentMethod) {
    return NextResponse.json({ error: "exp, cardNo and paymentMethod are required" }, { status: 400 });
  }

  const payment = await prisma.payment.create({
    data: {
      userId: user!.id,
      exp,
      cardNo,
      paymentMethod
    }
  });

  return NextResponse.json(payment, { status: 201 });
}
