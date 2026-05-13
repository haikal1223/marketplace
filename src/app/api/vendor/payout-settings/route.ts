import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireRole } from "lib/auth-helpers";

function getDefaultPayoutSettings() {
  return {
    cash: { amount: "0" },
    card: { amount: "0", cardHolderName: "", cardNo: "", cardCvc: "" },
    bank: { amount: "0", accountHolderName: "", accountNo: "", routingNo: "" }
  };
}

// GET /api/vendor/payout-settings
export async function GET() {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const shop = await prisma.shop.findUnique({ where: { userId: user!.id }, select: { id: true } });
  if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  try {
    const setting = await prisma.vendorPayoutSetting.findUnique({ where: { shopId: shop.id } });
    if (!setting) return NextResponse.json(getDefaultPayoutSettings());

    return NextResponse.json({
      cash: setting.cash ?? getDefaultPayoutSettings().cash,
      card: setting.card ?? getDefaultPayoutSettings().card,
      bank: setting.bank ?? getDefaultPayoutSettings().bank
    });
  } catch (error: any) {
    if (error?.code === "P2021") return NextResponse.json(getDefaultPayoutSettings());
    throw error;
  }
}

// PUT /api/vendor/payout-settings { section, data }
export async function PUT(req: NextRequest) {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const body = await req.json();
  const { section, data } = body as { section: "cash" | "card" | "bank"; data: unknown };
  if (!section) return NextResponse.json({ error: "section is required" }, { status: 400 });

  const shop = await prisma.shop.findUnique({ where: { userId: user!.id }, select: { id: true } });
  if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  try {
    const updated = await prisma.vendorPayoutSetting.upsert({
      where: { shopId: shop.id },
      create: { shopId: shop.id, [section]: data },
      update: { [section]: data }
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    if (error?.code === "P2021") {
      return NextResponse.json({ error: "Run prisma migrate dev to enable payout settings." }, { status: 503 });
    }
    throw error;
  }
}
