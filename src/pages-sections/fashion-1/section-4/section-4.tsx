import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENT
import Card from "./card";
import CardTwo from "./card-2";
import CardThree from "./card-3";

export default function Section4() {
  return (
    <Container className="mb-5">
      <Grid container spacing={3}>
        <Grid container spacing={3} size={{ md: 6, xs: 12 }}>
          <Grid size={12}>
            <Card
              title="Your sunglasses for this' sunny season."
              imgUrl="/assets/images/banners/banner-71.jpg"
            />
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <CardTwo
              title="FASHION & COMFORT"
              body="Together in a bag."
              imgUrl="/assets/images/banners/banner-72.jpg"
            />
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <CardTwo
              title="TOPS"
              body="Get the latest signature pieces."
              imgUrl="/assets/images/banners/banner-73.jpg"
            />
          </Grid>
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <CardThree
            title="FRAGRANCES"
            imgUrl="/assets/images/banners/banner-74.jpg"
            body="Enjoy the summer time and shop our SS20 Collection at up to 50% off, for a limited time."
          />
        </Grid>
      </Grid>
    </Container>
  );
}
