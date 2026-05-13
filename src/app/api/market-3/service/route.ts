import { NextResponse } from "next/server";
import { services } from "__server__/__db__/market-3/data";

// Service cards are static content (shipping, warranty, etc.)
// Move to DB if you need CMS-managed service cards
export async function GET() {
  return NextResponse.json(services);
}
