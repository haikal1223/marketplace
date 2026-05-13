import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";

// POST /api/products/resolve-shops
// Body: { productIds: string[] }
// Returns: [{ productId, shopId, shop: { id, name, slug }, originDistrictId }]
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { productIds } = body as { productIds?: string[] };

  if (!Array.isArray(productIds) || productIds.length === 0) {
    return NextResponse.json({ error: "productIds must be a non-empty array" }, { status: 400 });
  }

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: {
      id: true,
      shopId: true,
      warehouseId: true,
      warehouse: { select: { originDistrictId: true, id: true } },
      shop: { select: { id: true, name: true, slug: true } }
    }
  });

  const shopIds = Array.from(new Set(products.map((p) => p.shopId).filter(Boolean))) as string[];

  // Fallback: if a product has no warehouse mapped, use the first warehouse origin for that shop.
  const firstWarehouses = await prisma.shopWarehouse.findMany({
    where: { shopId: { in: shopIds } },
    select: { shopId: true, originDistrictId: true },
    orderBy: { createdAt: "asc" }
  });

  const firstOriginByShop = new Map<string, string>();
  for (const w of firstWarehouses) {
    if (!firstOriginByShop.has(w.shopId)) {
      firstOriginByShop.set(w.shopId, String(w.originDistrictId));
    }
  }

  const resolved = products
    .filter((p) => p.shopId && p.shop)
    .map((p) => ({
      productId: p.id,
      shopId: p.shopId as string,
      shop: { id: p.shop!.id, name: p.shop!.name, slug: p.shop!.slug },
      originDistrictId:
        (p.warehouse?.originDistrictId ? String(p.warehouse.originDistrictId) : null) ??
        firstOriginByShop.get(p.shopId as string) ??
        null
    }));

  return NextResponse.json(resolved);
}

