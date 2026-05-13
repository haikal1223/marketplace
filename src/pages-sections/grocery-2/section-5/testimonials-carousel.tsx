"use client";

import type { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENTS
import { Carousel, CarouselDots, useCarousel } from "components/slider";

export default function TestimonialsCarousel({ children }: PropsWithChildren) {
  const { ref, api, dots, options } = useCarousel({
    slidesToShow: 1,
    loop: true,
    slideSpacing: "1rem"
  });

  return (
    <Box position="relative">
      <Carousel ref={ref} api={api} options={options}>
        {children}
      </Carousel>

      <CarouselDots
        scrollSnaps={dots.scrollSnaps}
        selectedIndex={dots.selectedIndex}
        onDotButtonClick={dots.onDotButtonClick}
        sx={{
          position: "absolute",
          bottom: 25,
          mx: "auto",
          right: 0,
          left: 0
        }}
      />
    </Box>
  );
}
