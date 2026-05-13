import type { Metadata } from "next";
import { OrdersPageView } from "pages-sections/vendor-dashboard/orders/page-view";
import api from "utils/__api__/vendor-orders";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vendor Orders - Bazaar Next.js E-commerce Template",
  description:
    "Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store",
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function VendorOrdersPage() {
  const orders = await api.orders();
  return <OrdersPageView orders={orders} searchUrl="/vendor/orders" detailsBasePath="/vendor/orders" />;
}
