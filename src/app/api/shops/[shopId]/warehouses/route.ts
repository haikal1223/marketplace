import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";

// GET /api/shops/:shopId/warehouses
export async function GET(_req: NextRequest, { params }: { params: Promise<{ shopId: string }> }) {
  const { shopId } = await params;

  const warehouses = await prisma.shopWarehouse.findMany({
    where: { shopId },
    select: { id: true, name: true, originDistrictId: true },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(warehouses);
}

