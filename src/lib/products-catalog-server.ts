import { prisma } from "lib/prisma";
import type { Prisma } from "@prisma/client";
import Product from "models/Product.model";

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

export interface CatalogParams {
  q: string;
  page: string;
  sort: string;
  prices: string;
  colors: string;
  brands: string;
  rating: string;
  category: string;
  sales: string;
  /** optional page size, default 12 */
  limit?: string;
}

export function catalogParamsFromSearchParams(
  searchParams: URLSearchParams,
): CatalogParams {
  return {
    q: searchParams.get("q") ?? "",
    page: searchParams.get("page") ?? "1",
    sort: searchParams.get("sort") ?? "relevance",
    category: searchParams.get("category") ?? "",
    prices:
      searchParams.get("prices") ?? `[0,${100_000_000}]`,
    colors: searchParams.get("colors") ?? "[]",
    brands: searchParams.get("brands") ?? "[]",
    rating: searchParams.get("rating") ?? "0",
    sales: searchParams.get("sales") ?? "[]",
    limit: searchParams.get("limit") ?? "12",
  };
}

export interface CatalogResult {
  products: Product[];
  pageCount: number;
  totalProducts: number;
  firstIndex: number;
  lastIndex: number;
}

/** Same logic as GET /api/products/catalog */
export async function getProductsCatalog(
  raw: CatalogParams,
): Promise<CatalogResult> {
  const page = Math.max(1, parseInt(raw.page ?? "1", 10) || 1);
  const limit = Math.min(
    48,
    Math.max(1, parseInt(raw.limit ?? "12", 10) || 12),
  );
  const skip = (page - 1) * limit;

  const q = (raw.q ?? "").trim();
  const sort = raw.sort ?? "relevance";
  const category = (raw.category ?? "").trim();

  const LEGACY_DEFAULT_RANGE_MAX = 300;
  const PRICE_CAP_IDR = 100_000_000;
  const DEFAULT_PRICE_MAX = PRICE_CAP_IDR;

  const prices = safeJson<[number, number]>(
    raw.prices || null,
    [0, DEFAULT_PRICE_MAX],
  );
  const [rawMin, rawMax] = prices;
  let minP = Math.min(rawMin, rawMax);
  let maxP = Math.max(rawMin, rawMax);
  minP = Math.max(0, minP);
  maxP = Math.min(Math.max(minP, maxP), PRICE_CAP_IDR);

  const colors = safeJson<string[]>(raw.colors || null, []);
  const brandSlugs = safeJson<string[]>(raw.brands || null, []);
  const sales = safeJson<string[]>(raw.sales || null, []);
  const ratingMin = parseRatingMin(raw.rating || null);

  const and: Prisma.ProductWhereInput[] = [{ published: true }];

  if (q) {
    and.push({
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { brand: { is: { name: { contains: q, mode: "insensitive" } } } },
        { brand: { is: { slug: { contains: q, mode: "insensitive" } } } },
      ],
    });
  }

  if (category) {
    and.push({
      categories: {
        some: { category: { slug: { contains: category, mode: "insensitive" } } },
      },
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
    // no price filter
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
        categories: { select: { category: { select: { slug: true } } } },
      },
    }),
    prisma.product.count({ where }),
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
    description: p.description ?? undefined,
  })) as unknown as Product[];

  const totalPages = Math.max(1, Math.ceil(total / limit) || 1);
  const firstIndex = total === 0 ? 0 : skip + 1;
  const lastIndex = Math.min(skip + limit, total);

  return {
    products,
    pageCount: totalPages,
    totalProducts: total,
    firstIndex,
    lastIndex,
  };
}
