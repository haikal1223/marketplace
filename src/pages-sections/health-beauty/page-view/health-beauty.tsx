import { Fragment } from "react";
// GLOBAL CUSTOM COMPONENTS
import Setting from "components/settings";
import Newsletter from "components/newsletter";
import StickyWrapper from "components/sticky-wrapper";
import HealthBeautySideNav from "components/page-sidenav/health-beauty-side-nav";
import { MobileNavigationBar2 } from "components/mobile-navigation";
import { Footer2 } from "components/footer";
// LOCAL CUSTOM COMPONENTS
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
// API FUNCTIONS
import api from "utils/__api__/healthbeauty-shop";
// CUSTOM DATA
import { mobileNavigationTwo } from "data/layout-data";

// =====================================================
type Props = { selected?: string };
// =====================================================

export default async function HealthBeautyPageView({ selected }: Props) {
  const [services, products, navigationList, topNewProducts, mainCarouselData] = await Promise.all([
    api.getServices(),
    api.getProducts(selected),
    api.getNavigation(),
    api.getTopNewProducts(),
    api.getMainCarousel()
  ]);

  // SIDE NAVBAR COMPONENT
  const SideNav = <HealthBeautySideNav navigation={navigationList} />;

  return (
    <Fragment>
      {/* TOP HERO CAROUSEL AREA */}
      <Section1 carouselData={mainCarouselData} />

      <StickyWrapper SideNav={SideNav}>
        {selected ? (
          <Section4 products={products} title={selected} />
        ) : (
          <Fragment>
            {/* BANNER AREA */}
            <Section2 />

            {/* TOP NEW PRODUCTS AREA */}
            <Section3 products={topNewProducts} />

            {/* ALL PRODUCTS AREA */}
            <Section4 products={products} title="All Products" />
          </Fragment>
        )}

        {/* SERVICE LIST AREA */}
        <Section5 services={services} />

        {/* FOOTER AREA */}
        <Footer2 />
      </StickyWrapper>

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter image="/assets/images/newsletter/bg-4.png" />

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
      <MobileNavigationBar2 navigation={mobileNavigationTwo}>{SideNav}</MobileNavigationBar2>
    </Fragment>
  );
}
