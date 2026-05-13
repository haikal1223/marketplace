import { Fragment } from "react";
// GLOBAL CUSTOM COMPONENTS
import Setting from "components/settings";
// LOCAL CUSTOM SECTION COMPONENTS
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";
import Section7 from "../section-7";
import Section8 from "../section-8";
import Section9 from "../section-9";

export default function GadgetTwoPageView() {
  return (
    <Fragment>
      {/* GRID CARD SECTION */}
      <Section1 />

      {/* BEST SELLER PRODUCTS SECTION */}
      <Section2 />

      {/* APPLE WATCH BANNER SECTION */}
      <Section3 />

      {/* NEW ARRIVAL PRODUCTS SECTION */}
      <Section4 />

      {/* SPEAKER & IPHONE BANNER SECTION */}
      <Section5 />

      {/* TESTIMONIAL SECTION */}
      <Section9 />

      {/* LATEST BLOG SECTION */}
      <Section6 />

      {/* NEWSLETTER SECTION */}
      <Section8 />

      {/* SERVICE LIST SECTION */}
      <Section7 />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />
    </Fragment>
  );
}
