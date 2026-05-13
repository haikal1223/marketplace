import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import HeroCarousel from "./hero-carousel";
import CarouselCard1 from "components/carousel-cards/carousel-card-1";
// API FUNCTIONS
import api from "utils/__api__/fashion-2";

export default async function Section1() {
  const carouselData = await api.getMainCarouselData();
  if (!carouselData || !carouselData.length) return null;

  return (
    <Box bgcolor="grey.50" mb={7.5} pt={2} pb={3}>
      <Container>
        <HeroCarousel>
          {carouselData.map((item, ind) => (
            <CarouselCard1
              key={ind}
              buttonColor="dark"
              title={item.title!}
              imgUrl={item.imgUrl!}
              buttonLink={item.buttonLink!}
              buttonText={item.buttonText!}
              description={item.description!}
            />
          ))}
        </HeroCarousel>
      </Container>
    </Box>
  );
}
