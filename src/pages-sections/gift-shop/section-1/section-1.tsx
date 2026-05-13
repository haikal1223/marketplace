"use client";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { Carousel, CarouselDots, useCarousel } from "components/slider";
// CUSTOM DATA MODEL
import { GiftCarouselItem } from "models/Carousel.model";
// STYLED COMPONENTS
import { StyledRoot, StyledGrid, ContentWrapper, GridItemTwo, CarouselButton } from "./styles";

// ==========================================================
type Props = { carouselData: GiftCarouselItem[] };
// ==========================================================

export default function Section1({ carouselData }: Props) {
  const theme = useTheme();
  const { ref, api, dots } = useCarousel();

  return (
    <StyledRoot>
      <Container>
        <div className="carousel-wrapper">
          <Carousel ref={ref} api={api}>
            {carouselData.map(({ id, title, subTitle, buttonText, imgUrl }) => (
              <div key={id}>
                <StyledGrid container>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <ContentWrapper>
                      <Typography variant="body1" sx={{ color: "primary.main" }}>
                        {subTitle}
                      </Typography>

                      <Typography variant="h1" sx={{ maxWidth: 600 }}>
                        {title}
                      </Typography>

                      <CarouselButton disableElevation variant="contained">
                        {buttonText}
                      </CarouselButton>
                    </ContentWrapper>
                  </Grid>

                  <GridItemTwo size={{ xs: 12, sm: 6 }}>
                    <LazyImage alt={title} width={600} height={450} src={imgUrl} />
                  </GridItemTwo>
                </StyledGrid>
              </div>
            ))}
          </Carousel>

          <CarouselDots
            scrollSnaps={dots.scrollSnaps}
            selectedIndex={dots.selectedIndex}
            onDotButtonClick={dots.onDotButtonClick}
            dotColor={theme.palette.primary[300]}
            sx={{ position: "absolute", bottom: 20, left: 0, right: 0 }}
          />
        </div>
      </Container>
    </StyledRoot>
  );
}
