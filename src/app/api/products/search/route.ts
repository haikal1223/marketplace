import { NextRequest, NextResponse } from "next/server";
import { searchProductTitles } from "lib/product-server";

// GET /api/products/search?name=keyword&category=slug
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const category = searchParams.get("category");

  const titles = await searchProductTitles(name, category);
  return NextResponse.json(titles);
}
