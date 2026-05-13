"use client";

import { Fragment, PropsWithChildren } from "react";
import { useTheme } from "@mui/material/styles";
// GLOBAL CUSTOM COMPONENTS
import { Carousel, CarouselDots, useCarousel } from "components/slider";

export default function HeroCarousel({ children }: PropsWithChildren) {
  const theme = useTheme();
  const { ref, api, dots } = useCarousel();

  return (
    <Fragment>
      <Carousel ref={ref} api={api}>
        {children}
      </Carousel>

      <CarouselDots
        scrollSnaps={dots.scrollSnaps}
        selectedIndex={dots.selectedIndex}
        onDotButtonClick={dots.onDotButtonClick}
        activeColor={theme.palette.common.white}
        dotColor={theme.palette.primary[300]}
        sx={{
          justifyContent: "flex-start",
          mt: { sm: 2, xs: 3 }
        }}
      />
    </Fragment>
  );
}
