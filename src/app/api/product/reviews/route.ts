import { NextRequest, NextResponse } from "next/server";
import { getPublishedReviewsFormatted } from "lib/product-server";

// GET /api/product/reviews?productId=xxx
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  const data = await getPublishedReviewsFormatted(productId);
  return NextResponse.json(data);
}
