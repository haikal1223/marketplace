import { NextRequest, NextResponse } from "next/server";
import { getShopsPaginated } from "lib/shops-server";

// GET /api/shops — paginated shop list
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "9");
  const data = await getShopsPaginated(page, limit);
  return NextResponse.json(data);
}
