"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import IconButton from "@mui/material/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import type { SxProps, Theme } from "@mui/material/styles";

type Props = {
  productId: string;
  /** From SSR or batch fetch; when set, skips auto-fetch on mount */
  initialWishlisted?: boolean;
  /** Load current membership when `initialWishlisted` is undefined */
  useAutoFetch?: boolean;
  sx?: SxProps<Theme>;
  size?: "small" | "medium";
};

export default function WishlistHeartButton({
  productId,
  initialWishlisted,
  useAutoFetch = false,
  sx,
  size = "small"
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [on, setOn] = useState(!!initialWishlisted);
  const [busy, setBusy] = useState(false);
  const userToggledRef = useRef(false);
  const prevProductId = useRef(productId);

  useEffect(() => {
    if (prevProductId.current !== productId) {
      prevProductId.current = productId;
      userToggledRef.current = false;
    }
    if (!userToggledRef.current) {
      setOn(!!initialWishlisted);
    }
  }, [productId, initialWishlisted]);

  useEffect(() => {
    if (!useAutoFetch || initialWishlisted !== undefined || status !== "authenticated") return;
    let cancelled = false;
    fetch(`/api/users/wishlist?ids=${encodeURIComponent(productId)}`)
      .then((r) => (r.ok ? r.json() : { wishlistedProductIds: [] }))
      .then((data: { wishlistedProductIds?: string[] }) => {
        if (cancelled) return;
        const ids = data.wishlistedProductIds ?? [];
        setOn(ids.includes(productId));
      })
      .catch(() => {
        if (!cancelled) setOn(false);
      });
    return () => {
      cancelled = true;
    };
  }, [productId, initialWishlisted, useAutoFetch, status]);

  const toggle = useCallback(async () => {
    if (busy) return;
    if (status === "loading") return;

    if (status !== "authenticated" || !session?.user) {
      const dest = pathname || "/";
      router.push(`/login?callbackUrl=${encodeURIComponent(dest)}`);
      return;
    }

    setBusy(true);
    const next = !on;
    userToggledRef.current = true;
    setOn(next);
    try {
      if (next) {
        const res = await fetch("/api/users/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId })
        });
        if (res.status === 401) {
          setOn(false);
          userToggledRef.current = false;
          router.push(`/login?callbackUrl=${encodeURIComponent(pathname || "/")}`);
          return;
        }
        if (!res.ok) {
          setOn(!next);
          userToggledRef.current = false;
        }
      } else {
        const res = await fetch(`/api/users/wishlist?productId=${encodeURIComponent(productId)}`, {
          method: "DELETE"
        });
        if (res.status === 401) {
          setOn(true);
          userToggledRef.current = false;
          router.push(`/login?callbackUrl=${encodeURIComponent(pathname || "/")}`);
          return;
        }
        if (!res.ok) {
          setOn(!next);
          userToggledRef.current = false;
        }
      }
    } catch {
      setOn(!next);
      userToggledRef.current = false;
    } finally {
      setBusy(false);
    }
  }, [busy, on, productId, pathname, router, session?.user, status]);

  return (
    <IconButton
      size={size}
      disabled={busy}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void toggle();
      }}
      aria-label={on ? "Hapus dari wishlist" : "Tambah ke wishlist"}
      sx={sx}>
      {on ? <Favorite color="primary" fontSize="small" /> : <FavoriteBorder fontSize="small" />}
    </IconButton>
  );
}
