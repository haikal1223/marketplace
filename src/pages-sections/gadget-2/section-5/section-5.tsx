import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import IconLink from "components/icon-link";
import LazyImage from "components/LazyImage";
import Container from "components/Container";
// STYLED COMPONENTS
import { BlackBox, YellowBox } from "./styles";
// IMPORT IMAGES
import speaker from "../../../../public/assets/images/gadget-2/lenovo-speaker.png";
import iphone12 from "../../../../public/assets/images/gadget-2/iphone-12-long.png";

export default function Section5() {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid size={{ lg: 6, xs: 12 }}>
          <YellowBox>
            <div>
              <Typography variant="body1" fontSize={18} sx={{ mb: 1 }}>
                Lenovo Think plus K3 Mini
              </Typography>

              <Typography variant="h2" fontWeight={700}>
                Waterproof <br /> Speakers
              </Typography>

              <IconLink title="Explore Now" url="#" />
            </div>

            <div className="img-wrapper">
              <LazyImage src={speaker} alt="Watch" />
            </div>
          </YellowBox>
        </Grid>

        <Grid size={{ lg: 6, xs: 12 }}>
          <BlackBox>
            <div className="img-wrapper">
              <LazyImage alt="iPhone 13 Pro" src={iphone12} />
            </div>

            <div className="content">
              <Typography variant="body1" fontSize={18} sx={{ mb: 1 }}>
                Blast Past Fast.
              </Typography>

              <Typography variant="h2" fontWeight={700}>
                IPhone 12 Pro <br /> For You
              </Typography>

              <IconLink title="Explore Now" url="#" sx={{ color: "white" }} />
            </div>
          </BlackBox>
        </Grid>
      </Grid>
    </Container>
  );
}
