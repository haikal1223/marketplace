import Button from "@mui/material/Button";
import Container from "components/Container";
// STYLED COMPONENT
import { BannerWrapper } from "./styles";

export default function Section7() {
  return (
    <Container>
      <BannerWrapper>
        <div className="content">
          <h3>
            GIFT <span>50% OFF</span> PERFECT STYLES
          </h3>

          <p>Only until the end of this week. Terms and conditions apply</p>
        </div>

        <Button color="primary" size="large" variant="contained">
          Discover Now
        </Button>
      </BannerWrapper>
    </Container>
  );
}
