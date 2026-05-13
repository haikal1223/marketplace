import { NextResponse } from "next/server";
import { getProductSlugParamsList } from "lib/product-server";

// GET /api/products/slug-list — returns all product slugs for static generation
export async function GET() {
  const slugs = await getProductSlugParamsList();
  return NextResponse.json(slugs);
}
