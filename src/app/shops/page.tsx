import type { Metadata } from "next";
import { notFound } from "next/navigation";
// API FUNCTIONS
import api from "utils/__api__/shop";
// PAGE VIEW COMPONENT
import { ShopsPageView } from "pages-sections/shops/page-view";

export const metadata: Metadata = {
  title: "Shops - Bazaar Next.js E-commerce Template",
  description:
    "Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store",
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function Shops() {
  const { shops, meta } = await api.getShopList();
  if (!shops) return notFound();

  return (
    <ShopsPageView
      shops={shops}
      lastIndex={meta.lastIndex}
      totalPages={meta.totalPages}
      firstIndex={meta.firstIndex}
      totalShops={meta.totalShops}
    />
  );
}
