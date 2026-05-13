import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";

// GET /api/shops/single?slug=shop-slug
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

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
    return NextResponse.json({ error: "Shop not found" }, { status: 404 });
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

  return NextResponse.json({
    ...rest,
    productsPageBannerUrl: productsPageBannerUrl || null,
    customLinks,
    socialLinks: {
      facebook: shop.facebookUrl,
      youtube: shop.youtubeUrl,
      twitter: shop.twitterUrl,
      instagram: shop.instagramUrl,
    },
  });
}
