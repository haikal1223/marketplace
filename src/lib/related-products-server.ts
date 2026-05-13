import { prisma } from "lib/prisma";
import type Product from "models/Product.model";

/** Same as GET /api/related-products */
export async function getRelatedProductsData(
  slug?: string | null,
  limit = 4,
): Promise<Product[]> {
  let categoryIds: string[] = [];

  if (slug) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { categories: { select: { categoryId: true } } },
    });
    categoryIds = product?.categories.map((c) => c.categoryId) ?? [];
  }

  const products = await prisma.product.findMany({
    where: {
      published: true,
      ...(slug ? { slug: { not: slug } } : {}),
      ...(categoryIds.length > 0
        ? { categories: { some: { categoryId: { in: categoryIds } } } }
        : {}),
    },
    take: limit,
    orderBy: { rating: "desc" },
  });

  if (products.length < limit) {
    const extra = await prisma.product.findMany({
      where: {
        published: true,
        ...(slug ? { slug: { not: slug } } : {}),
        id: { notIn: products.map((p) => p.id) },
      },
      take: limit - products.length,
      orderBy: { rating: "desc" },
    });
    products.push(...extra);
  }

  return products as unknown as Product[];
}

/** Same as GET /api/frequently-bought-products */
export async function getFrequentlyBoughtData(
  slug?: string | null,
  limit = 3,
): Promise<Product[]> {
  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];

  if (slug) {
    const product = await prisma.product.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (product) {
      const coOrdered = await prisma.orderItem.findMany({
        where: {
          order: {
            items: { some: { productId: product.id } },
          },
          productId: { not: product.id },
        },
        select: { productId: true },
        distinct: ["productId"],
        take: limit,
      });

      const productIds = coOrdered.map((i) => i.productId).filter(Boolean) as string[];

      if (productIds.length > 0) {
        products = await prisma.product.findMany({
          where: { id: { in: productIds }, published: true },
          take: limit,
        });
      }
    }
  }

  if (products.length < limit) {
    const extra = await prisma.product.findMany({
      where: {
        published: true,
        ...(slug ? { slug: { not: slug } } : {}),
        id: { notIn: products.map((p) => p.id) },
      },
      take: limit - products.length,
      orderBy: { rating: "desc" },
    });
    products.push(...extra);
  }

  return products as unknown as Product[];
}
