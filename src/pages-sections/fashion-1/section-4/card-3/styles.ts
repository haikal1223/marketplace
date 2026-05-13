"use client";

import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const Wrapper = styled("div")(({ theme }) => ({
  gap: 10,
  minHeight: 565,
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
    maxWidth: 400,
    paddingLeft: "3rem",
    paddingBottom: "3rem",
    position: "relative",
    "& .body": {
      fontSize: 16,
      marginTop: ".25rem"
    },
    "& .title": {
      fontWeight: 600,
      lineHeight: 1.3,
      fontSize: "2rem"
    },
    "& .btn": {
      fontWeight: 600,
      fontSize: 12,
      marginTop: "2rem",
      display: "inline-block",
      padding: "0.6rem 1.25rem",
      backgroundColor: "white",
      color: theme.palette.text.primary
    }
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: 400,
    "& .content": {
      maxWidth: 350,
      paddingLeft: "2rem",
      paddingBottom: "2rem",
      "& .title": { fontSize: "1.5rem" }
    }
  }
}));
