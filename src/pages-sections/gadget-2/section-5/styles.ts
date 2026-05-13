"use client";

import { styled } from "@mui/material/styles";

export const YellowBox = styled("div")(({ theme }) => ({
  padding: "3rem",
  borderRadius: 16,
  position: "relative",
  backgroundColor: theme.palette.grey[100],
  ".img-wrapper": {
    right: 0,
    zIndex: 1,
    bottom: 0,
    width: 380,
    display: "block",
    position: "absolute",
    img: { display: "block" },
    [theme.breakpoints.down("sm")]: { display: "none" }
  },
  h2: {
    fontSize: 42,
    lineHeight: 1.2,
    marginBottom: "2rem",
    [theme.breakpoints.down("sm")]: { fontSize: 36 }
  },
  [theme.breakpoints.down(375)]: {
    padding: "2rem",
    h2: { fontSize: 27 }
  }
}));

export const BlackBox = styled("div")(({ theme }) => ({
  height: "100%",
  color: "white",
  display: "flex",
  borderRadius: 16,
  position: "relative",
  backgroundColor: theme.palette.grey[900],
  gap: "2rem",
  ".img-wrapper": {
    width: 260,
    display: "flex",
    img: { alignSelf: "flex-end" },
    [theme.breakpoints.down("sm")]: { display: "none" }
  },
  ".content": {
    paddingBlock: "3rem",
    [theme.breakpoints.down("sm")]: { paddingInline: "3rem" },
    [theme.breakpoints.down(375)]: { h2: { fontSize: 27 } }
  },
  h2: {
    fontSize: 42,
    lineHeight: 1.2,
    marginBottom: "2rem",
    [theme.breakpoints.down("sm")]: { fontSize: 36 }
  }
}));
