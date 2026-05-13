import { cache } from "react";
import axios from "utils/axiosInstance";
import { prisma } from "lib/prisma";
import Product from "models/Product.model";
import Filters from "models/Filters";

const OTHERS = [
  { label: "On Sale", value: "sale" },
  { label: "In Stock", value: "stock" },
  { label: "Featured", value: "featured" }
];

const COLORS_FALLBACK = ["#1C1C1C", "#FF7A7A", "#FFC672", "#84FFB5", "#70F6FF", "#6B7AFF"];

interface CatalogResponse {
  products: Product[];
  pageCount: number;
  totalProducts: number;
  firstIndex: number;
  lastIndex: number;
}

export const getFilters = cache(async (): Promise<Filters> => {
  const [topCategories, brands, colorRows] = await Promise.all([
    prisma.category.findMany({
      where: { parentId: null },
      orderBy: { name: "asc" },
      include: {
        children: {
          orderBy: { name: "asc" },
          select: { name: true, slug: true }
        }
      },
      take: 50
    }),
    prisma.brand.findMany({
      orderBy: { name: "asc" },
      select: { name: true, slug: true },
      take: 100
    }),
    prisma.product.findMany({
      where: { published: true },
      select: { colors: true },
      take: 500
    })
  ]);

  const colorSet = new Set<string>();
  for (const row of colorRows) {
    for (const c of row.colors) {
      if (c) colorSet.add(c);
    }
    if (colorSet.size >= 24) break;
  }
  const colors = Array.from(colorSet).slice(0, 20);

  return {
    categories: topCategories.map((cat) => ({
      title: cat.name,
      slug: cat.slug,
      children:
        cat.children.length > 0
          ? cat.children.map((ch) => ({ title: ch.name, slug: ch.slug }))
          : undefined
    })),
    brands: brands.map((b) => ({ label: b.name, value: b.slug })),
    colors: colors.length ? colors : COLORS_FALLBACK,
    others: OTHERS
  };
});

interface Params {
  q: string;
  page: string;
  sort: string;
  prices: string;
  colors: string;
  brands: string;
  rating: string;
  category: string;
  sales: string;
}

export const getProducts = cache(
  async ({
    q,
    page,
    sort,
    prices,
    colors,
    brands,
    rating,
    category,
    sales
  }: Params): Promise<{
    products: Product[];
    pageCount: number;
    totalProducts: number;
    firstIndex: number;
    lastIndex: number;
  }> => {
    const response = await axios.get<CatalogResponse>("/api/products/catalog", {
      params: {
        q: q || undefined,
        page: page || "1",
        sort: sort || undefined,
        category: category || undefined,
        prices: prices ?? `[0,${100_000_000}]`,
        colors: colors ?? "[]",
        brands: brands ?? "[]",
        rating: rating ?? "0",
        sales: sales ?? "[]"
      }
    });

    const { products, pageCount, totalProducts, firstIndex, lastIndex } = response.data;
    return { products, pageCount, totalProducts, firstIndex, lastIndex };
  }
);
