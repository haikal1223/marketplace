import { NextRequest, NextResponse } from "next/server";
import {
  catalogParamsFromSearchParams,
  getProductsCatalog,
} from "lib/products-catalog-server";

// GET /api/products/catalog — published products for /products/search (filters + pagination)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const params = catalogParamsFromSearchParams(searchParams);
  const data = await getProductsCatalog(params);
  return NextResponse.json(data);
}
