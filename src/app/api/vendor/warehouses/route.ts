import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/vendor/warehouses
export async function GET() {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const shop = await prisma.shop.findUnique({
    where: { userId: user!.id },
    select: { id: true }
  });

  if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  const warehouses = await prisma.shopWarehouse.findMany({
    where: { shopId: shop.id },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(warehouses);
}

// POST /api/vendor/warehouses
export async function POST(req: NextRequest) {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const shop = await prisma.shop.findUnique({
    where: { userId: user!.id },
    select: { id: true }
  });

  if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  const body = await req.json();
  const { name, originDistrictId } = body as { name?: string; originDistrictId?: string };

  if (!name || !originDistrictId) {
    return NextResponse.json({ error: "name and originDistrictId are required" }, { status: 400 });
  }

  try {
    const existingCount = await prisma.shopWarehouse.count({ where: { shopId: shop.id } });
    if (existingCount >= 1) {
      return NextResponse.json(
        { error: "Shop hanya boleh punya 1 warehouse pengiriman." },
        { status: 400 }
      );
    }

    const created = await prisma.shopWarehouse.create({
      data: {
        shopId: shop.id,
        name,
        originDistrictId: String(originDistrictId)
      }
    });

    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    // Most common case: unique constraint on (shopId, name)
    return NextResponse.json({ error: e?.message ?? "Failed to create warehouse" }, { status: 400 });
  }
}

