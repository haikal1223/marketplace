import { NextResponse } from "next/server";
import { fetchVendorProductReviewsForUser } from "lib/vendor-public-server";
import { requireRole } from "lib/auth-helpers";

// GET /api/vendor/product-reviews
export async function GET() {
  const { user, response } = await requireRole("VENDOR", "ADMIN");
  if (response) return response;

  const data = await fetchVendorProductReviewsForUser(user!.id);
  if (!data) return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  return NextResponse.json(data);
}
