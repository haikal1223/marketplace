import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/admin/brands — vendors need read access for product brand picker
export async function GET() {
  const { response } = await requireRole("ADMIN", "VENDOR");
  if (response) return response;

  const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(brands);
}

// POST /api/admin/brands
export async function POST(req: NextRequest) {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const body = await req.json();
  const brand = await prisma.brand.create({ data: body });
  return NextResponse.json(brand, { status: 201 });
}
