import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENT
import { RootStyle } from "./styles";
// IMPORT IMAGES
import headerImg from "../../../../public/assets/images/headers/furniture-2.jpg";

export default function Section1() {
  return (
    <Container>
      <RootStyle>
        <LazyImage className="banner" alt="furniture shop" src={headerImg} />

        <div className="content">
          <p className="sub-title">Spring</p>
          <h2 className="title">Collection</h2>

          <p className="price">
            Start from <span>$40.45</span>
          </p>

          <Button variant="contained" color="orange" size="large" disableElevation>
            Shop Now
          </Button>
        </div>
      </RootStyle>
    </Container>
  );
}
