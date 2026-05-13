import { Fragment } from "react";
// GLOBAL COMPONENTS
import Setting from "components/settings";
import Newsletter from "components/newsletter";
// LOCAL CUSTOM COMPONENTS
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";
import Section7 from "../section-7";
import Section8 from "../section-8";
import Section9 from "../section-9";

export default function MarketOnePageView() {
  return (
    <Fragment>
      {/* HERO SLIDER SECTION */}
      <Section1 />

      {/* FLASH DEALS SECTION */}
      <Section2 />

      {/* CUSTOM SOLUTIONS SECTION */}
      <Section3 />

      {/* JUST FOR YOU SECTION */}
      <Section4 />

      {/* PROMO BANNERS SECTION */}
      <Section5 />

      {/* NEW ARRIVALS SECTION */}
      <Section6 />

      {/* GRID PRODUCTS SECTION */}
      <Section7 />

      {/* BLOG SECTION */}
      <Section8 />

      {/* SERVICES SECTION */}
      <Section9 />

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />
    </Fragment>
  );
}
