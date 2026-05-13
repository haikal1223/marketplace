import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireAuth } from "lib/auth-helpers";

// GET /api/address/user/[id]
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { user, response } = await requireAuth();
  if (response) return response;

  const { id } = await params;

  const address = await prisma.address.findFirst({
    where: { id, userId: user!.id }
  });

  if (!address) return NextResponse.json({ error: "Address not found" }, { status: 404 });

  return NextResponse.json(address);
}

// PUT /api/address/user/[id]
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { user, response } = await requireAuth();
  if (response) return response;

  const { id } = await params;
  const body = await req.json();
  const { city, title, phone, street, country } = body;

  const existing = await prisma.address.findFirst({ where: { id, userId: user!.id } });
  if (!existing) return NextResponse.json({ error: "Address not found" }, { status: 404 });

  const updated = await prisma.address.update({
    where: { id },
    data: {
      ...(city !== undefined && { city }),
      ...(title !== undefined && { title }),
      ...(phone !== undefined && { phone }),
      ...(street !== undefined && { street }),
      ...(country !== undefined && { country })
    }
  });

  return NextResponse.json(updated);
}

// DELETE /api/address/user/[id]
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { user, response } = await requireAuth();
  if (response) return response;

  const { id } = await params;

  const existing = await prisma.address.findFirst({ where: { id, userId: user!.id } });
  if (!existing) return NextResponse.json({ error: "Address not found" }, { status: 404 });

  await prisma.address.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
