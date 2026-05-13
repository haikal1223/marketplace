"use client";

import { styled } from "@mui/material/styles";

// STYLED COMPONENTS
export const CardWrapper = styled("div")({
  height: 240,
  borderRadius: 12,
  overflow: "hidden",
  position: "relative",
  ":hover": { img: { transform: "scale(1.1)" } },
  img: {
    objectFit: "cover",
    objectPosition: "top",
    transition: "all 4s cubic-bezier(0, 0, 0.1, 1)"
  }
});

export const CardContent = styled("div")({
  top: 0,
  zIndex: 1,
  padding: 32,
  width: "100%",
  color: "white",
  height: "100%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  justifyContent: "space-between",
  h3: { fontWeight: 600 },
  h1: { fontSize: 52, lineHeight: 1, fontWeight: 600 }
});
