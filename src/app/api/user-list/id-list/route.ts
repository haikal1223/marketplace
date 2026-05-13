import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/user-list/id-list
export async function GET() {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const users = await prisma.user.findMany({ select: { id: true } });
  return NextResponse.json(users.map((u) => ({ params: { id: u.id } })));
}
