import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/admin/reviews
export async function GET(req: NextRequest) {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const skip = (page - 1) * limit;

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      skip,
      take: limit,
      include: {
        product: { select: { title: true, thumbnail: true } },
        customer: { select: { firstName: true, lastName: true, avatar: true } }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.review.count()
  ]);

  return NextResponse.json({ reviews, total, totalPages: Math.ceil(total / limit) });
}
