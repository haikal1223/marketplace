import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENTS
import Card from "./card";
import CardTwo from "./card-2";

export default function Section1() {
  return (
    <Container className="pt-2 mb-4">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            badge="Style like never before"
            body="We got the best that you can wear a dress."
            title="Clothes brighten you to the extent you deserve."
            imgUrl="/assets/images/banners/banner-66.jpg"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            badge="Dresses to be noticed."
            body="We got the best that you can wear a dress."
            title="Fashion friendly clothes for fashion enthusiasts."
            imgUrl="/assets/images/banners/banner-67.jpg"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CardTwo
            badge="Weekend Discount"
            body="Only this week. Don’t miss..."
            title="Complement your flawless beauty"
            imgUrl="/assets/images/banners/banner-68.jpg"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CardTwo
            badge="Weekend Discount"
            body="Bringing You the Elements of Style"
            title="Don't miss the opportunity..."
            imgUrl="/assets/images/banners/banner-69.jpg"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CardTwo
            badge="Weekend Discount"
            body="Best prices, latest models..."
            title="Fashion is nothing without people"
            imgUrl="/assets/images/banners/banner-70.jpg"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
