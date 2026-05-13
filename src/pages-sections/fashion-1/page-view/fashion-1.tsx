import { Fragment } from "react";
// GLOBAL CUSTOM COMPONENTS
import Setting from "components/settings";
import Newsletter from "components/newsletter";
// LOCAL CUSTOM SECTION COMPONENTS
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";
import Section7 from "../section-7";

export default function FashionOnePageView() {
  return (
    <Fragment>
      {/* DIFFERENT BANNERS AND PROMOTIONS */}
      <Section1 />

      {/* FLASH DEALS */}
      <Section2 />

      {/* NEW ARRIVALS */}
      <Section3 />

      {/* GRID BANNERS AND PROMOTIONS */}
      <Section4 />

      {/* HOT DEALS OF THE DAY */}
      <Section5 />

      {/* TRENDING ITEMS */}
      <Section6 />

      {/* SERVICE ITEMS */}
      <Section7 />

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />
    </Fragment>
  );
}
