import { NextRequest, NextResponse } from "next/server";
import { auth } from "lib/auth";
import { prisma } from "lib/prisma";
import { requireAuth } from "lib/auth-helpers";

const PAGE_SIZE = 6;

// GET /api/users/wishlist?page=1
// GET /api/users/wishlist?ids=id1,id2,...  → { wishlistedProductIds: string[] } (subset of ids; guests → [])
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const idsParam = url.searchParams.get("ids");

  if (idsParam !== null) {
    const session = await auth();
    const uid = session?.user?.id;
    if (!uid) {
      return NextResponse.json({ wishlistedProductIds: [] });
    }
    const raw = idsParam
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 100);
    if (raw.length === 0) {
      return NextResponse.json({ wishlistedProductIds: [] });
    }
    const wishlistModel = (prisma as any).wishlistItem;
    if (!wishlistModel) {
      return NextResponse.json({ wishlistedProductIds: [] });
    }
    try {
      const rows = await wishlistModel.findMany({
        where: { userId: uid, productId: { in: raw } },
        select: { productId: true },
      });
      return NextResponse.json({
        wishlistedProductIds: rows.map(
          (r: { productId: string }) => r.productId,
        ),
      });
    } catch (error: unknown) {
      const code = (error as { code?: string })?.code;
      if (code === "P2021") {
        return NextResponse.json({ wishlistedProductIds: [] });
      }
      throw error;
    }
  }

  const { user, response } = await requireAuth();
  if (response) return response;

  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10));
  const skip = (page - 1) * PAGE_SIZE;
  const wishlistModel = (prisma as any).wishlistItem;

  if (!wishlistModel) {
    return NextResponse.json({
      products: [],
      total: 0,
      totalPages: 1,
    });
  }

  let rows: unknown[] = [];
  let total = 0;
  try {
    [rows, total] = await Promise.all([
      wishlistModel.findMany({
        where: { userId: user!.id },
        skip,
        take: PAGE_SIZE,
        orderBy: { createdAt: "desc" },
        include: {
          product: {
            include: {
              categories: { include: { category: { select: { name: true } } } },
            },
          },
        },
      }),
      wishlistModel.count({ where: { userId: user!.id } }),
    ]);
  } catch (error: unknown) {
    const code = (error as { code?: string })?.code;
    if (code === "P2021") {
      return NextResponse.json({
        products: [],
        total: 0,
        totalPages: 1,
      });
    }
    throw error;
  }

  const products = (rows as { product: unknown }[])
    .map((r) => r.product)
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map((p: any) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      price: p.price,
      discount: p.discount,
      rating: p.rating,
      thumbnail: p.thumbnail,
      images: p.images.length > 0 ? p.images : [p.thumbnail],
      description: p.description ?? undefined,
      categories: p.categories.map(
        (c: { category: { name: string } }) => c.category.name,
      ),
    }));

  return NextResponse.json({
    products,
    total,
    totalPages: total === 0 ? 1 : Math.ceil(total / PAGE_SIZE),
  });
}

// POST /api/users/wishlist  { productId: string }
export async function POST(req: NextRequest) {
  const { user, response } = await requireAuth();
  if (response) return response;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const productId =
    typeof body === "object" && body !== null && "productId" in body
      ? (body as { productId: unknown }).productId
      : undefined;
  if (typeof productId !== "string" || !productId.trim()) {
    return NextResponse.json(
      { error: "productId is required" },
      { status: 400 },
    );
  }

  const wishlistModel = (prisma as any).wishlistItem;
  if (!wishlistModel) {
    return NextResponse.json(
      { error: "Wishlist unavailable" },
      { status: 503 },
    );
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true },
  });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  try {
    await wishlistModel.upsert({
      where: {
        userId_productId: { userId: user!.id, productId },
      },
      create: { userId: user!.id, productId },
      update: {},
    });
  } catch (error: unknown) {
    const code = (error as { code?: string })?.code;
    if (code === "P2021") {
      return NextResponse.json(
        { error: "Wishlist table missing" },
        { status: 503 },
      );
    }
    throw error;
  }

  return NextResponse.json({ ok: true });
}

// DELETE /api/users/wishlist?productId=...
export async function DELETE(req: NextRequest) {
  const { user, response } = await requireAuth();
  if (response) return response;

  const productId = new URL(req.url).searchParams.get("productId");
  if (!productId?.trim()) {
    return NextResponse.json(
      { error: "productId is required" },
      { status: 400 },
    );
  }

  const wishlistModel = (prisma as any).wishlistItem;
  if (!wishlistModel) {
    return NextResponse.json(
      { error: "Wishlist unavailable" },
      { status: 503 },
    );
  }

  try {
    await wishlistModel.deleteMany({
      where: { userId: user!.id, productId },
    });
  } catch (error: unknown) {
    const code = (error as { code?: string })?.code;
    if (code === "P2021") {
      return NextResponse.json(
        { error: "Wishlist table missing" },
        { status: 503 },
      );
    }
    throw error;
  }

  return NextResponse.json({ ok: true });
}
