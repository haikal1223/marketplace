import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENT
import Container from "components/Container";
// LOCAL CUSTOM COMPONENTS
import BannerCard from "./banner-card";

export default function Section9() {
  return (
    <Container>
      <Grid container>
        <Grid size={{ md: 4, xs: 12 }}>
          <Box display="flex" flexDirection={{ md: "column", sm: "row", xs: "column" }}>
            <BannerCard
              title="Earbuds"
              description="Smartwatch Is Good For You"
              image="/assets/images/gadget-1/banner-7.jpg"
            />

            <BannerCard
              title="Headphones"
              description="The future seems bright. Headphones for the Future."
              image="/assets/images/gadget-1/banner-11.jpg"
            />
          </Box>
        </Grid>

        <Grid size={{ md: 4, xs: 12 }}>
          <BannerCard
            centerContent
            imageWidth={480}
            imageHeight={600}
            title="Power Bank"
            description="The time for super cellphones is almost here."
            image="/assets/images/gadget-1/banner-8.jpg"
          />
        </Grid>

        <Grid size={{ md: 4, xs: 12 }}>
          <Box display="flex" flexDirection={{ md: "column", sm: "row", xs: "column" }}>
            <BannerCard
              title="Speakers"
              description="The time for super cellphones is almost here."
              image="/assets/images/gadget-1/banner-10.jpg"
            />

            <BannerCard
              title="Accessories"
              description="We Bring Accessories to Life"
              image="/assets/images/gadget-1/banner-9.jpg"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
