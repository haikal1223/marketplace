import { NextRequest, NextResponse } from "next/server";
import { getProductBySlugPayload } from "lib/product-server";

// GET /api/products/slug?slug=product-slug
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const payload = await getProductBySlugPayload(slug);

  if (!payload) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(payload);
}
