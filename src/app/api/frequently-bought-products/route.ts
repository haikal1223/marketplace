import { NextRequest, NextResponse } from "next/server";
import { getFrequentlyBoughtData } from "lib/related-products-server";

// GET /api/frequently-bought-products?slug=product-slug&limit=3
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const limit = parseInt(searchParams.get("limit") ?? "3", 10) || 3;

  const products = await getFrequentlyBoughtData(slug, limit);
  return NextResponse.json(products);
}
