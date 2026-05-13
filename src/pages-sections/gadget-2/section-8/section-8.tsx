import Container from "components/Container";
import SubscribeInput from "components/subscribe-input";
//STYLED COMPONENTS
import { RootStyle } from "./styles";

export default function Section8() {
  return (
    <Container>
      <RootStyle>
        <div className="content">
          <p>Sign Up Newsletter & Promotions!</p>

          <h2 className="heading">
            Get 50% Discount
            <span>On your next purchase</span>
          </h2>

          <SubscribeInput fullWidth />
        </div>
      </RootStyle>
    </Container>
  );
}
