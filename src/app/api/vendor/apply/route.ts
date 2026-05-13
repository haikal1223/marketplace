import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireAuth } from "lib/auth-helpers";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// POST /api/vendor/apply
// Auto-approve: set user role to VENDOR + create Shop using default assets.
export async function POST(req: NextRequest) {
  const { user, response } = await requireAuth();
  if (response) return response;

  const body = await req.json().catch(() => null);
  const { shopName, phone, address, warehouseName, originDistrictId } = (body ?? {}) as {
    shopName?: unknown;
    phone?: unknown;
    address?: unknown;
    warehouseName?: unknown;
    originDistrictId?: unknown;
  };

  if (!shopName || typeof shopName !== "string" || !shopName.trim()) {
    return NextResponse.json({ error: "shopName is required" }, { status: 400 });
  }
  if (!phone || typeof phone !== "string" || !phone.trim()) {
    return NextResponse.json({ error: "phone is required" }, { status: 400 });
  }
  if (!address || typeof address !== "string" || !address.trim()) {
    return NextResponse.json({ error: "address is required" }, { status: 400 });
  }
  if (!warehouseName || typeof warehouseName !== "string" || !warehouseName.trim()) {
    return NextResponse.json({ error: "warehouseName is required" }, { status: 400 });
  }
  if (
    originDistrictId === undefined ||
    originDistrictId === null ||
    (typeof originDistrictId !== "string" && typeof originDistrictId !== "number")
  ) {
    return NextResponse.json({ error: "originDistrictId is required" }, { status: 400 });
  }

  const shopNameTrimmed = shopName.trim();
  const phoneTrimmed = phone.trim();
  const addressTrimmed = address.trim();
  const warehouseNameTrimmed = warehouseName.trim();
  const originDistrictIdStr = String(originDistrictId).trim();
  if (!originDistrictIdStr) {
    return NextResponse.json({ error: "originDistrictId is required" }, { status: 400 });
  }

  const defaultCoverPicture = "/assets/images/banners/cycle.png";
  const defaultProfilePicture = "/assets/images/faces/propic.png";

  const existingShop = await prisma.shop.findUnique({
    where: { userId: user!.id },
    select: { slug: true, coverPicture: true, profilePicture: true }
  });

  const baseSlug = slugify(shopNameTrimmed);
  // Ensure uniqueness on create (Shop.slug is @unique).
  const slugCandidate = existingShop?.slug ?? `${baseSlug || "shop"}-${user!.id.slice(-5)}`;

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: user!.id },
      data: { role: "VENDOR" }
    });

    const shopRow = await tx.shop.upsert({
      where: { userId: user!.id },
      create: {
        userId: user!.id,
        slug: slugCandidate,
        email: user!.email,
        name: shopNameTrimmed,
        phone: phoneTrimmed,
        address: addressTrimmed,
        verified: true,
        coverPicture: defaultCoverPicture,
        profilePicture: defaultProfilePicture
      },
      update: {
        // Keep slug/pictures unchanged if shop already exists.
        name: shopNameTrimmed,
        phone: phoneTrimmed,
        address: addressTrimmed,
        verified: true,
        coverPicture: existingShop?.coverPicture ?? defaultCoverPicture,
        profilePicture: existingShop?.profilePicture ?? defaultProfilePicture
      },
      select: { id: true }
    });

    // Satu toko hanya boleh satu warehouse — buat hanya jika belum ada.
    const existingWarehouseCount = await tx.shopWarehouse.count({ where: { shopId: shopRow.id } });
    if (existingWarehouseCount === 0) {
      await tx.shopWarehouse.create({
        data: {
          shopId: shopRow.id,
          name: warehouseNameTrimmed,
          originDistrictId: originDistrictIdStr
        }
      });
    }
  });

  return NextResponse.json({ success: true, shopSlug: slugCandidate }, { status: 200 });
}

