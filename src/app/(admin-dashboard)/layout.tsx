import { PropsWithChildren } from "react";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";

export const dynamic = "force-dynamic";

export default function Layout({ children }: PropsWithChildren) {
  return <VendorDashboardLayout>{children}</VendorDashboardLayout>;
}
