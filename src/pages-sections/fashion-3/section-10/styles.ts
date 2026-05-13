"use client";

import { styled } from "@mui/material/styles";

export const BannerWrapper = styled("div")(({ theme }) => ({
  borderRadius: 12,
  display: "flex",
  overflow: "hidden",
  position: "relative",

  img: {
    height: "100%",
    objectFit: "cover"
  },

  ".content-2": {
    left: 35,
    bottom: 60,
    position: "absolute",
    ...(theme.direction === "rtl" && { right: 35, left: "auto", textAlign: "right" })
  },

  ".content": {
    right: 35,
    bottom: 60,
    position: "absolute",
    ...(theme.direction === "rtl" && { left: 35, right: "auto" })
  },

  [theme.breakpoints.down("sm")]: {
    minHeight: 250,
    backgroundColor: theme.palette.grey[300],
    img: { display: "none" },

    ".content, .content-2": {
      textAlign: "center",
      inset: 0,
      top: "50%",
      transform: "translateY(-50%)"
    }
  },

  "& .tag": {
    fontSize: 16,
    fontWeight: 500,
    [theme.breakpoints.down("md")]: { fontSize: 14 }
  },

  "& .title": {
    fontSize: 30,
    fontWeight: 600,
    marginBottom: "1.5rem",
    [theme.breakpoints.down("md")]: { fontSize: 24 }
  }
}));
