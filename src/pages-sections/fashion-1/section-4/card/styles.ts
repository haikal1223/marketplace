"use client";

import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const Wrapper = styled("div")(({ theme }) => ({
  gap: 10,
  minHeight: 280,
  display: "flex",
  overflow: "hidden",
  position: "relative",
  alignItems: "flex-end",

  "&::before": {
    inset: 0,
    zIndex: 1,
    width: "100%",
    height: "100%",
    content: "''",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  },

  "& img": {
    objectFit: "cover",
    objectPosition: "top center"
  },

  "& .content": {
    zIndex: 2,
    maxWidth: 370,
    paddingLeft: "3rem",
    paddingBottom: "3rem",
    position: "relative",
    "& .title": { lineHeight: 1.3, fontSize: "1.75rem" },
    "& .btn": { borderRadius: 0, marginTop: "1.5rem" }
  },

  [theme.breakpoints.down("sm")]: {
    minHeight: 240,
    "& .content": {
      maxWidth: 270,
      paddingLeft: "2rem",
      paddingBottom: "2rem"
    }
  }
}));
