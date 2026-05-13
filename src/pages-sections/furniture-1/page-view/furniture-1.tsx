import { Fragment } from "react";
// GLOBAL CUSTOM COMPONENTS
import Setting from "components/settings";
import Newsletter from "components/newsletter";
import StickyWrapper from "components/sticky-wrapper";
import SideNavbar from "components/page-sidenav/side-navbar";
// LOCAL CUSTOM COMPONENTS
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
// API FUNCTIONS
import api from "utils/__api__/furniture-1";

// ==============================================================
type Props = { selected?: string };
// ==============================================================

export default async function FurnitureOnePageView({ selected }: Props) {
  const [topNewProducts, furnitureProducts, topSellingProducts, navList] = await Promise.all([
    api.getTopNewProducts(),
    api.getFurnitureProducts(selected),
    api.getTopSellingProducts(),
    api.getFurnitureShopNavList()
  ]);

  // SIDE NAVBAR COMPONENT
  const SideNav = <SideNavbar line="dash" navList={navList} sx={{ borderRadius: 0 }} />;

  return (
    <Fragment>
      {/* HERO SECTION */}
      <Section1 />

      <StickyWrapper className="pb-4" SideNav={SideNav}>
        {selected ? (
          <Section4 heading={selected} products={furnitureProducts} />
        ) : (
          <Fragment>
            {/* OFFER BANNERS AREA */}
            <Section2 />

            {/* TOP NEW PRODUCTS AREA */}
            <Section3
              products={topNewProducts}
              heading="Top New Product"
              description="Tall blind but were, been folks not the expand"
            />

            {/* TOP SELLING PRODUCT AREA */}
            <Section3
              products={topSellingProducts}
              heading="Top Selling Product"
              description="Tall blind but were, been folks not the expand"
            />

            {/* ALL PRODUCTS AREA */}
            <Section4 heading="All Products" products={furnitureProducts} />
          </Fragment>
        )}
      </StickyWrapper>

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter image="/assets/images/newsletter/bg-3.png" />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />
    </Fragment>
  );
}
