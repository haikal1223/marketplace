"use client";

import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const Wrapper = styled("div")(({ theme }) => ({
  gap: 10,
  minHeight: 260,
  display: "flex",
  overflow: "hidden",
  position: "relative",
  "&::before": {
    inset: 0,
    zIndex: 1,
    width: "100%",
    height: "100%",
    content: "''",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.05)"
  },
  "& img": {
    objectFit: "cover",
    objectPosition: "top center"
  },
  "& .content": {
    zIndex: 2,
    maxWidth: 300,
    paddingLeft: "2rem",
    paddingTop: "2rem",
    position: "relative",
    "& .body": {
      fontSize: 14,
      marginTop: ".25rem"
    },
    "& .title": {
      fontWeight: 600,
      lineHeight: 1.3,
      fontSize: "1.25rem"
    },
    "& .btn": {
      fontWeight: 600,
      fontSize: 12,
      marginTop: "1.5rem",
      display: "inline-block",
      borderBottom: `2px solid ${theme.palette.primary.main}`
    }
  },
  [theme.breakpoints.down("sm")]: { minHeight: 220 }
}));
