"use client";

import { Fragment, type PropsWithChildren } from "react";
// MUI
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
// GLOBAL CUSTOM COMPONENTS
import { Carousel, useCarousel } from "components/slider";

// STYLED COMPONENTS
const Heading = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "1.5rem",
  ".buttons-container": {
    display: "flex",
    alignItems: "center"
  }
}));

const StyledButtonBase = styled(ButtonBase)({
  width: 32,
  height: 32,
  borderRadius: 8
});

export default function TestimonialCarousel({ children }: PropsWithChildren) {
  const { ref, api, options, arrows } = useCarousel({ loop: true, slideSpacing: "24px" });

  return (
    <Fragment>
      <Heading>
        <Typography variant="h2" fontWeight={700} fontSize={{ sm: 32, xs: 27 }}>
          What clients say
        </Typography>

        <div className="buttons-container">
          <StyledButtonBase onClick={arrows.onClickPrev}>
            <SvgIcon>
              <path
                fill="currentColor"
                d="M14 17.308L8.692 12L14 6.692l.708.708l-4.6 4.6l4.6 4.6z"
              />
            </SvgIcon>
          </StyledButtonBase>

          <StyledButtonBase onClick={arrows.onClickNext}>
            <SvgIcon>
              <path
                fill="currentColor"
                d="m13.292 12l-4.6-4.6l.708-.708L14.708 12L9.4 17.308l-.708-.708z"
              />
            </SvgIcon>
          </StyledButtonBase>
        </div>
      </Heading>

      <Carousel ref={ref} api={api} options={options}>
        {children}
      </Carousel>
    </Fragment>
  );
}
