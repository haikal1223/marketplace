import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";

export async function GET() {
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
      instagramUrl: true
    },
    take: 6,
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(
    shops.map((s) => ({
      ...s,
      socialLinks: {
        facebook: s.facebookUrl,
        youtube: s.youtubeUrl,
        twitter: s.twitterUrl,
        instagram: s.instagramUrl
      }
    }))
  );
}
