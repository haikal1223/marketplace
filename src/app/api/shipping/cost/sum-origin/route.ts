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
  return null;
}

function extractEtdRank(etd: unknown) {
  if (!etd) return null;
  const s = String(etd);
  // Try pattern like "2-3" => take 3; otherwise take first number.
  const range = s.match(/(\d+)\s*-\s*(\d+)/);
  if (range) {
    const end = Number(range[2]);
    return Number.isFinite(end) ? end : null;
  }
  const single = s.match(/(\d+)/);
  if (single) {
    const v = Number(single[1]);
    return Number.isFinite(v) ? v : null;
  }
  return null;
}

// POST /api/shipping/cost/sum-origin
// Request body:
// - destinationDistrictId: string|number
// - weight: number (default 1000) [optional; if omitted, each origin provides its own weight]
// - origins: Array<{ originDistrictId: string|number, weight: number }>
// - courier?: string (colon separated list)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { destinationDistrictId, destination, origins, courier, debug } = body as {
    destinationDistrictId?: string | number;
    destination?: string | number;
    origins?: Array<{ originDistrictId: string | number; weight: number }>;
    courier?: string;
    debug?: boolean;
  };

  const dest = destinationDistrictId ?? destination;
  if (!dest) {
    return NextResponse.json({ error: "destinationDistrictId is required" }, { status: 400 });
  }

  if (!Array.isArray(origins) || origins.length === 0) {
    return NextResponse.json({ error: "origins must be a non-empty array" }, { status: 400 });
  }

  const destinations = String(dest);
  const requestedCourier = courier || DEFAULT_COURIERS;

  type Agg = {
    code: string;
    service: string;
    name: string;
    description: string;
    cost: number;
    etd: string;
    _etdRank: number;
  };
  type OriginDebug = {
    originDistrictId: string | number | null;
    weight: number | null;
    ok: boolean;
    reason?:
      | "missing_origin"
      | "invalid_weight"
      | "request_failed"
      | "invalid_json"
      | "meta_not_200"
      | "invalid_data"
      | "no_options";
    metaCode?: number | null;
    metaMessage?: string;
    rawOptionCount?: number;
    validOptionCount?: number;
    serviceKeys?: string[];
  };

  const bestByKey = new Map<string, Agg>();
  const debugRows: OriginDebug[] = [];

  for (const origin of origins) {
    const originDistrictId = origin.originDistrictId;
    const originWeight = origin.weight;

    if (!originDistrictId) {
      debugRows.push({
        originDistrictId: null,
        weight: originWeight ?? null,
        ok: false,
        reason: "missing_origin"
      });
      continue;
    }
    if (!originWeight || originWeight <= 0) {
      debugRows.push({
        originDistrictId,
        weight: originWeight ?? null,
        ok: false,
        reason: "invalid_weight"
      });
      continue;
    }

    const formData = new URLSearchParams();
    formData.append("origin", String(originDistrictId));
    formData.append("destination", destinations);
    formData.append("weight", String(originWeight));
    formData.append("courier", requestedCourier);

    let json: any;
    try {
      const res = await fetch(`${RAJA_ONGKIR_BASE}/calculate/domestic-cost`, {
        method: "POST",
        headers: {
          key: API_KEY,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
      });
      try {
        json = await res.json();
      } catch {
        debugRows.push({
          originDistrictId,
          weight: originWeight,
          ok: false,
          reason: "invalid_json"
        });
        continue;
      }
    } catch {
      debugRows.push({
        originDistrictId,
        weight: originWeight,
        ok: false,
        reason: "request_failed"
      });
      continue;
    }

    if (json.meta?.code !== 200) {
      debugRows.push({
        originDistrictId,
        weight: originWeight,
        ok: false,
        reason: "meta_not_200",
        metaCode: typeof json.meta?.code === "number" ? json.meta.code : null,
        metaMessage: typeof json.meta?.message === "string" ? json.meta.message : undefined
      });
      continue;
    }

    const list = json.data;
    if (!Array.isArray(list)) {
      debugRows.push({
        originDistrictId,
        weight: originWeight,
        ok: false,
        reason: "invalid_data"
      });
      continue;
    }
    const beforeCount = bestByKey.size;

    for (const opt of list) {
      const code = (opt as any).code ?? (opt as any).courierCode ?? (opt as any).name;
      const service = (opt as any).service ?? (opt as any).description ?? "";
      if (!code || !service) continue;

      const cost = toNumberMaybe((opt as any).cost);
      if (cost === null) continue;

      const key = `${code}-${service}`;
      const etd = (opt as any).etd ?? "";
      const etdRank = extractEtdRank(etd);

      const existing = bestByKey.get(key);
      if (!existing) {
        bestByKey.set(key, {
          code: String(code),
          service: String(service),
          name: String((opt as any).name ?? code),
          description: String((opt as any).description ?? ""),
          cost,
          etd: String(etd),
          _etdRank: etdRank ?? -Infinity
        });
      } else {
        existing.cost += cost;

        // ETD terlama untuk shipment total.
        if ((etdRank ?? -Infinity) > existing._etdRank) {
          existing._etdRank = etdRank ?? existing._etdRank;
          existing.etd = String(etd);
          existing.name = String((opt as any).name ?? existing.name);
          existing.description = String((opt as any).description ?? existing.description);
        }
      }
    }
    const afterCount = bestByKey.size;
    const added = afterCount - beforeCount;
    debugRows.push({
      originDistrictId,
      weight: originWeight,
      ok: added > 0,
      reason: added > 0 ? undefined : "no_options",
      rawOptionCount: list.length,
      validOptionCount: added,
      serviceKeys: added > 0 ? Array.from(bestByKey.keys()) : []
    });
  }

  const aggregated = Array.from(bestByKey.values())
    .sort((a, b) => a.cost - b.cost)
    .map((x) => ({
      code: x.code,
      service: x.service,
      name: x.name,
      description: x.description,
      cost: x.cost,
      etd: x.etd
    }));

  if (debug) {
    return NextResponse.json({
      options: aggregated,
      debug: {
        destinationDistrictId: destinations,
        requestedCourier,
        apiKeyPresent: Boolean(API_KEY),
        originCount: origins.length,
        aggregatedCount: aggregated.length,
        origins: debugRows
      }
    });
  }

  return NextResponse.json(aggregated);
}

