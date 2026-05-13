import { NextResponse } from "next/server";
import { requireRole } from "lib/auth-helpers";

// GET /api/admin/package-payments
// Placeholder — implement seller subscription packages when needed
export async function GET() {
  const { response } = await requireRole("ADMIN");
  if (response) return response;

  return NextResponse.json([]);
}
