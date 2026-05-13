import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/admin/category — vendors need read access for product/category pickers
export async function GET() {
  const { response } = await requireRole("ADMIN", "VENDOR");
  if (response) return response;

  const categories = await prisma.category.findMany({
    include: { children: true },
    where: { parentId: null },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(categories);
}

// POST /api/admin/category
export async function POST(req: NextRequest) {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const body = await req.json();
  const category = await prisma.category.create({ data: body });
  return NextResponse.json(category, { status: 201 });
}
