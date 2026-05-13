"use client";

import { styled } from "@mui/material/styles";

export const ContentWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "hasGradient"
})<{ hasGradient?: boolean }>(({ theme, hasGradient }) => ({
  height: "100%",
  color: "white",
  borderRadius: 12,
  backgroundColor: theme.palette.grey[900],
  ...(hasGradient && {
    background: "linear-gradient(214deg, #FD814D 0.04%, #FF5745 100.04%)"
  })
}));
