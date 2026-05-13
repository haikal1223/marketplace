import { Metadata } from "next";
import { ProductCreatePageView } from "pages-sections/vendor-dashboard/products/page-view";

export const metadata: Metadata = {
  title: "Add Product - Vendor Dashboard",
  description: "Create a new product"
};

export default function VendorProductCreate() {
  return <ProductCreatePageView />;
}
