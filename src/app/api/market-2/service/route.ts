import { NextResponse } from "next/server";
import { serviceList } from "__server__/__db__/market-2/data";

// Reused by market-3/section-2 for service cards (shipping, guarantee, etc.)
export async function GET() {
  return NextResponse.json(serviceList);
}
