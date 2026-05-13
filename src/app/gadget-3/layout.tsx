import type { PropsWithChildren } from "react";
import ShopLayout4 from "components/layouts/shop-layout-4";
// API FUNCTIONS
import api from "utils/__api__/gadget-3";
import layoutApi from "utils/__api__/layout";

export default async function Layout({ children }: PropsWithChildren) {
  const [categories, layoutData] = await Promise.all([
    api.getCategories(),
    layoutApi.getLayoutData()
  ]);

  if (!categories && !layoutData) {
    return <>{children}</>;
  }

  return (
    <ShopLayout4 navigation={categories} data={layoutData}>
      {children}
    </ShopLayout4>
  );
}
