import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

function getDefaultSiteSettings() {
  return {
    general: {
      site_name: "",
      site_description: "",
      site_banner_text: "",
      productsPageBannerUrl: "",
      shopListingCategory: "",
      customLinks: [] as { label: string; url: string }[],
    },
    topbar: { phone: "", email: "", links: [] },
    footer: {
      footer_description: "",
      column_two_heading: "",
      column_two_links: [],
      column_three_heading: "",
      column_three_links: [],
      column_four_heading: "",
      column_four_description: "",
    },
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      youtube: "",
      play_store: "",
      app_store: "",
    },
    shippingVat: { shipping: 0, vat: 0 },
    bannerSlider: { images: [] },
  };
}

// GET /api/vendor/site-settings
export async function GET() {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const shop = await prisma.shop.findUnique({
    where: { userId: user!.id },
    select: { id: true },
  });
  if (!shop)
    return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  try {
    const setting = await prisma.vendorSiteSetting.findUnique({
      where: { shopId: shop.id },
    });
    if (!setting) return NextResponse.json(getDefaultSiteSettings());

    return NextResponse.json({
      general: {
        ...getDefaultSiteSettings().general,
        ...(setting.general && typeof setting.general === "object"
          ? (setting.general as object)
          : {}),
      },
      topbar: setting.topbar ?? getDefaultSiteSettings().topbar,
      footer: setting.footer ?? getDefaultSiteSettings().footer,
      socialLinks: setting.socialLinks ?? getDefaultSiteSettings().socialLinks,
      shippingVat: setting.shippingVat ?? getDefaultSiteSettings().shippingVat,
      bannerSlider:
        setting.bannerSlider ?? getDefaultSiteSettings().bannerSlider,
    });
  } catch (error: any) {
    if (error?.code === "P2021")
      return NextResponse.json(getDefaultSiteSettings());
    throw error;
  }
}

// PUT /api/vendor/site-settings { section, data }
export async function PUT(req: NextRequest) {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const body = await req.json();
  const { section, data } = body as {
    section:
      | "general"
      | "topbar"
      | "footer"
      | "socialLinks"
      | "shippingVat"
      | "bannerSlider";
    data: unknown;
  };

  if (!section)
    return NextResponse.json({ error: "section is required" }, { status: 400 });

  const shop = await prisma.shop.findUnique({
    where: { userId: user!.id },
    select: { id: true },
  });
  if (!shop)
    return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  try {
    let payload: unknown = data;

    if (section === "general") {
      const existingRow = await prisma.vendorSiteSetting.findUnique({
        where: { shopId: shop.id },
        select: { general: true },
      });
      const defaults = getDefaultSiteSettings().general;
      const prev =
        existingRow?.general && typeof existingRow.general === "object"
          ? (existingRow.general as Record<string, unknown>)
          : {};
      const incoming =
        data && typeof data === "object"
          ? (data as Record<string, unknown>)
          : {};
      payload = { ...defaults, ...prev, ...incoming };
    }

    const updated = await prisma.vendorSiteSetting.upsert({
      where: { shopId: shop.id },
      create: { shopId: shop.id, [section]: payload },
      update: { [section]: payload },
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    if (error?.code === "P2021") {
      return NextResponse.json(
        { error: "Run prisma migrate dev to enable vendor site settings." },
        { status: 503 },
      );
    }
    throw error;
  }
}
