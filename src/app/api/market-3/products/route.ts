import { NextRequest, NextResponse } from "next/server";
import { getMarket3ProductsList } from "lib/market-3-server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const products = await getMarket3ProductsList(type);
  return NextResponse.json(products);
}
