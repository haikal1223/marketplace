"use client";

import { styled } from "@mui/material/styles";

export const BannerWrapper = styled("div")({
  minHeight: 300,
  height: "100%",
  display: "flex",
  borderRadius: 12,
  overflow: "hidden",
  position: "relative",
  img: { objectFit: "cover" }
});

export const ContentWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "center"
})<{ center: boolean }>(({ center }) => ({
  top: 40,
  zIndex: 1,
  insetInline: 0,
  textAlign: "center",
  position: "absolute",

  ...(center && { top: "40%", transform: "translateY(-50%)" }),

  "& .title": {
    fontSize: 32,
    fontWeight: 600,
    lineHeight: 1.1,
    marginBottom: "2rem",
    textTransform: "uppercase",
    maxWidth: 200,
    marginInline: "auto"
  },

  "& .tag": {
    fontSize: 16,
    fontWeight: 500
  }
}));
