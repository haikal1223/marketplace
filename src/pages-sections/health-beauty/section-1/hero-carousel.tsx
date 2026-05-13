"use client";

import { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENTS
import { Carousel, CarouselDots, useCarousel } from "components/slider";

export default function HeroCarousel({ children }: PropsWithChildren) {
  const { ref, api, dots } = useCarousel();

  return (
    <Box position="relative">
      <Carousel ref={ref} api={api}>
        {children}
      </Carousel>

      <CarouselDots
        scrollSnaps={dots.scrollSnaps}
        selectedIndex={dots.selectedIndex}
        onDotButtonClick={dots.onDotButtonClick}
        sx={{ bottom: 20, insetInline: 0, position: "absolute" }}
      />
    </Box>
  );
}
