import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireAuth } from "lib/auth-helpers";

// GET /api/address/address-ids
export async function GET() {
  const { user, response } = await requireAuth();
  if (response) return response;

  const addresses = await prisma.address.findMany({
    where: { userId: user!.id },
    select: { id: true }
  });

  return NextResponse.json(addresses.map((a) => ({ params: { id: a.id } })));
}
