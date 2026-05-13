import { NextResponse } from "next/server";
import { getMarket3Services } from "lib/market-3-server";

export async function GET() {
  const services = await getMarket3Services();
  return NextResponse.json(services);
}
