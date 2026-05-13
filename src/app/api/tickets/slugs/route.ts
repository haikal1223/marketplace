import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireAuth } from "lib/auth-helpers";

// GET /api/tickets/slugs
export async function GET() {
  const { user, response } = await requireAuth();
  if (response) return response;

  const tickets = await prisma.ticket.findMany({
    where: { userId: user!.id },
    select: { slug: true }
  });

  return NextResponse.json(tickets.map((t) => ({ params: { slug: t.slug } })));
}
