import { NextResponse } from "next/server";
import { getShopSlugParamsList } from "lib/shops-server";

// GET /api/shops/slugs — all shop slugs for static generation
export async function GET() {
  const slugs = await getShopSlugParamsList();
  return NextResponse.json(slugs);
}
