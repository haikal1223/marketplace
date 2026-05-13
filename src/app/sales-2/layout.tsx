import type { PropsWithChildren } from "react";
import Divider from "@mui/material/Divider";
// GLOBAL CUSTOM COMPONENTS
import Sticky from "components/sticky";
import SalesLayout from "components/layouts/sales-layout";
import SalesNavbar from "pages-sections/sales/sales-navbar";
// SALES API FUNCTIONS
import salesApi from "utils/__api__/sales";
import layoutApi from "utils/__api__/layout";

export default async function Layout({ children }: PropsWithChildren) {
  const [categories, layoutData] = await Promise.all([
    salesApi.getCategories(),
    layoutApi.getLayoutData()
  ]);

  return (
    <SalesLayout data={layoutData}>
      <Divider />

      <Sticky fixedOn={0} scrollDistance={200}>
        <SalesNavbar path="/sales-2" categories={categories} />
      </Sticky>

      {children}
    </SalesLayout>
  );
}
