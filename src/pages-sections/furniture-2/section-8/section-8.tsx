import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import SubscribeInput from "components/subscribe-input";
// STYLED COMPONENT
import { RootStyle } from "./styles";
// IMPORT IMAGES
import bgImage from "../../../../public/assets/images/banners/banner-37.jpg";

export default function Section8() {
  return (
    <Container>
      <RootStyle>
        <LazyImage src={bgImage} alt="offer" />

        <div className="content">
          <h2>
            GET $20 OFF YOUR <br />
            FIRST ORDER
          </h2>

          <p className="description">On your next purchase</p>

          <SubscribeInput fullWidth />
        </div>
      </RootStyle>
    </Container>
  );
}
