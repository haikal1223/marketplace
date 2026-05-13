"use client";

import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENTS
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { Carousel, useCarousel } from "components/slider";
// CUSTOM ICON COMPONENT
import Quote from "icons/Quote";
// STYLED COMPONENTS
import { TestimonialCard, TestimonialRootStyle } from "./styles";

// ==============================================================
type Props = { testimonials: any[] };
// ==============================================================

export default function TestimonialCarousel({ testimonials }: Props) {
  const { ref, api, arrows } = useCarousel();

  return (
    <TestimonialRootStyle>
      <div className="wrapper">
        <Quote className="icon" />

        <Carousel ref={ref} api={api}>
          {testimonials.map(({ title, id, user, comment }) => (
            <TestimonialCard key={id}>
              <h3 className="title">{title}</h3>
              <p className="comment">{comment}</p>

              <div className="user-info">
                <div className="user-img-wrapper">
                  <LazyImage alt="user" width={240} height={240} src={user.avatar} />
                </div>

                <div>
                  <h6 className="username">{user.name}</h6>
                  <p className="designation">{user.designation}</p>
                </div>
              </div>
            </TestimonialCard>
          ))}
        </Carousel>

        <div className="btn-wrapper">
          <IconButton disabled={arrows.disablePrev} onClick={arrows.onClickPrev}>
            <ArrowBack fontSize="small" />
          </IconButton>

          <IconButton
            disabled={arrows.disableNext}
            onClick={arrows.onClickNext}
            className="right-arrow">
            <ArrowForward fontSize="small" />
          </IconButton>
        </div>
      </div>
    </TestimonialRootStyle>
  );
}
