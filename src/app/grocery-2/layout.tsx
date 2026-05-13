import type { PropsWithChildren } from "react";
import ShopLayout2 from "components/layouts/shop-layout-2";
// API FUNCTIONS
import api from "utils/__api__/layout";

export default async function Layout({ children }: PropsWithChildren) {
  const data = await api.getLayoutData();
  return <ShopLayout2 data={data}>{children}</ShopLayout2>;
}
