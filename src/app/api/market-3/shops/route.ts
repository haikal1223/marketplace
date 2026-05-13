import { NextResponse } from "next/server";
import { getMarket3ShopsList } from "lib/market-3-server";

export async function GET() {
  const shops = await getMarket3ShopsList();
  return NextResponse.json(shops);
}
