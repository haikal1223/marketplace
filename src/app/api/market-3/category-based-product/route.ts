import { NextRequest, NextResponse } from "next/server";
import { getMarket3CategoryBasedProduct } from "lib/market-3-server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get("tag") ?? "electronics";
  const data = await getMarket3CategoryBasedProduct(tag);
  return NextResponse.json(data);
}
