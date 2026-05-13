import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// PUT /api/vendor/warehouses/:id
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const shop = await prisma.shop.findUnique({
    where: { userId: user!.id },
    select: { id: true }
  });

  if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  const { id } = await params;
  const body = await req.json();
  const { name, originDistrictId } = body as { name?: string; originDistrictId?: string };

  if (!name || !originDistrictId) {
    return NextResponse.json({ error: "name and originDistrictId are required" }, { status: 400 });
  }

  const warehouse = await prisma.shopWarehouse.findFirst({
    where: { id, shopId: shop.id },
    select: { id: true }
  });

  if (!warehouse) return NextResponse.json({ error: "Warehouse not found" }, { status: 404 });

  const updated = await prisma.shopWarehouse.update({
    where: { id },
    data: { name, originDistrictId: String(originDistrictId) }
  });

  return NextResponse.json(updated);
}

// DELETE /api/vendor/warehouses/:id
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const shop = await prisma.shop.findUnique({
    where: { userId: user!.id },
    select: { id: true }
  });

  if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  const { id } = await params;

  const warehouse = await prisma.shopWarehouse.findFirst({
    where: { id, shopId: shop.id },
    select: { id: true }
  });

  if (!warehouse) return NextResponse.json({ error: "Warehouse not found" }, { status: 404 });

  await prisma.shopWarehouse.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

