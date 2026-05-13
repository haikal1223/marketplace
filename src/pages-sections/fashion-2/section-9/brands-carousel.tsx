"use client";

import type { PropsWithChildren } from "react";
import Autoplay from "embla-carousel-autoplay";
// GLOBAL CUSTOM COMPONENTS
import { Carousel, useCarousel } from "components/slider";

export default function BrandsCarousel({ children }: PropsWithChildren) {
  const { ref, api, options } = useCarousel(
    {
      loop: true,
      align: "start",
      slideSpacing: "1.5rem",
      slidesToShow: { xs: 2, sm: 3, lg: 4, xl: 5 }
    },
    [Autoplay()]
  );

  return (
    <Carousel ref={ref} api={api} options={options}>
      {children}
    </Carousel>
  );
}
