"use client";

import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const CardWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "img" && prop !== "mode"
})<{ img: string; mode: string }>(({ theme, img, mode }) => ({
  minHeight: 500,
  display: "flex",
  alignItems: "center",
  borderRadius: ".5rem",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${img})`,
  backgroundColor: mode === "dark" ? "#000" : "#fff",
  color: mode === "light" ? theme.palette.dark.main : "#fff",
  ".content": theme.direction === "rtl" ? { paddingRight: 80 } : { paddingLeft: 80 },
  [theme.breakpoints.down("md")]: {
    padding: 24,
    textAlign: "center",
    backgroundImage: "none",
    justifyContent: "center",
    ".content": theme.direction === "rtl" ? { paddingRight: 0 } : { paddingLeft: 0 }
  },
  ".title": {
    marginBottom: ".5rem"
  },
  ".discount": {
    marginTop: ".75rem",
    span: { color: theme.palette.error.main }
  },
  ".description": {
    marginBottom: "2rem",
    marginTop: ".5rem",
    fontSize: 16
  }
}));
