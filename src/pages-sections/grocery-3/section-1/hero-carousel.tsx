"use client";

import { Fragment, PropsWithChildren } from "react";
// GLOBAL CUSTOM COMPONENTS
import { Carousel, CarouselDots, useCarousel } from "components/slider";

export default function HeroCarousel({ children }: PropsWithChildren) {
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
        sx={{
          position: "absolute",
          bottom: 25,
          left: 0,
          right: 0,
          mx: "auto"
        }}
      />
    </Fragment>
  );
}
