"use client";

import type { PropsWithChildren } from "react";
import AutoPlay from "embla-carousel-autoplay";
// GLOBAL CUSTOM COMPONENTS
import { Carousel, useCarousel } from "components/slider";

export default function ProductsCarousel({ children }: PropsWithChildren) {
  const { ref, api, options } = useCarousel(
    {
      loop: true,
      align: "start",
      slideSpacing: "24px",
      slidesToShow: { xs: 1, sm: 2, md: 3, lg: 4 }
    },
    [AutoPlay({ delay: 3000 })]
  );

  return (
    <Carousel ref={ref} api={api} options={options}>
      {children}
    </Carousel>
  );
}
