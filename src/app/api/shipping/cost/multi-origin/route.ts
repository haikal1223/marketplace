import { NextRequest, NextResponse } from "next/server";

const RAJA_ONGKIR_BASE = "https://rajaongkir.komerce.id/api/v1";
const API_KEY = process.env.RAJA_ONGKIR_SECRET_KEY ?? "";
const DEFAULT_COURIERS = "jne:sicepat:ide:sap:jnt:ninja:tiki:lion:anteraja:pos:ncs:rex:rpx:sentral:star:wahana:dse";

function toNumberMaybe(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  if (value && typeof value === "object") {
    // Some RajaOngkir wrappers may nest cost (defensive)
    const v = (value as any).value ?? (value as any).cost;
    if (typeof v === "number") return v;
    if (typeof v === "string") {
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    }
  }
  return null;
}

// POST /api/shipping/cost/multi-origin
// Request body:
// - destinationDistrictId: string|number (alias: destination)
// - weight: number (default 1000)
// - originDistrictIds: string[]
// - courier?: string (colon separated list)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    destinationDistrictId,
    destination,
    weight = 1000,
    originDistrictIds,
    courier
  } = body as {
    destinationDistrictId?: string | number;
    destination?: string | number;
    weight?: number;
    originDistrictIds?: Array<string | number>;
    courier?: string;
  };

  const dest = destinationDistrictId ?? destination;
  if (!dest) {
    return NextResponse.json({ error: "destinationDistrictId is required" }, { status: 400 });
  }
  if (!Array.isArray(originDistrictIds) || originDistrictIds.length === 0) {
    return NextResponse.json({ error: "originDistrictIds must be a non-empty array" }, { status: 400 });
  }

  const destinations = String(dest);
  const origins = originDistrictIds.map((o) => String(o));
  const requestedCourier = courier || DEFAULT_COURIERS;

  // Key based on couriers + service so UI can still render a single radio list per vendor.
  const bestByKey = new Map<string, any>();

  await Promise.all(
    origins.map(async (originDistrictId) => {
      const formData = new URLSearchParams();
      formData.append("origin", originDistrictId);
      formData.append("destination", destinations);
      formData.append("weight", String(weight));
      formData.append("courier", requestedCourier);

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
        // Defensive: ignore origin that fails; UI can still show other results.
        return;
      }

      const list = json.data;
      if (!Array.isArray(list)) return;

      for (const opt of list) {
        const code = (opt as any).code ?? (opt as any).courierCode ?? (opt as any).name;
        const service = (opt as any).service ?? (opt as any).description ?? "";
        if (!code || !service) continue;

        const cost = toNumberMaybe((opt as any).cost);
        if (cost === null) continue;

        const key = `${code}-${service}`;
        const existing = bestByKey.get(key);
        if (!existing || cost < existing.cost) {
          bestByKey.set(key, {
            ...opt,
            code: String(code),
            service: String(service),
            cost,
            bestOriginDistrictId: originDistrictId
          });
        }
      }
    })
  );

  const aggregated = Array.from(bestByKey.values()).sort((a, b) => (a.cost ?? 0) - (b.cost ?? 0));
  return NextResponse.json(aggregated);
}

