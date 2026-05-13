import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

// GET /api/vendor/shop-settings
export async function GET() {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const shop = await prisma.shop.findUnique({
    where: { userId: user!.id },
    select: {
      id: true,
      name: true,
      phone: true,
      address: true,
      coverPicture: true,
      profilePicture: true,
    },
  });

  if (!shop)
    return NextResponse.json({ error: "Shop not found" }, { status: 404 });
  return NextResponse.json(shop);
}

// PUT /api/vendor/shop-settings
export async function PUT(req: NextRequest) {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const body = await req.json();
  const { name, phone, address, coverPicture, profilePicture } = body as {
    name?: string;
    phone?: string;
    address?: string;
    coverPicture?: string;
    profilePicture?: string;
  };

  const shop = await prisma.shop.findUnique({
    where: { userId: user!.id },
    select: { id: true },
  });
  if (!shop)
    return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  const updated = await prisma.shop.update({
    where: { id: shop.id },
    data: {
      ...(name !== undefined && { name }),
      ...(phone !== undefined && { phone }),
      ...(address !== undefined && { address }),
      ...(typeof coverPicture === "string" &&
        coverPicture.trim() !== "" && { coverPicture: coverPicture.trim() }),
      ...(typeof profilePicture === "string" &&
        profilePicture.trim() !== "" && {
          profilePicture: profilePicture.trim(),
        }),
    },
    select: {
      id: true,
      name: true,
      phone: true,
      address: true,
      coverPicture: true,
      profilePicture: true,
    },
  });

  return NextResponse.json(updated);
}
