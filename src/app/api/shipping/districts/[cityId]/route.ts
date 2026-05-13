import { NextRequest, NextResponse } from "next/server";

const RAJA_ONGKIR_BASE = "https://rajaongkir.komerce.id/api/v1";
const API_KEY = process.env.RAJA_ONGKIR_SECRET_KEY ?? "";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ cityId: string }> }) {
  const { cityId } = await params;

  const res = await fetch(`${RAJA_ONGKIR_BASE}/destination/district/${cityId}`, {
    headers: { key: API_KEY },
    next: { revalidate: 86400 }
  });

  const json = await res.json();
  if (json.meta?.code !== 200) {
    return NextResponse.json({ error: json.meta?.message ?? "Failed to fetch districts" }, { status: 500 });
  }

  return NextResponse.json(json.data);
}
