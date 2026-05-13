import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import SubscribeInput from "components/subscribe-input";
// STYLED COMPONENT
import { RootStyle } from "./styles";
// IMPORT IMAGES
import bgImage from "../../../../public/assets/images/banners/banner-38.png";

export default function Section8() {
  return (
    <Container>
      <RootStyle>
        <LazyImage src={bgImage} alt="offer" />

        <div className="content">
          <Typography
            variant="h2"
            lineHeight={1.2}
            fontSize={{ xl: 42, sm: 36, xs: 30 }}
            sx={{ mt: 3, mb: 1 }}>
            Subscribe Now For <br />
            Get Every Day Tips
          </Typography>

          <Typography variant="body1" lineHeight={1.6} fontSize={{ sm: 16, xs: 14 }} sx={{ mb: 3 }}>
            A wonderful serenity has taken possession Far far away, behind the word mountains.
          </Typography>

          <SubscribeInput
            fullWidth
            buttonText="Submit"
            buttonSx={{
              margin: 0.5,
              borderRadius: 8,
              paddingBlock: 1,
              backgroundColor: "primary.main"
            }}
            inputSx={{
              pr: 0,
              borderRadius: 8,
              background: "white"
            }}
          />
        </div>
      </RootStyle>
    </Container>
  );
}
