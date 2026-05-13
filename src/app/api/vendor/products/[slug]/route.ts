import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/vendor/products/[slug] — get single product
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { user, response } = await requireRole("VENDOR");
  if (response) return response;

  const { slug } = await params;
  const shop = await prisma.shop.findFirst({ where: { userId: user!.id } });
  if (!shop)
    return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  const product = await prisma.product.findFirst({
    where: { slug, shopId: shop.id },
    include: {
      brand: { select: { id: true, name: true, image: true } },
      categories: { include: { category: { select: { name: true } } } },
    },
  });
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  return NextResponse.json(product);
}

// PUT /api/vendor/products/[slug] — update product
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { user, response } = await requireRole("VENDOR");
  if (response) return response;

  const { slug } = await params;

  const shop = await prisma.shop.findFirst({ where: { userId: user!.id } });
  if (!shop)
    return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  const product = await prisma.product.findFirst({
    where: { slug, shopId: shop.id },
  });
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const body = await req.json();
  const {
    name,
    description,
    price,
    sale_price,
    stock,
    category,
    tags,
    thumbnail,
    published,
    warehouseId,
    brandId,
  } = body;

  const firstWarehouse = await prisma.shopWarehouse.findFirst({
    where: { shopId: shop.id },
    select: { id: true },
    orderBy: { createdAt: "asc" },
  });

  const hasWarehouseIdProp = Object.prototype.hasOwnProperty.call(
    body,
    "warehouseId",
  );
  let warehouseIdToSet: string | null =
    (product.warehouseId as string | null) ?? firstWarehouse?.id ?? null;

  if (hasWarehouseIdProp) {
    // When client sends warehouseId explicitly (including empty string/null), we apply fallback.
    if (warehouseId) {
      const validWarehouse = await prisma.shopWarehouse.findFirst({
        where: { id: String(warehouseId), shopId: shop.id },
        select: { id: true },
      });
      warehouseIdToSet = validWarehouse?.id ?? firstWarehouse?.id ?? null;
    } else {
      warehouseIdToSet = firstWarehouse?.id ?? null;
    }
  }

  const hasBrandIdProp = Object.prototype.hasOwnProperty.call(body, "brandId");
  let brandIdToSet: string | null | undefined = undefined;
  if (hasBrandIdProp) {
    if (!brandId) {
      brandIdToSet = null;
    } else {
      const b = await prisma.brand.findUnique({
        where: { id: String(brandId) },
        select: { id: true },
      });
      if (!b) {
        return NextResponse.json({ error: "Invalid brand" }, { status: 400 });
      }
      brandIdToSet = b.id;
    }
  }

  const updated = await prisma.product.update({
    where: { id: product.id },
    data: {
      ...(name !== undefined && { title: name }),
      ...(description !== undefined && { description }),
      ...(price !== undefined && { price: parseFloat(price) }),
      ...(sale_price !== undefined && {
        discount: Math.round(
          (1 - parseFloat(sale_price) / parseFloat(price)) * 100,
        ),
      }),
      ...(stock !== undefined && { stock: parseInt(stock) }),
      ...(thumbnail !== undefined && { thumbnail, images: [thumbnail] }),
      ...(tags !== undefined && {
        tags: tags.split(",").map((t: string) => t.trim()),
      }),
      ...(published !== undefined && { published }),
      ...(brandIdToSet !== undefined && { brandId: brandIdToSet }),
      warehouseId: warehouseIdToSet,
    },
  });

  if (Array.isArray(category) && category.length > 0) {
    await prisma.productCategory.deleteMany({
      where: { productId: product.id },
    });
    const cats = await prisma.category.findMany({
      where: { name: { in: category } },
      select: { id: true },
    });
    await prisma.productCategory.createMany({
      data: cats.map((c) => ({ productId: product.id, categoryId: c.id })),
      skipDuplicates: true,
    });
  }

  return NextResponse.json(updated);
}

// DELETE /api/vendor/products/[slug] — delete product
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { user, response } = await requireRole("VENDOR");
  if (response) return response;

  const { slug } = await params;

  const shop = await prisma.shop.findFirst({ where: { userId: user!.id } });
  if (!shop)
    return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  const product = await prisma.product.findFirst({
    where: { slug, shopId: shop.id },
  });
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  await prisma.product.delete({ where: { id: product.id } });
  return NextResponse.json({ success: true });
}
