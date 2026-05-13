"use client";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Autoplay from "embla-carousel-autoplay";
// LOCAL CUSTOM COMPONENT
import BannerCard from "../banner-card";
import CarouselCard from "./carousel-card";
// GLOBAL CUSTOM COMPONENTS
import IconLink from "components/icon-link";
import Container from "components/Container";
import { Carousel, useCarousel } from "components/slider";
// CUSTOM DATA MODEL
import { MainCarouselItem } from "models/Market-2.model";

// ======================================================
type Props = { carouselData: MainCarouselItem[] };
// ======================================================

export default function Section1({ carouselData }: Props) {
  const { ref, api, options } = useCarousel(
    {
      loop: true,
      align: "start",
      slideSpacing: "1rem"
    },
    [Autoplay({ delay: 3000 })]
  );

  return (
    <Container sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 9 }}>
          <Carousel ref={ref} api={api} options={options}>
            {carouselData.map((item, ind) => (
              <CarouselCard
                key={ind}
                mode="light"
                discount={10}
                title={item.title!}
                bgImage={item.imgUrl!}
                buttonText="Shop Now"
                category={item.category!}
                buttonLink={item.buttonLink!}
                description={item.description!}
              />
            ))}
          </Carousel>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Stack spacing={2} height="100%" direction={{ md: "column", sm: "row", xs: "column" }}>
            <BannerCard
              imageFull
              flex={1}
              img="/assets/images/banners/banner-17.jpg"
              maxHeight={240}>
              <Typography variant="body1" fontSize={13} letterSpacing={1.2}>
                NEW ARRIVALS
              </Typography>

              <Typography variant="h4" fontSize={20} fontWeight={700} sx={{ mb: 2 }}>
                SUMMER
                <br />
                SALE 20% OFF
              </Typography>

              <IconLink url="/" title="Shop Now" />
            </BannerCard>

            <BannerCard
              imageFull
              flex={1}
              img="/assets/images/banners/banner-16.jpg"
              maxHeight={240}>
              <Typography variant="body1" fontSize={13} letterSpacing={1.2}>
                GAMING 4K
              </Typography>

              <Typography variant="h4" fontSize={20} fontWeight={700} sx={{ mb: 2 }}>
                DESKTOPS &
                <br />
                LAPTOPS
              </Typography>

              <IconLink url="/" title="Shop Now" />
            </BannerCard>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
