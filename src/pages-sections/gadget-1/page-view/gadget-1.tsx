import { Fragment } from "react";
// GLOBAL CUSTOM COMPONENTS
import Setting from "components/settings";
import Newsletter from "components/newsletter";
// LOCAL CUSTOM COMPONENTS
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section4 from "../section-4";
import Section6 from "../section-6";
import Section7 from "../section-7";
import Section8 from "../section-8";
import Section9 from "../section-9";
import Section10 from "../section-10";

export default function GadgetOnePageView() {
  return (
    <Fragment>
      {/* MAIN PRODUCT CAROUSEL AND TOP PICK PRODUCTS AREA */}
      <Section1 />

      {/* FEATURED CATEGORIES AREA */}
      <Section2 />

      {/* MOST VIEWED PRODUCTS AREA */}
      <Section4 />

      {/* GRID BANNERS SECTION */}
      <Section9 />

      {/* FLASH DEALS SECTION */}
      <Section6 />

      {/* BEST SELLING PRODUCTS AREA */}
      <Section8 />

      {/* TESTIMONIAL SECTION */}
      <Section10 />

      {/* OUR BLOG AREA */}
      <Section7 />

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />
    </Fragment>
  );
}
