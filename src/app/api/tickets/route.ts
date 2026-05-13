import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireAuth } from "lib/auth-helpers";

// GET /api/tickets?page=1
export async function GET(req: NextRequest) {
  const { user, response } = await requireAuth();
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = 10;
  const skip = (page - 1) * limit;

  const [tickets, total] = await Promise.all([
    prisma.ticket.findMany({
      where: { userId: user!.id },
      include: { messages: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    }),
    prisma.ticket.count({ where: { userId: user!.id } })
  ]);

  return NextResponse.json({ tickets, total, totalPages: Math.ceil(total / limit) });
}

// POST /api/tickets — create ticket
export async function POST(req: NextRequest) {
  const { user, response } = await requireAuth();
  if (response) return response;

  const body = await req.json();
  const { title, type, category } = body;

  const slug = `ticket-${Date.now()}`;

  const ticket = await prisma.ticket.create({
    data: { userId: user!.id, title, type, category, slug }
  });

  return NextResponse.json(ticket, { status: 201 });
}
