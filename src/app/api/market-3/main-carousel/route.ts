import { NextResponse } from "next/server";
import { mainCarouselData } from "__server__/__db__/market-3/data";

// Carousel data is static content; move to DB/CMS for dynamic management
export async function GET() {
  return NextResponse.json(mainCarouselData);
}
