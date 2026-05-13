import Container from "components/Container";
import LazyImage from "components/LazyImage";
// STYLED COMPONENTS
import { RootStyle, StyledLink } from "./styles";
// IMPORT IMAGE
import watch from "../../../../public/assets/images/gadget-2/watch-3.png";

export default function Section3() {
  return (
    <Container sx={{ mt: { xs: 6, sm: 14 } }}>
      <RootStyle>
        <div className="content">
          <p>Apple Watch Series 9</p>

          <h2>
            Magic. At your <br /> fingertips.
          </h2>

          <StyledLink href="/">Shop Now</StyledLink>
        </div>

        <div className="img-wrapper">
          <LazyImage src={watch} alt="Watch" />
        </div>
      </RootStyle>
    </Container>
  );
}
