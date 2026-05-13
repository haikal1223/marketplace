import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENT
import Container from "components/Container";
// LOCAL CUSTOM COMPONENTS
import Card from "./card";
import CardTwo from "./card-2";

export default function Section1() {
  return (
    <Container sx={{ mt: { xs: 1, md: 2 } }}>
      <Grid container spacing={3}>
        <Grid size={{ md: 6, xs: 12 }}>
          <Card
            badge="Starting At Only $699"
            title="Smart Home Essentials Bundle"
            imgUrl="/assets/images/gadget-1/banner-1.jpg"
            body="Enjoy seamless connectivity, premium sound, and effortless charging."
          />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <Card
            badgeColor="info"
            badge="Starting At Only $699"
            title="JBL Wireless Headphones"
            imgUrl="/assets/images/gadget-1/banner-2.jpg"
            body="Stay connected with Bluetooth technology and enjoy clear sound."
          />
        </Grid>

        <Grid size={{ md: 3, xs: 12 }}>
          <CardTwo
            url="/gadget-1"
            badge="Best Deals"
            title="Apple Sleek Ultra Thin Laptop"
            imgUrl="/assets/images/gadget-1/banner-3.jpg"
          />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <Card
            badge="Grab 50% Offer!"
            title="JBL Live Over Ear Headphone"
            imgUrl="/assets/images/gadget-1/banner-4.jpg"
            body="Wirelesses stream high-quality sound even at lower bit rates"
          />
        </Grid>

        <Grid size={{ md: 3, xs: 12 }}>
          <CardTwo
            url="/gadget-1"
            badge="New Arrival"
            title="Apple Smartwatch Series 8"
            imgUrl="/assets/images/gadget-1/banner-5.jpg"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
