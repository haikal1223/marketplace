import Header from "../header";
import Footer from "../footer";
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import CTASection from "../cta-section";
import Testimonials from "../testimonials";
import Setting from "components/settings";

export default function IndexPageView() {
  return (
    <>
      <Header />
      <Section1 />
      <Section2 />
      <Testimonials />
      <Section5 />
      <Section3 />
      <CTASection />
      <Section4 />
      <Footer />
      <Setting />
    </>
  );
}
