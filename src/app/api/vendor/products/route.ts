import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/vendor/products — list vendor's own products
export async function GET(req: NextRequest) {
  const { user, response } = await requireRole("VENDOR");
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const skip = (page - 1) * limit;

  const shop = await prisma.shop.findFirst({ where: { userId: user!.id } });
  if (!shop)
    return NextResponse.json({ products: [], total: 0, totalPages: 0 });

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where: { shopId: shop.id },
      skip,
      take: limit,
      include: {
        brand: { select: { id: true, name: true, image: true } },
        categories: { include: { category: { select: { name: true } } } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where: { shopId: shop.id } }),
  ]);

  return NextResponse.json({
    products,
    total,
    totalPages: Math.ceil(total / limit),
  });
}

// POST /api/vendor/products — create new product
export async function POST(req: NextRequest) {
  const { user, response } = await requireRole("VENDOR");
  if (response) return response;

  const shop = await prisma.shop.findFirst({ where: { userId: user!.id } });
  if (!shop) {
    return NextResponse.json(
      { error: "You don't have a shop yet" },
      { status: 400 },
    );
  }

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
    warehouseId,
    brandId,
  } = body;

  const slug = (name as string)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .concat("-", Date.now().toString().slice(-5));

  const firstWarehouse = await prisma.shopWarehouse.findFirst({
    where: { shopId: shop.id },
    select: { id: true },
    orderBy: { createdAt: "asc" },
  });

  let warehouseIdToSet: string | null = null;
  if (warehouseId) {
    const validWarehouse = await prisma.shopWarehouse.findFirst({
      where: { id: String(warehouseId), shopId: shop.id },
      select: { id: true },
    });
    warehouseIdToSet = validWarehouse?.id ?? firstWarehouse?.id ?? null;
  } else {
    warehouseIdToSet = firstWarehouse?.id ?? null;
  }

  if (!brandId) {
    return NextResponse.json({ error: "brandId is required" }, { status: 400 });
  }
  const brand = await prisma.brand.findUnique({
    where: { id: String(brandId) },
    select: { id: true },
  });
  if (!brand) {
    return NextResponse.json({ error: "Invalid brand" }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      slug,
      title: name,
      description,
      price: parseFloat(price),
      discount: sale_price
        ? Math.round((1 - parseFloat(sale_price) / parseFloat(price)) * 100)
        : 0,
      stock: parseInt(stock),
      thumbnail: thumbnail ?? "",
      images: thumbnail ? [thumbnail] : [],
      tags: tags ? tags.split(",").map((t: string) => t.trim()) : [],
      published: true,
      shopId: shop.id,
      warehouseId: warehouseIdToSet,
      brandId: brand.id,
    },
  });

  // Link categories
  if (Array.isArray(category) && category.length > 0) {
    const cats = await prisma.category.findMany({
      where: { name: { in: category } },
      select: { id: true },
    });
    await prisma.productCategory.createMany({
      data: cats.map((c) => ({ productId: product.id, categoryId: c.id })),
      skipDuplicates: true,
    });
  }

  return NextResponse.json(product, { status: 201 });
}
