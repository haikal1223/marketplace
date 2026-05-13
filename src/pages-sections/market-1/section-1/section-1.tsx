import Container from "components/Container";
import CarouselCard1 from "components/carousel-cards/carousel-card-1";
// LOCAL CUSTOM COMPONENT
import CarouselBanner from "./carousel-banner";
// API FUNCTIONS
import api from "utils/__api__/market-1";

export default async function Section1() {
  const carouselData = await api.getMainCarousel();
  if (!carouselData || carouselData.length === 0) return null;

  return (
    <Container>
      <CarouselBanner>
        {carouselData.map((item, ind) => (
          <CarouselCard1
            key={ind}
            title={item.title!}
            imgUrl={item.imgUrl!}
            buttonLink={item.buttonLink!}
            buttonText={item.buttonText!}
            description={item.description!}
          />
        ))}
      </CarouselBanner>
    </Container>
  );
}
