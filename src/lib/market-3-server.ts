import type Product from "models/Product.model";
import type { CategoryBasedProducts } from "models/Market-2.model";
import { prisma } from "lib/prisma";
import {
  mainCarouselData,
  services,
} from "__server__/__db__/market-3/data";

const TAG_CATEGORY_MAP: Record<string, string> = {
  electronics: "Electronics",
  men: "Men's Fashion",
  women: "Women's Fashion",
};

export async function getMarket3ProductsList(type: string | null) {
  const products = await prisma.product.findMany({
    where: { published: true },
    include: {
      shop: { select: { id: true, name: true, slug: true } },
      categories: {
        include: { category: { select: { id: true, name: true, slug: true } } },
      },
    },
    orderBy: type ? { createdAt: "desc" } : { rating: "desc" },
    take: 20,
  });

  return products.map((p) => ({
    ...p,
    description: p.description ?? undefined,
    categories: p.categories.map((pc) => pc.category),
  })) as unknown as Product[];
}

export async function getMarket3Services() {
  return services;
}

export async function getMarket3Categories() {
  return prisma.category.findMany({
    where: { parentId: null },
    orderBy: { name: "asc" },
    take: 12,
  });
}

export async function getMarket3Brands() {
  return prisma.brand.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getMarket3MainCarousel() {
  return mainCarouselData;
}

export async function getMarket3CategoryBasedProduct(
  tag: string,
): Promise<CategoryBasedProducts> {
  const categoryTitle = TAG_CATEGORY_MAP[tag] ?? "Electronics";

  const category = await prisma.category.findFirst({
    where: { name: { contains: categoryTitle, mode: "insensitive" } },
    include: { children: { select: { name: true } } },
  });

  const products = await prisma.product.findMany({
    where: {
      published: true,
      ...(category
        ? {
            categories: { some: { categoryId: category.id } },
          }
        : {}),
    },
    include: {
      shop: { select: { id: true, name: true, slug: true } },
    },
    take: 10,
  });

  return {
    category: {
      title: categoryTitle,
      children: category?.children.map((c) => c.name) ?? [],
    },
    products: products as unknown as Product[],
  };
}

export async function getMarket3ShopsList() {
  const shops = await prisma.shop.findMany({
    where: { verified: true },
    select: {
      id: true,
      slug: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      verified: true,
      coverPicture: true,
      profilePicture: true,
      facebookUrl: true,
      youtubeUrl: true,
      twitterUrl: true,
      instagramUrl: true,
    },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return shops.map((s) => ({
    ...s,
    socialLinks: {
      facebook: s.facebookUrl,
      youtube: s.youtubeUrl,
      twitter: s.twitterUrl,
      instagram: s.instagramUrl,
    },
  }));
}
