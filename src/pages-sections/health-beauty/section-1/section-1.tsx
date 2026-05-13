import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import HeroCarousel from "./hero-carousel";
import LazyImage from "components/LazyImage";
// STYLED COMPONENTS
import { GridItemOne, GridItemTwo, StyledButton, StyledGrid } from "./styles";
// CUSTOM DATA MODEL
import { HealthCarouselItem } from "models/Carousel.model";

// ==========================================================================
type Props = { carouselData: HealthCarouselItem[] };
// ==========================================================================

export default function Section1({ carouselData }: Props) {
  return (
    <Box bgcolor="primary.light" mb={3}>
      <Container>
        <HeroCarousel>
          {carouselData.map((item) => (
            <div key={item.id}>
              <StyledGrid container>
                <GridItemOne size={{ sm: 7, xs: 12 }}>
                  <h1 className="title">{item.title}</h1>
                  <StyledButton variant="contained" size="large">
                    Shop Now
                  </StyledButton>
                </GridItemOne>

                <GridItemTwo size={{ sm: 5, xs: 12 }}>
                  <LazyImage width={570} height={360} src={item.imgUrl} alt={item.title} />
                </GridItemTwo>
              </StyledGrid>
            </div>
          ))}
        </HeroCarousel>
      </Container>
    </Box>
  );
}
