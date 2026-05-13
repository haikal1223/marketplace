import { Fragment } from "react";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import Setting from "components/settings";
import Newsletter from "components/newsletter";
// LOCAL CUSTOM COMPONENTS
import Section1 from "../section-1/section-1";
import Section2 from "../section-2/section-2";
import Section3 from "../section-3/section-3";
import Section4 from "../section-4/section-4";

export default function GroceryThreePageView() {
  return (
    <Fragment>
      {/* TOP HERO CAROUSEL AREA */}
      <Section1 />

      <Container className="mb-3">
        {/* DISCOUNT OFFERS AREA */}
        <Section2 />

        {/* TOP SALES PRODUCTS AREA */}
        <Section3 />

        {/* OUR ALL PRODUCTS AREA */}
        <Section4 />
      </Container>

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter image="/assets/images/newsletter/bg-2.png" />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />
    </Fragment>
  );
}
