import { prisma } from "lib/prisma";

export async function getShopsPaginated(page: number, limit: number) {
  const skip = (page - 1) * limit;

  const [shops, total] = await Promise.all([
    prisma.shop.findMany({
      skip,
      take: limit,
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
      orderBy: { createdAt: "desc" },
    }),
    prisma.shop.count(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    shops: shops.map((s) => ({
      ...s,
      socialLinks: {
        facebook: s.facebookUrl,
        youtube: s.youtubeUrl,
        twitter: s.twitterUrl,
        instagram: s.instagramUrl,
      },
    })),
    meta: {
      totalShops: total,
      totalPages,
      firstIndex: skip + 1,
      lastIndex: Math.min(skip + limit, total),
    },
  };
}

export async function getShopSlugParamsList() {
  const shops = await prisma.shop.findMany({
    select: { slug: true },
  });

  return shops.map((s) => ({ params: { slug: s.slug } }));
}

export async function getShopSingleBySlug(slug: string | null) {
  const shop = await prisma.shop.findFirst({
    where: slug ? { slug } : {},
    include: {
      products: {
        where: { published: true },
        take: 9,
        orderBy: { createdAt: "desc" },
      },
      user: {
        select: { id: true, firstName: true, lastName: true, avatar: true },
      },
      siteSetting: { select: { general: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!shop) {
    return null;
  }

  const general =
    (shop.siteSetting?.general as Record<string, unknown> | null) ?? {};
  const productsPageBannerUrl =
    typeof general.productsPageBannerUrl === "string"
      ? general.productsPageBannerUrl
      : "";
  const rawLinks = general.customLinks;
  const customLinks = Array.isArray(rawLinks)
    ? rawLinks
        .filter(
          (x): x is { label?: unknown; url?: unknown } =>
            x !== null && typeof x === "object",
        )
        .map((x) => ({
          label: typeof x.label === "string" ? x.label : "",
          url: typeof x.url === "string" ? x.url : "",
        }))
        .filter((x) => x.url.trim() !== "")
    : [];

  const { siteSetting: _omit, ...rest } = shop;

  return {
    ...rest,
    productsPageBannerUrl: productsPageBannerUrl || null,
    customLinks,
    socialLinks: {
      facebook: shop.facebookUrl,
      youtube: shop.youtubeUrl,
      twitter: shop.twitterUrl,
      instagram: shop.instagramUrl,
    },
  };
}
