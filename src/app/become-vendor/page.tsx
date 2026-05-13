import type { Metadata } from "next";
import { BecomeVendorPageView } from "pages-sections/become-vendor/page-view";

export const metadata: Metadata = {
  title: "Become a Vendor - Bazaar Next.js E-commerce Template",
  description: "Apply to become a vendor and set up your shop."
};

export default function BecomeVendor() {
  return <BecomeVendorPageView />;
}

