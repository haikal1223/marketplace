import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// DELETE /api/admin/products/[slug]
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug }, select: { id: true } });
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  await prisma.product.delete({ where: { id: product.id } });
  return NextResponse.json({ success: true });
}

// PATCH /api/admin/products/[slug] — partial update (e.g. published)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug }, select: { id: true } });
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const body = await req.json();
  const { published } = body as { published?: boolean };

  if (published === undefined) {
    return NextResponse.json({ error: "published is required" }, { status: 400 });
  }

  const updated = await prisma.product.update({
    where: { id: product.id },
    data: { published }
  });

  return NextResponse.json(updated);
}
