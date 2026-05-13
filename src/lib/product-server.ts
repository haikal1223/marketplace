import { prisma } from "lib/prisma";

/** Shape expected by `generateStaticParams`-style slug lists */
export async function getProductSlugParamsList(): Promise<
  { params: { slug: string } }[]
> {
  const products = await prisma.product.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return products.map((p) => ({ params: { slug: p.slug } }));
}

/** Same payload as GET /api/products/slug */
export async function getProductBySlugPayload(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      shop: true,
      brand: { select: { id: true, name: true, slug: true } },
      categories: { include: { category: true } },
      reviews: {
        include: {
          customer: {
            select: { id: true, firstName: true, lastName: true, avatar: true },
          },
        },
        where: { published: true },
      },
    },
  });

  if (!product) return null;

  return {
    ...product,
    brand: product.brand?.name ?? null,
    categories: product.categories.map((pc) => pc.category.name),
  };
}

export async function searchProductTitles(
  name: string | null | undefined,
  category: string | null | undefined,
): Promise<string[]> {
  const products = await prisma.product.findMany({
    where: {
      published: true,
      ...(name ? { title: { contains: name, mode: "insensitive" } } : {}),
      ...(category
        ? {
            categories: {
              some: {
                category: { slug: { contains: category, mode: "insensitive" } },
              },
            },
          }
        : {}),
    },
    select: { title: true, slug: true, thumbnail: true, price: true },
    take: 20,
  });

  return products.map((p) => p.title);
}

export async function getPublishedReviewsFormatted(productId?: string | null) {
  const reviews = await prisma.review.findMany({
    where: {
      published: true,
      ...(productId ? { productId } : {}),
    },
    include: {
      customer: {
        select: { id: true, firstName: true, lastName: true, avatar: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return reviews.map((r) => ({
    ...r,
    name: `${r.customer.firstName} ${r.customer.lastName}`,
    imgUrl: r.customer.avatar,
    date: r.createdAt.toISOString(),
  }));
}
