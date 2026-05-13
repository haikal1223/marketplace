import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireAuth } from "lib/auth-helpers";

// GET /api/tickets/single?slug=ticket-slug
export async function GET(req: NextRequest) {
  const { user, response } = await requireAuth();
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) return NextResponse.json({ error: "Slug is required" }, { status: 400 });

  const ticket = await prisma.ticket.findFirst({
    where: { slug, userId: user!.id },
    include: { messages: { orderBy: { createdAt: "asc" } } }
  });

  if (!ticket) return NextResponse.json({ error: "Ticket not found" }, { status: 404 });

  return NextResponse.json({
    ...ticket,
    conversation: ticket.messages.map((m) => ({
      name: m.name,
      text: m.text,
      imgUrl: m.imgUrl,
      date: m.createdAt.toISOString()
    }))
  });
}

// POST /api/tickets/single { slug, text } -> append message
export async function POST(req: NextRequest) {
  const { user, response } = await requireAuth();
  if (response) return response;

  const body = await req.json();
  const { slug, text } = body ?? {};

  if (!slug || !text) {
    return NextResponse.json({ error: "slug and text are required" }, { status: 400 });
  }

  const ticket = await prisma.ticket.findFirst({
    where: { slug, userId: user!.id },
    select: { id: true }
  });
  if (!ticket) return NextResponse.json({ error: "Ticket not found" }, { status: 404 });

  const created = await prisma.ticketMessage.create({
    data: {
      ticketId: ticket.id,
      name: user!.name || "Customer",
      text
    }
  });

  return NextResponse.json(created, { status: 201 });
}
