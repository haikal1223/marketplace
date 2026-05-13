import { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderDetailsPageView } from "pages-sections/vendor-dashboard/orders/page-view";
import api from "utils/__api__/vendor-orders";
import { IdParams } from "models/Common";

export const metadata: Metadata = {
  title: "Vendor Order Details - Bazaar Next.js E-commerce Template",
  description:
    "Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store",
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function VendorOrderDetails({ params }: IdParams) {
  const { id } = await params;
  const order = await api.getOrder(id);
  if (!order) notFound();

  return <OrderDetailsPageView order={order} statusUpdateUrl={`/api/vendor/orders/${id}`} />;
}
