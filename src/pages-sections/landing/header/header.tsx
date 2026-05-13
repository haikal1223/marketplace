"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { Link as Scroll } from "react-scroll";
import clsx from "clsx";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/icons-material/Menu";

import SideNav from "components/side-nav";
import FlexBox from "components/flex-box/flex-box";
import useHeader from "./use-header";
import { HeaderWrapper } from "./styles";

// Constants
const HEADER_HEIGHT = 72;
const SCROLL_DURATION = 400;
const SCROLL_OFFSET = -HEADER_HEIGHT - 16;

export default function Header() {
  const { downSM, isFixed, open, toggleSidenav } = useHeader();

  return (
    <Fragment>
      <HeaderWrapper>
        <div className={clsx({ fixedHeader: isFixed })}>
          <Container maxWidth="lg">
            <FlexBox height={HEADER_HEIGHT} alignItems="center">
              <Scroll to="top" duration={SCROLL_DURATION} smooth={true} isDynamic>
                <Box sx={{ cursor: "pointer" }}>
                  <Image width={96} height={44} src="/assets/images/logo2.svg" alt="logo" />
                </Box>
              </Scroll>

              <Box mx="auto" />

              <FlexBox className="right-links" alignItems="center">
                <Scroll
                  to="features"
                  smooth={true}
                  duration={SCROLL_DURATION}
                  offset={SCROLL_OFFSET}>
                  <Typography className="link">
                    Features
                  </Typography>
                </Scroll>

                <Scroll to="demos" duration={SCROLL_DURATION} offset={SCROLL_OFFSET} smooth={true}>
                  <Typography className="link">Demos</Typography>
                </Scroll>

                {/* <a
                  href="https://652ed2ada2aac403b8c8e050-hzbjgoehdi.chromatic.com/?path=/docs/components-carousel-carousel--docs"
                  target="__blank">
                  <Typography className="link">Storybook</Typography>
                </a> */}

                <a href="https://bazaar-doc.netlify.app/" target="__blank">
                  <Typography className="link">Documentation</Typography>
                </a>
              </FlexBox>

              {downSM ? (
                <SideNav
                  open={open}
                  width={260}
                  position="right"
                  toggle={toggleSidenav}
                  handler={(handle) => (
                    <IconButton onClick={handle}>
                      <Menu />
                    </IconButton>
                  )}>
                  <Box
                    p={2}
                    sx={{
                      "& .link": {
                        cursor: "pointer",
                        transition: "color 250ms ease-in-out",
                        "&:hover": { color: "primary.main" }
                      }
                    }}>
                    <Scroll
                      to="features"
                      duration={SCROLL_DURATION}
                      offset={SCROLL_OFFSET}
                      smooth={true}>
                      <Typography className="link" py={1} onClick={toggleSidenav}>
                        Features
                      </Typography>
                    </Scroll>

                    <Scroll
                      to="demos"
                      duration={SCROLL_DURATION}
                      offset={SCROLL_OFFSET}
                      smooth={true}>
                      <Typography className="link" py={1} onClick={toggleSidenav}>
                        Demos
                      </Typography>
                    </Scroll>

                    <Scroll
                      smooth={true}
                      to="technologies"
                      offset={SCROLL_OFFSET}
                      duration={SCROLL_DURATION}>
                      <Typography className="link" py={1} mb={2} onClick={toggleSidenav}>
                        Technologies
                      </Typography>
                    </Scroll>

                    <Button
                      href="https://material-ui.com/store/items/bazaar-pro-react-ecommerce-template/"
                      LinkComponent={Link}
                      variant="outlined"
                      color="primary"
                      target="_blank">
                      Purchase Now
                    </Button>
                  </Box>
                </SideNav>
              ) : (
                <a target="__blank" href="https://tinyurl.com/get-bazaar">
                  <Button variant="outlined">Purchase Now</Button>
                </a>
              )}
            </FlexBox>
          </Container>
        </div>
      </HeaderWrapper>

      {isFixed && <Box height={HEADER_HEIGHT} />}
    </Fragment>
  );
}
