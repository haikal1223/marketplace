import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/admin/customers
export async function GET(req: NextRequest) {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const skip = (page - 1) * limit;

  const [customers, total] = await Promise.all([
    prisma.user.findMany({
      where: { role: "CUSTOMER" },
      skip,
      take: limit,
      select: {
        id: true,
        email: true,
        phone: true,
        avatar: true,
        firstName: true,
        lastName: true,
        verified: true,
        createdAt: true
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.user.count({ where: { role: "CUSTOMER" } })
  ]);

  return NextResponse.json({ customers, total, totalPages: Math.ceil(total / limit) });
}
