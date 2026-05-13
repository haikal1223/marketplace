import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/user-list — admin: list all users
export async function GET() {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      phone: true,
      avatar: true,
      firstName: true,
      lastName: true,
      dateOfBirth: true,
      verified: true,
      role: true,
      createdAt: true
    },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(
    users.map((u) => ({
      ...u,
      name: { firstName: u.firstName, lastName: u.lastName }
    }))
  );
}
