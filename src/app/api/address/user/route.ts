import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireAuth } from "lib/auth-helpers";

// GET /api/address/user — list user addresses
export async function GET() {
  const { user, response } = await requireAuth();
  if (response) return response;

  const addresses = await prisma.address.findMany({
    where: { userId: user!.id }
  });

  return NextResponse.json(addresses);
}

// POST /api/address/user — create new address
export async function POST(req: NextRequest) {
  const { user, response } = await requireAuth();
  if (response) return response;

  const body = await req.json();
  const { city, title, phone, street, country } = body;

  const address = await prisma.address.create({
    data: { userId: user!.id, city, title, phone, street, country }
  });

  return NextResponse.json(address, { status: 201 });
}
