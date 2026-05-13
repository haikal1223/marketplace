"use client";

import { useEffect, useState } from "react";
import Product from "models/Product.model";

/**
 * Which product IDs on the current page are in the signed-in user's wishlist.
 * Guests always get an empty set.
 */
export function useWishlistProductIds(products: Product[]) {
  const [ids, setIds] = useState<Set<string>>(new Set());

  const idsKey = [...products.map((p) => p.id)].sort().join(",");

  useEffect(() => {
    if (!idsKey) {
      setIds(new Set());
      return;
    }
    let cancelled = false;
    fetch(`/api/users/wishlist?ids=${encodeURIComponent(idsKey)}`)
      .then((r) => (r.ok ? r.json() : { wishlistedProductIds: [] }))
      .then((data: { wishlistedProductIds?: string[] }) => {
        if (cancelled) return;
        setIds(new Set(data.wishlistedProductIds ?? []));
      })
      .catch(() => {
        if (!cancelled) setIds(new Set());
      });
    return () => {
      cancelled = true;
    };
  }, [idsKey]);

  return ids;
}
