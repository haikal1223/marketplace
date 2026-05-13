"use client";

import type { PropsWithChildren } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, useCarousel } from "components/slider";

export default function BrandsCarousel({ children }: PropsWithChildren) {
  const { ref, api, options } = useCarousel(
    {
      align: "start",
      slideSpacing: "1rem",
      slidesToShow: { xs: 2, sm: 3, md: 4, lg: 5 }
    },
    [Autoplay({ delay: 4000 })]
  );

  return (
    <Carousel ref={ref} api={api} options={options}>
      {children}
    </Carousel>
  );
}
