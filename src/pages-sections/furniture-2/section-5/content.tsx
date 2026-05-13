"use client";

import { PropsWithChildren } from "react";
// MUI
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
// GLOBAL CUSTOM COMPONENTS
import { Carousel, useCarousel } from "components/slider";

// STYLED COMPONENT
const Heading = styled("div")(({ theme }) => ({
  display: "flex",
  marginTop: "5rem",
  alignItems: "center",
  marginBottom: "2.5rem",
  justifyContent: "space-between",

  "& .title": {
    fontSize: 30,
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: { fontSize: 27 }
  },

  "& .description": {
    fontSize: 16,
    color: theme.palette.grey[600],
    [theme.breakpoints.down("sm")]: { fontSize: 14 }
  }
}));

const ButtonGroup = styled("div")(({ theme }) => ({
  ".forward-btn": {
    backgroundColor: "white",
    boxShadow: theme.shadows[1],
    marginLeft: theme.spacing(0.5)
  },
  ":dir(rtl) .MuiSvgIcon-root": { rotate: "180deg" }
}));

export default function Content({ children }: PropsWithChildren) {
  const { ref, api, arrows, options } = useCarousel({
    align: "start",
    slideSpacing: "1.5rem",
    slidesToShow: { xs: 1, sm: 2, lg: 3, xl: 4 }
  });

  return (
    <Container>
      <Heading>
        <div>
          <h3 className="title">Trending Items</h3>
          <p className="description">There are many variations passages</p>
        </div>

        <ButtonGroup>
          <IconButton onClick={arrows.onClickPrev}>
            <ArrowBack fontSize="small" />
          </IconButton>

          <IconButton onClick={arrows.onClickNext} className="forward-btn">
            <ArrowForward fontSize="small" />
          </IconButton>
        </ButtonGroup>
      </Heading>

      <Carousel ref={ref} api={api} options={options}>
        {children}
      </Carousel>
    </Container>
  );
}
