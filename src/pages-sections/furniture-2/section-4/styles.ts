"use client";

import { styled } from "@mui/material/styles";

export const BannerCardWrapper = styled("div")(({ theme }) => ({
  borderRadius: 12,
  overflow: "hidden",
  position: "relative",

  ":after": {
    top: 0,
    left: 0,
    zIndex: 1,
    opacity: 0.55,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "black"
  },

  img: {
    minHeight: 230,
    display: "block",
    objectFit: "cover"
  },

  ".btn-wrapper": {
    maxWidth: 120,
    width: "100%",
    marginTop: "1.5rem"
  },

  ".content": {
    inset: 0,
    zIndex: 2,
    width: "100%",
    color: "white",
    margin: "auto",
    height: "100%",
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",

    "& .title": {
      fontSize: 42,
      fontWeight: 600,
      lineHeight: 1.2,
      textTransform: "uppercase",
      [theme.breakpoints.down("sm")]: { fontSize: 36 },
      [theme.breakpoints.down(375)]: { fontSize: 30 }
    },

    "& .description": {
      fontSize: 16,
      [theme.breakpoints.down("sm")]: { fontSize: 14 }
    }
  }
}));
