"use client";

import { styled } from "@mui/material/styles";

export const StyledRoot = styled("div")<{ center?: boolean }>(({ center, theme }) => ({
  display: "flex",
  position: "relative",
  "::after": {
    content: '""',
    inset: 0,
    position: "absolute",
    background: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)"
  },
  ".content": {
    zIndex: 1,
    top: "2rem",
    left: "2rem",
    color: "white",
    position: "absolute",
    ...(center && {
      left: "50%",
      textAlign: "center",
      transform: "translateX(-50%)"
    }),
    [theme.breakpoints.up(375)]: { maxWidth: 210 }
  },
  ".btn": {
    fontSize: 14,
    fontWeight: 500,
    marginTop: "1.5rem",
    display: "inline-block",
    borderBottom: "2px solid white"
  },

  [theme.breakpoints.down(375)]: { minHeight: 220 }
}));
