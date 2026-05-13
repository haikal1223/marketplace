import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/admin/refund-requests
export async function GET(req: NextRequest) {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const skip = (page - 1) * limit;

  const [refunds, total] = await Promise.all([
    prisma.refundRequest.findMany({
      skip,
      take: limit,
      include: { shop: { select: { name: true } } },
      orderBy: { createdAt: "desc" }
    }),
    prisma.refundRequest.count()
  ]);

  return NextResponse.json({ refunds, total, totalPages: Math.ceil(total / limit) });
}

// PUT /api/admin/refund-requests — update status
export async function PUT(req: NextRequest) {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const body = await req.json();
  const { id, status } = body;

  const updated = await prisma.refundRequest.update({ where: { id }, data: { status } });
  return NextResponse.json(updated);
}
