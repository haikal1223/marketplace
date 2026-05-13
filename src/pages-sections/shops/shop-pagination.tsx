"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import FlexBetween from "components/flex-box/flex-between";

// ==============================================================
interface Props {
  totalShops: number;
  totalPages: number;
  lastIndex: number;
  firstIndex: number;
}
// ==============================================================

export default function ShopPagination({ totalShops, totalPages, firstIndex, lastIndex }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = +searchParams.get("page")! || 1;

  return (
    <FlexBetween flexWrap="wrap" mt={4}>
      <Typography component="span" sx={{ color: "grey.600" }}>
        Showing {firstIndex}-{lastIndex} of {totalShops} Shops
      </Typography>

      <Pagination
        page={page}
        count={totalPages}
        variant="outlined"
        color="primary"
        onChange={(_, page) => {
          const searchParams = new URLSearchParams();
          if (page === 1) searchParams.delete("page");
          else searchParams.set("page", page.toString());
          router.push(`${pathname}?${searchParams.toString()}`);
        }}
      />
    </FlexBetween>
  );
}
