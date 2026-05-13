import { NextResponse } from "next/server";
import { getMarket3Brands } from "lib/market-3-server";

export async function GET() {
  const brands = await getMarket3Brands();
  return NextResponse.json(brands);
}
