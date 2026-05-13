import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENT
import { RootStyle } from "./styles";
// IMPORT IMAGES
import headerImg from "../../../../public/assets/images/headers/medical.png";

export default function Section1() {
  return (
    <Container>
      <RootStyle>
        <LazyImage className="doctor-img" alt="Doctor" src={headerImg} />

        <div className="content">
          <Typography variant="body1" fontSize={{ xl: 28, md: 24, sm: 21, xs: 18 }}>
            Home Medical Supplies
          </Typography>

          <Typography variant="h2" lineHeight={1.3} fontSize={{ xl: 48, md: 42, sm: 36, xs: 28 }}>
            Fast Reading Digital <br /> Thermometer for <br />
            Ear & Forehead
          </Typography>

          <Typography
            variant="body1"
            className="sub-title"
            fontSize={{ xl: 18 }}
            sx={{ mt: 2, mb: 3, maxWidth: { xl: 300, xs: 260 } }}>
            But I must explain to you how all this mistaken idea of denouncing pleasure and praising
            pain.
          </Typography>

          <div className="btn-group">
            <Button variant="contained" color="error">
              Shop Now
            </Button>

            <Button variant="contained" color="warning">
              About Us
            </Button>
          </div>
        </div>
      </RootStyle>
    </Container>
  );
}
