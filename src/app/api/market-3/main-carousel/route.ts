import { NextResponse } from "next/server";
import { getMarket3MainCarousel } from "lib/market-3-server";

export async function GET() {
  const data = await getMarket3MainCarousel();
  return NextResponse.json(data);
}
