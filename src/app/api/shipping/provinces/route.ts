import { NextResponse } from "next/server";

const RAJA_ONGKIR_BASE = "https://rajaongkir.komerce.id/api/v1";
const API_KEY = process.env.RAJA_ONGKIR_SECRET_KEY ?? "";

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json(
      {
        error: "RAJA_ONGKIR_SECRET_KEY belum terpasang di environment server.",
      },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(`${RAJA_ONGKIR_BASE}/destination/province`, {
      headers: { key: API_KEY },
      next: { revalidate: 86400 }, // cache 24h — provinces rarely change
    });

    const json = await res.json();
    if (json.meta?.code !== 200) {
      return NextResponse.json(
        {
          error:
            json.meta?.message ?? "Failed to fetch provinces from RajaOngkir",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(json.data);
  } catch {
    return NextResponse.json(
      { error: "Gagal terhubung ke layanan RajaOngkir saat memuat provinsi." },
      { status: 500 },
    );
  }
}
