"use client";

import { styled } from "@mui/material/styles";

export const StyledRoot = styled("div")(() => ({
  height: "100%",
  display: "flex",
  alignItems: "flex-end",
  borderRadius: 12,
  overflow: "hidden",
  position: "relative",
  cursor: "pointer",
  ":before": {
    content: '""',
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    background: "linear-gradient(.62deg,rgba(23, 23, 23, .6) .58%, #0000 65.92%)"
  },
  ":hover": {
    img: { scale: 1.1 },
    ".card-title": { textDecoration: "underline" }
  },
  img: {
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    transition: "scale 0.75s cubic-bezier(0.2, 0.75, 0.5, 1)"
  }
}));

export const CardContent = styled("div")(() => ({
  position: "relative",
  zIndex: 2,
  display: "flex",
  gap: "1rem",
  justifyContent: "space-between",
  width: "100%",
  flexWrap: "wrap",
  padding: "2rem",
  color: "white"
}));

export const CardButton = styled("button")(({ theme }) => ({
  all: "unset",
  width: 36,
  height: 36,
  display: "flex",
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  marginInlineStart: "auto",
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.common.white
}));

export const CardGrid = styled("div")(({ theme }) => ({
  marginTop: "1.5rem",
  gap: "1.5rem",
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "repeat(5, 200px)",

  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(4, 250px)",
    "& > a:nth-of-type(1)": { gridArea: "1 / 1 / 3 / 3" }
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateRows: "repeat(2, 300px)",
    gridTemplateColumns: "repeat(3, 1fr)",
    "& > a:nth-of-type(1)": { gridArea: "1 / 1 / 3 / 2" },
    "& > a:nth-of-type(4)": { gridArea: "2 / 2 / 3 / 3" },
    "& > a:nth-of-type(5)": { gridArea: "2 / 3 / 3 / 4" }
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateRows: "repeat(2, 410px)"
  }
}));
