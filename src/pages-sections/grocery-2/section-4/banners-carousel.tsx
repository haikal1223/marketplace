"use client";

import type { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import AutoHeight from "embla-carousel-auto-height";
// GLOBAL CUSTOM COMPONENTS
import { Carousel, CarouselDots, useCarousel } from "components/slider";

export default function BannersCarousel({ children }: PropsWithChildren) {
  const { ref, api, dots, options } = useCarousel(
    {
      align: "start",
      slideSpacing: ".75rem",
      slidesToShow: 1
    },
    [AutoHeight()]
  );

  return (
    <Box position="relative">
      <Carousel ref={ref} api={api} options={options}>
        {children}
      </Carousel>

      <CarouselDots
        scrollSnaps={dots.scrollSnaps}
        selectedIndex={dots.selectedIndex}
        onDotButtonClick={dots.onDotButtonClick}
      />
    </Box>
  );
}
