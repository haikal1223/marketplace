import type { Metadata } from "next";
import { MarketThreePageView } from "pages-sections/market-3/page-view";
import ShopLayout1 from "components/layouts/shop-layout-1";
import api from "utils/__api__/layout";

/** Same as /market-3: page uses Prisma-backed demo data. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bazaar - Next.js E-commerce Template",
  description:
    "Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store",
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function IndexPage() {
  const data = await api.getLayoutData();
  return (
    <ShopLayout1 data={data}>
      <MarketThreePageView />
    </ShopLayout1>
  );
}
