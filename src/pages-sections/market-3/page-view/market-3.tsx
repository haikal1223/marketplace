import { Fragment } from "react";
//GLOBAL CUSTOM COMPONENTS
import Setting from "components/settings";
import Newsletter from "components/newsletter";
//LOCAL CUSTOM COMPONENTS
import Offers from "../offers";
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";
import Section7 from "../section-7";
import Section8 from "../section-8";
import Section9 from "../section-9";
import Section10 from "../section-10";
// API FUNCTIONS
import api from "utils/__api__/market-3";

export default async function MarketThreePageView() {
  const [mainCarouselData, menFashionProducts, electronicsProducts, womenFashionProducts] =
    await Promise.all([
      api.getMainCarouselData(),
      api.getMenFashionProducts(),
      api.getElectronicsProducts(),
      api.getWomenFashionProducts()
    ]);

  return (
    <Fragment>
      {/* HERO SLIDER AND GRID */}
      <Section1 carouselData={mainCarouselData} />

      {/* SERVICE CARDS */}
      <Section2 />

      {/* CATEGORIES AND ANIMATED OFFER BANNER */}
      <Section3 />

      {/* DEALS OF THE DAY AND OFFER BANNERS */}
      <Section4 />

      {/* TOP OFFER BANNERS */}
      <Offers />

      {/* PRODUCT ROW WITH ELECTRONICS CATEGORY LIST */}
      <Section5 data={electronicsProducts} />

      {/* OFFER BANNER */}
      <Section6 />

      {/* PRODUCT ROW WITH MEN'S FASHION CATEGORY LIST */}
      <Section5 data={menFashionProducts} />

      {/* OFFER BANNER */}
      <Section7 />

      {/* PRODUCT ROW WITH WOMEN'S FASHION CATEGORY LIST */}
      <Section5 data={womenFashionProducts} />

      {/*  FEATURED BRANDS */}
      <Section8 />

      {/* SELECTED PRODUCTS */}
      <Section9 />

      {/* FEATURED VENDORS */}
      <Section10 />

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />
    </Fragment>
  );
}
