import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENT
import Container from "components/Container";
import IconLink from "components/icon-link";
import LazyImage from "components/LazyImage";
import FlexBetween from "components/flex-box/flex-between";
// STYLED COMPONENTS
import { ContentWrapper } from "./styles";
// IMPORT IMAGES
import drone from "../../../../public/assets/images/gadget-2/drone-1.png";
import iphone14 from "../../../../public/assets/images/gadget-2/iphone-14.png";
import iphone12 from "../../../../public/assets/images/gadget-2/iphone-12.png";
import appleWatch from "../../../../public/assets/images/gadget-2/apple-watch.png";
import nikonCamera from "../../../../public/assets/images/gadget-2/nikon-camera.png";
import appleAirPod from "../../../../public/assets/images/gadget-2/apple-airpod.png";
import headphone from "../../../../public/assets/images/gadget-2/beat-headphone.png";

export default function Section1() {
  return (
    <Container sx={{ pt: 10 }}>
      <Grid container spacing={3}>
        {/* IPHONE 14 PRO */}
        <Grid size={{ lg: 4, sm: 6, xs: 12 }} order={{ xs: 2, sm: 1 }}>
          <ContentWrapper>
            <Box padding={4} pb={0}>
              <Typography
                variant="body1"
                sx={{
                  mb: 1,
                  fontSize: {
                    xl: 20,
                    md: 18,
                    xs: 16
                  }
                }}>
                Blast Past Fast.
              </Typography>

              <Typography
                variant="body1"
                fontWeight={700}
                sx={{
                  mb: 2,
                  lineHeight: 1.2,
                  fontSize: {
                    xl: 40,
                    md: 32,
                    xs: 28
                  }
                }}>
                IPhone 14 Pro <br />
                It’s A Leap Year
              </Typography>

              <IconLink title="Explore Now" url="#" sx={{ color: "white" }} />
            </Box>

            <LazyImage
              quality={90}
              loading="lazy"
              alt="Iphone 14"
              src={iphone14}
              sx={{ display: "block" }}
            />
          </ContentWrapper>
        </Grid>

        {/* NIKON CAMERA */}
        <Grid size={{ lg: 4, sm: 6, xs: 12 }} order={{ xs: 1, sm: 2 }}>
          <ContentWrapper hasGradient>
            <LazyImage
              quality={90}
              loading="lazy"
              alt="Nikon Camera"
              src={nikonCamera}
              style={{ marginTop: -70 }}
            />

            <Box px={4} py={2}>
              <Typography variant="body1" fontSize={{ md: 20, xs: 18 }} sx={{ mb: 1 }}>
                Enrich your everyday life.
              </Typography>

              <Typography
                variant="body1"
                fontWeight={700}
                fontSize={{ xl: 55, md: 42, sm: 36, xs: 28 }}
                lineHeight={1.2}
                sx={{ mb: 2 }}>
                Nikon DSLR <br />
                D-8000
              </Typography>

              <IconLink title="Explore Now" url="#" sx={{ color: "white" }} />
            </Box>
          </ContentWrapper>
        </Grid>

        {/* DJI MINI 3 DRONE */}
        <Grid size={{ lg: 4, sm: 6, xs: 12 }} order={3}>
          <ContentWrapper>
            <Box padding={4} pb={{ xl: 6, lg: 5, md: 3, xs: 0 }}>
              <Typography variant="body1" fontSize={{ xl: 20, md: 18, xs: 16 }} sx={{ mb: 1 }}>
                Fly more time
              </Typography>

              <Typography
                variant="body1"
                fontWeight={700}
                lineHeight={1.2}
                fontSize={{ xl: 40, md: 32, xs: 28 }}
                sx={{ mb: 2 }}>
                DJI Mini 3 Drone <br /> Fly More
              </Typography>

              <IconLink title="Explore Now" url="#" sx={{ color: "white" }} />
            </Box>

            <Image
              src={drone}
              alt="Dji mini drone"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </ContentWrapper>
        </Grid>

        {/* APPLE AIR POD PRO 2 */}
        <Grid size={{ lg: 4, sm: 6, xs: 12 }} order={4}>
          <ContentWrapper sx={{ bgcolor: "grey.700" }}>
            <Box padding={4} pb={2}>
              <Typography variant="body1" fontSize={{ xl: 20, md: 18, xs: 16 }} sx={{ mb: 1 }}>
                Wireless to the fullest.
              </Typography>

              <Typography
                variant="h2"
                lineHeight={1.2}
                fontWeight={700}
                fontSize={{ xl: 45, md: 32, xs: 28 }}
                sx={{ mb: 2 }}>
                Apple Airpods <br /> Pro 2
              </Typography>

              <IconLink title="Explore Now" url="#" sx={{ color: "white" }} />
            </Box>

            <Box px={8}>
              <LazyImage
                alt="Iphone 14"
                loading="lazy"
                quality={90}
                src={appleAirPod}
                style={{ display: "block" }}
              />
            </Box>
          </ContentWrapper>
        </Grid>

        {/* BEATS & APPLE  */}
        <Grid size={{ lg: 5, md: 7, xs: 12 }} order={5}>
          <Stack height="100%" direction="column" spacing={3}>
            <FlexBetween height="100%" borderRadius={3} bgcolor="grey.300" position="relative">
              <Box padding={4} position="relative" zIndex={1}>
                <Typography variant="body1" fontSize={{ xl: 20, md: 18, xs: 16 }} sx={{ mb: 1 }}>
                  Blast Past Fast.
                </Typography>

                <Typography
                  variant="h2"
                  lineHeight={1.2}
                  fontWeight={700}
                  fontSize={{ xl: 35, md: 32, xs: 28 }}
                  sx={{ mb: 2 }}>
                  Beats H12 <br /> Wireless
                </Typography>

                <IconLink title="Explore Now" url="#" />
              </Box>

              <Box right={0} maxHeight="100%" position="absolute" maxWidth={{ md: 450, xs: 350 }}>
                <LazyImage src={headphone} alt="Beats Headphone" loading="lazy" quality={90} />
              </Box>
            </FlexBetween>

            <ContentWrapper
              sx={{
                display: "flex",
                position: "relative",
                alignItems: "center",
                bgcolor: "primary.main"
              }}>
              <Box padding={4} position="relative" zIndex={1}>
                <Typography variant="body1" fontSize={{ xl: 20, md: 18, xs: 16 }} sx={{ mb: 1 }}>
                  The speed of life.
                </Typography>

                <Typography
                  variant="h2"
                  lineHeight={1.2}
                  fontWeight={700}
                  fontSize={{ xl: 35, md: 32, xs: 28 }}
                  sx={{ mb: 2 }}>
                  Apple Watch <br /> Series 9
                </Typography>

                <IconLink title="Explore Now" url="#" sx={{ color: "white" }} />
              </Box>

              <Box
                maxWidth={{ xl: 300, xs: 250 }}
                top={0}
                right={0}
                bottom={0}
                display="flex"
                maxHeight="100%"
                position="absolute"
                alignItems="center"
                justifyContent="center">
                <Image
                  alt="Apple Watch"
                  src={appleWatch}
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
            </ContentWrapper>
          </Stack>
        </Grid>

        {/* IPHONE 12 FOR YOU */}
        <Grid size={{ lg: 3, md: 5, xs: 12 }} order={6}>
          <ContentWrapper
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
            <Box padding={4} pb={0}>
              <Typography variant="body1" fontSize={{ xl: 20, md: 18, xs: 16 }} sx={{ mb: 1 }}>
                Blast Past Fast.
              </Typography>

              <Typography
                variant="h2"
                lineHeight={1.2}
                fontWeight={700}
                fontSize={{ xl: 35, md: 32, xs: 28 }}
                sx={{ mb: 2 }}>
                IPhone 12 <br /> For You
              </Typography>

              <IconLink title="Explore Now" url="#" sx={{ color: "white" }} />
            </Box>

            <LazyImage
              quality={90}
              loading="lazy"
              alt="Iphone 12"
              src={iphone12}
              sx={{ display: "block" }}
            />
          </ContentWrapper>
        </Grid>
      </Grid>
    </Container>
  );
}
