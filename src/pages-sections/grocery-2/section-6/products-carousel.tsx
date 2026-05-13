"use client";

import type { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENTS
import { Carousel, CarouselArrows, useCarousel } from "components/slider";

export default function ProductsCarousel({ children }: PropsWithChildren) {
  const { ref, api, arrows, options } = useCarousel({
    align: "start",
    slideSpacing: ".75rem",
    slidesToShow: { xs: 1, sm: 2, lg: 3, xl: 4 }
  });

  return (
    <Box position="relative">
      <Carousel ref={ref} api={api} options={options}>
        {children}
      </Carousel>

      <CarouselArrows
        onClickNext={arrows.onClickNext}
        onClickPrev={arrows.onClickPrev}
        disableNext={arrows.disableNext}
        disablePrev={arrows.disablePrev}
      />
    </Box>
  );
}
