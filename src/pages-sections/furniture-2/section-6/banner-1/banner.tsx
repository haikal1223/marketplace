// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// LOCAL CUSTOM COMPONENT
import CountDown from "./count-down";
// STYLED COMPONENTS
import { BannerWrapper } from "./styles";
// IMPORT IMAGE
import bannerImg from "../../../../../public/assets/images/banners/banner-32.jpg";

export default function Banner1() {
  return (
    <BannerWrapper>
      <LazyImage src={bannerImg} alt="banner" />

      <div className="content">
        <h6 className="title">Deal of the day</h6>
        <h3 className="tag">LIGHTNING</h3>

        <p className="price">
          Start from <span>$40.45</span>
        </p>

        {/* COUNT DOWN SECTION */}
        <CountDown />
      </div>
    </BannerWrapper>
  );
}
