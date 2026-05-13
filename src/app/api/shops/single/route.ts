import { NextRequest, NextResponse } from "next/server";
import { getShopSingleBySlug } from "lib/shops-server";

// GET /api/shops/single?slug=shop-slug
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  const payload = await getShopSingleBySlug(slug);

  if (!payload) {
    return NextResponse.json({ error: "Shop not found" }, { status: 404 });
  }

  return NextResponse.json(payload);
}
