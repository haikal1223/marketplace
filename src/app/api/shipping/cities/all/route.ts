import { NextResponse } from "next/server";

const RAJA_ONGKIR_BASE = "https://rajaongkir.komerce.id/api/v1";
const API_KEY = process.env.RAJA_ONGKIR_SECRET_KEY ?? "";

type Province = { id: number | string; name: string };
type City = { id: number | string; name: string; provinceId?: number | string };

// GET /api/shipping/cities/all
// Returns all cities from RajaOngkir (cached by Next route revalidate).
export async function GET() {
  const provinceRes = await fetch(`${RAJA_ONGKIR_BASE}/destination/province`, {
    headers: { key: API_KEY },
    next: { revalidate: 86400 }
  });

  const provinceJson = await provinceRes.json();
  if (provinceJson.meta?.code !== 200) {
    return NextResponse.json(
      { error: provinceJson.meta?.message ?? "Failed to fetch provinces" },
      { status: 500 }
    );
  }

  const provinces = (provinceJson.data ?? []) as Province[];

  // Fetch city list for each province.
  const cityLists = await Promise.all(
    provinces.map(async (p) => {
      const res = await fetch(`${RAJA_ONGKIR_BASE}/destination/city/${p.id}`, {
        headers: { key: API_KEY },
        next: { revalidate: 86400 }
      });
      const json = await res.json();
      if (json.meta?.code !== 200) return [] as City[];

      return (json.data ?? []).map((c: any) => ({
        id: c.id,
        name: c.name,
        provinceId: p.id
      }));
    })
  );

  const cities = cityLists.flat();
  return NextResponse.json(cities);
}

