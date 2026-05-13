import { NextRequest, NextResponse } from "next/server";
import { getRelatedProductsData } from "lib/related-products-server";

// GET /api/related-products?slug=product-slug&limit=4
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const limit = parseInt(searchParams.get("limit") ?? "4", 10) || 4;

  const products = await getRelatedProductsData(slug, limit);
  return NextResponse.json(products);
}
