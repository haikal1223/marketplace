// GLOBAL CUSTOM COMPONENTS
import Setting from "components/settings";
import { Footer2 } from "components/footer";
import Newsletter from "components/newsletter";
import StickyWrapper from "components/sticky-wrapper";
import OverlayScrollbar from "components/overlay-scrollbar";
import GrocerySideNav from "components/page-sidenav/grocery-side-nav";
import { MobileNavigationBar2 } from "components/mobile-navigation";
// LOCAL CUSTOM COMPONENTS
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";
// API FUNCTIONS
import api from "utils/__api__/grocery-2";
// CUSTOM DATA
import { mobileNavigationTwo } from "data/layout-data";

export default async function GroceryTwoPageView() {
  const [
    dairyProducts,
    navigationList,
    mainCarouselData,
    featuredProducts,
    bestHomeProducts,
    bestSellProducts
  ] = await Promise.all([
    api.getDairyProducts(),
    api.getNavigationList(),
    api.getMainCarousel(),
    api.getFeaturedProducts(),
    api.getBestHomeProducts(),
    api.getBestSellProducts()
  ]);

  // SIDE NAVBAR COMPONENT
  const SideNav = <GrocerySideNav navigation={navigationList} />;

  return (
    <div className="mt-1">
      <StickyWrapper SideNav={SideNav}>
        {/* TOP HERO AREA */}
        <Section1 carouselData={mainCarouselData} />

        {/* SERVICE LIST AREA */}
        <Section2 />

        {/* SHOP BY CATEGORY LIST AREA */}
        <Section3 />

        {/* FEATURED ITEMS AREA */}
        <Section6 title="Featured Items" products={featuredProducts} />

        {/* BEST SELLER IN YOUR AREA */}
        <Section6 title="Best Seller in Your Area" products={bestSellProducts} />

        {/* DISCOUNT BANNER AREA */}
        <Section4 />

        {/* BEST OF HOME ESSENTIALS PRODUCTS AREA  */}
        <Section6 title="Best of Home Essentials" products={bestHomeProducts} />

        {/* SNACKS-DRINKS-DAIRY PRODUCTS AREA */}
        <Section6 title="Snacks, Drinks, Dairy & More" products={dairyProducts} />

        {/* CLIENT TESTIMONIALS AREA */}
        <Section5 />

        {/* FOOTER AREA */}
        <Footer2 />
      </StickyWrapper>

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter image="/assets/images/newsletter/bg-2.png" />

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
      <MobileNavigationBar2 navigation={mobileNavigationTwo}>
        <OverlayScrollbar>{SideNav}</OverlayScrollbar>
      </MobileNavigationBar2>
    </div>
  );
}
