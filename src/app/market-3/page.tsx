import type { Metadata } from "next";
import { MarketThreePageView } from "pages-sections/market-3/page-view";

/** Prisma-backed sections require a live DB; skip static prerender so `next build` works without DB. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Market 3 - Bazaar Next.js E-commerce Template",
  description:
    "Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store",
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function MarketThree() {
  return <MarketThreePageView />;
}
