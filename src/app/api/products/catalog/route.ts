import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import type { Prisma } from "@prisma/client";

function safeJson<T>(raw: string | null, fallback: T): T {
  if (raw == null || raw === "") return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function parseRatingMin(raw: string | null): number {
  if (raw == null || raw === "") return 0;
  try {
    const v = JSON.parse(raw);
    return typeof v === "number" && !Number.isNaN(v) ? v : 0;
  } catch {
    const n = parseFloat(raw);
    return Number.isNaN(n) ? 0 : n;
  }
}

// GET /api/products/catalog — published products for /products/search (filters + pagination)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const limit = Math.min(48, Math.max(1, parseInt(searchParams.get("limit") ?? "12", 10) || 12));
  const skip = (page - 1) * limit;

  const q = (searchParams.get("q") ?? "").trim();
  const sort = searchParams.get("sort") ?? "relevance";
  const category = (searchParams.get("category") ?? "").trim();

  /** Template lama memakai [0,300]; anggap sebagai tanpa batas atas (rupiah). */
  const LEGACY_DEFAULT_RANGE_MAX = 300;
  /** Batas atas filter harga — 100 juta Rupiah */
  const PRICE_CAP_IDR = 100_000_000;
  const DEFAULT_PRICE_MAX = PRICE_CAP_IDR;

  const prices = safeJson<[number, number]>(
    searchParams.get("prices"),
    [0, DEFAULT_PRICE_MAX]
  );
  const [rawMin, rawMax] = prices;
  let minP = Math.min(rawMin, rawMax);
  let maxP = Math.max(rawMin, rawMax);
  minP = Math.max(0, minP);
  maxP = Math.min(Math.max(minP, maxP), PRICE_CAP_IDR);

  const colors = safeJson<string[]>(searchParams.get("colors"), []);
  const brandSlugs = safeJson<string[]>(searchParams.get("brands"), []);
  const sales = safeJson<string[]>(searchParams.get("sales"), []);
  const ratingMin = parseRatingMin(searchParams.get("rating"));

  const and: Prisma.ProductWhereInput[] = [{ published: true }];

  if (q) {
    and.push({
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { brand: { is: { name: { contains: q, mode: "insensitive" } } } },
        { brand: { is: { slug: { contains: q, mode: "insensitive" } } } }
      ]
    });
  }

  if (category) {
    and.push({
      categories: {
        some: { category: { slug: { contains: category, mode: "insensitive" } } }
      }
    });
  }

  if (brandSlugs.length) {
    and.push({ brand: { slug: { in: brandSlugs } } });
  }

  if (colors.length) {
    and.push({ colors: { hasSome: colors } });
  }

  if (ratingMin > 0) {
    and.push({ rating: { gte: ratingMin } });
  }

  if (minP === 0 && maxP === LEGACY_DEFAULT_RANGE_MAX) {
    // jangan batasi harga — perilaku sama seperti "semua harga"
  } else {
    and.push({ price: { gte: minP, lte: maxP } });
  }

  for (const s of sales) {
    if (s === "sale") and.push({ discount: { gt: 0 } });
    else if (s === "stock") and.push({ stock: { gt: 0 } });
    else if (s === "featured") and.push({ rating: { gte: 4 } });
  }

  const where: Prisma.ProductWhereInput = { AND: and };

  let orderBy: Prisma.ProductOrderByWithRelationInput[] = [{ createdAt: "desc" }];
  switch (sort) {
    case "asc":
      orderBy = [{ price: "asc" }];
      break;
    case "desc":
      orderBy = [{ price: "desc" }];
      break;
    case "date":
      orderBy = [{ createdAt: "desc" }];
      break;
    default:
      orderBy = [{ createdAt: "desc" }];
  }

  const [rows, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      select: {
        id: true,
        slug: true,
        title: true,
        price: true,
        discount: true,
        rating: true,
        thumbnail: true,
        images: true,
        colors: true,
        description: true,
        categories: { select: { category: { select: { slug: true } } } }
      }
    }),
    prisma.product.count({ where })
  ]);

  const products = rows.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    price: p.price,
    discount: p.discount,
    rating: p.rating,
    thumbnail: p.thumbnail,
    images: p.images?.length ? p.images : [p.thumbnail],
    colors: p.colors,
    categories: p.categories.map((c) => c.category.slug),
    description: p.description ?? undefined
  }));

  const totalPages = Math.max(1, Math.ceil(total / limit) || 1);
  const firstIndex = total === 0 ? 0 : skip + 1;
  const lastIndex = Math.min(skip + limit, total);

  return NextResponse.json({
    products,
    pageCount: totalPages,
    totalProducts: total,
    firstIndex,
    lastIndex
  });
}
