import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENTS
import HeroCarousel from "./hero-carousel";
// STYLED COMPONENTS
import { Wrapper, StyledButton, ContentWrapper } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/furniture-1";

export default async function Section1() {
  const mainCarouselData = await api.getMainCarouselData();
  if (!mainCarouselData || !mainCarouselData.length) return null;

  return (
    <Wrapper>
      <HeroCarousel>
        {mainCarouselData.map((item) => (
          <div key={item.id}>
            <ContentWrapper>
              <Container>
                <div className="carousel-content">
                  <h6>{item.subTitle}</h6>
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                  <StyledButton color="primary" variant="contained">
                    {item.buttonText}
                  </StyledButton>
                </div>
              </Container>
            </ContentWrapper>
          </div>
        ))}
      </HeroCarousel>
    </Wrapper>
  );
}
