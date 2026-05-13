import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireAuth } from "lib/auth-helpers";

// GET /api/cart
export async function GET() {
  const { user, response } = await requireAuth();
  if (response) return response;

  // Cart is stored client-side in CartContext.
  // This endpoint is a placeholder for server-side cart persistence.
  // Return empty for now — implement cart table if server-side cart is needed.
  return NextResponse.json([]);
}

// PUT /api/cart — sync cart items
export async function PUT(req: NextRequest) {
  const { user, response } = await requireAuth();
  if (response) return response;

  const body = await req.json();
  return NextResponse.json(body);
}

// DELETE /api/cart — clear cart
export async function DELETE() {
  const { user, response } = await requireAuth();
  if (response) return response;

  return NextResponse.json({ success: true });
}
