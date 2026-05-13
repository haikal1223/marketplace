import { NextResponse } from "next/server";
import { getMarket3Categories } from "lib/market-3-server";

export async function GET() {
  const categories = await getMarket3Categories();
  return NextResponse.json(categories);
}
