import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { prisma } from "lib/prisma";
import { requireAuth } from "lib/auth-helpers";

// GET /api/users — current user profile
export async function GET() {
  const { user, response } = await requireAuth();
  if (response) return response;

  const profile = await prisma.user.findUnique({
    where: { id: user!.id },
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
      balance: true
    }
  });

  if (!profile) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({
    ...profile,
    name: { firstName: profile.firstName, lastName: profile.lastName }
  });
}

// POST /api/users — register new customer
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const [firstName, ...rest] = (name as string).trim().split(" ");
  const lastName = rest.join(" ") || "";
  const passwordHash = await bcryptjs.hash(password, 10);

  const user = await prisma.user.create({
    data: { firstName, lastName, email, password: passwordHash, role: "CUSTOMER" },
    select: { id: true, email: true, firstName: true, lastName: true, role: true }
  });

  return NextResponse.json(user, { status: 201 });
}

// PUT /api/users — update profile
export async function PUT(req: NextRequest) {
  const { user, response } = await requireAuth();
  if (response) return response;

  const body = await req.json();
  const { firstName, lastName, phone, avatar, dateOfBirth } = body;

  const updated = await prisma.user.update({
    where: { id: user!.id },
    data: {
      ...(firstName !== undefined && { firstName }),
      ...(lastName !== undefined && { lastName }),
      ...(phone !== undefined && { phone }),
      ...(avatar !== undefined && { avatar }),
      ...(dateOfBirth !== undefined && { dateOfBirth: new Date(dateOfBirth) })
    },
    select: {
      id: true,
      email: true,
      phone: true,
      avatar: true,
      firstName: true,
      lastName: true,
      dateOfBirth: true,
      role: true
    }
  });

  return NextResponse.json(updated);
}
