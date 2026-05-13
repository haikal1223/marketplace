import { Metadata } from "next";
import { getServerAxios } from "utils/serverAxios";
import { VendorProductsPageView } from "pages-sections/vendor-dashboard/products/page-view";

export const metadata: Metadata = {
  title: "My Products - Vendor Dashboard",
  description: "Manage your products in the vendor dashboard"
};

export default async function VendorProducts() {
  const api = await getServerAxios();
  const res = await api.get("/api/vendor/products");
  const products = res.data.products ?? [];

  return <VendorProductsPageView products={products} />;
}
