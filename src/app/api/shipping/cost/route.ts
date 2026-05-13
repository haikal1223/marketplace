import { NextRequest, NextResponse } from "next/server";

const RAJA_ONGKIR_BASE = "https://rajaongkir.komerce.id/api/v1";
const API_KEY = process.env.RAJA_ONGKIR_SECRET_KEY ?? "";

const DEFAULT_COURIERS = "jne:sicepat:ide:sap:jnt:ninja:tiki:lion:anteraja:pos:ncs:rex:rpx:sentral:star:wahana:dse";

// POST /api/shipping/cost
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { destination, weight = 1000, courier } = body;
  const origin = process.env.SHIPPING_ORIGIN_DISTRICT_ID ?? "1391";

  if (!destination) {
    return NextResponse.json({ error: "Destination is required" }, { status: 400 });
  }

  const formData = new URLSearchParams();
  formData.append("origin", origin);
  formData.append("destination", String(destination));
  formData.append("weight", String(weight));
  formData.append("courier", courier || DEFAULT_COURIERS);

  const res = await fetch(`${RAJA_ONGKIR_BASE}/calculate/domestic-cost`, {
    method: "POST",
    headers: {
      key: API_KEY,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formData.toString()
  });

  const json = await res.json();
  if (json.meta?.code !== 200) {
    return NextResponse.json({ error: json.meta?.message ?? "Failed to calculate cost" }, { status: 500 });
  }

  return NextResponse.json(json.data);
}
