import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash/debounce";

/** Maksimum rentang filter — 100 juta Rupiah */
const PRICE_MAX_IDR = 100_000_000;

function normalizePriceRange(pair: number[]): [number, number] {
  const a0 = Number(pair[0]) || 0;
  const a1 = Number(pair[1]) || 0;
  let lo = Math.max(0, Math.min(a0, a1));
  let hi = Math.max(a0, a1);
  hi = Math.min(Math.max(lo, hi), PRICE_MAX_IDR);
  lo = Math.min(lo, hi);
  return [lo, hi];
}

export default function useProductFilterCard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [collapsed, setCollapsed] = useState(true);
  const [prices, setPrices] = useState<number[]>(() => {
    try {
      const raw = JSON.parse(searchParams.get("prices") || "[0, 100000000]") as number[];
      if (!Array.isArray(raw) || raw.length < 2) return [0, PRICE_MAX_IDR];
      return normalizePriceRange(raw);
    } catch {
      return [0, PRICE_MAX_IDR];
    }
  });

  const rating = useMemo<number>(
    () => JSON.parse(searchParams.get("rating") || "0"),
    [searchParams]
  );

  const colors = useMemo<string[]>(
    () => JSON.parse(searchParams.get("colors") || "[]"),
    [searchParams]
  );

  const sales = useMemo<string[]>(
    () => JSON.parse(searchParams.get("sales") || "[]"),
    [searchParams]
  );

  const brands = useMemo<string[]>(
    () => JSON.parse(searchParams.get("brands") || "[]"),
    [searchParams]
  );

  const handleChangeSearchParams = useCallback(
    (key: string, value: string) => {
      if (!key || !value) return;
      const params = new URLSearchParams(searchParams);
      params.set(key, value);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const debouncedChangePrice = debounce((values: number[]) => {
    handleChangeSearchParams("prices", JSON.stringify(values));
  }, 500);

  const handleChangePrice = useCallback(
    (values: number[]) => {
      const v = normalizePriceRange(values);
      setPrices(v);
      debouncedChangePrice(v);
    },
    [debouncedChangePrice]
  );

  const handleChangeColor = (value: string) => {
    const values = colors.includes(value)
      ? colors.filter((item) => item !== value)
      : [...colors, value];

    handleChangeSearchParams("colors", JSON.stringify(values));
  };

  const handleChangeBrand = (value: string) => {
    const values = brands.includes(value)
      ? brands.filter((item) => item !== value)
      : [...brands, value];

    handleChangeSearchParams("brands", JSON.stringify(values));
  };

  const handleChangeSales = (value: string) => {
    const values = sales.includes(value)
      ? sales.filter((item) => item !== value)
      : [...sales, value];

    handleChangeSearchParams("sales", JSON.stringify(values));
  };

  return {
    sales,
    brands,
    rating,
    colors,
    prices,
    collapsed,
    setCollapsed,
    handleChangePrice,
    handleChangeColor,
    handleChangeBrand,
    handleChangeSales,
    handleChangeSearchParams
  };
}
