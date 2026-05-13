import { NextResponse } from "next/server";
import { getLayoutPayload } from "lib/get-layout-payload";

export async function GET() {
  return NextResponse.json(getLayoutPayload());
}
