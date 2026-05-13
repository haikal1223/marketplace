import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";

// GET /api/shops — paginated shop list
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "9");
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
        instagramUrl: true
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.shop.count()
  ]);

  const totalPages = Math.ceil(total / limit);

  return NextResponse.json({
    shops: shops.map((s) => ({
      ...s,
      socialLinks: {
        facebook: s.facebookUrl,
        youtube: s.youtubeUrl,
        twitter: s.twitterUrl,
        instagram: s.instagramUrl
      }
    })),
    meta: {
      totalShops: total,
      totalPages,
      firstIndex: skip + 1,
      lastIndex: Math.min(skip + limit, total)
    }
  });
}
