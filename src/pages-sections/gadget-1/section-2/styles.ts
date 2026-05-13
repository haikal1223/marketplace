"use client";

import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

export const StyledRoot = styled(Card)(({ theme }) => ({
  height: 282,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  ":before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    width: "100%",
    height: "100%",
    background: "linear-gradient(to top, rgba(0,0,0,0.6) 10%, transparent 100%)"
  },
  ".content": {
    left: 0,
    bottom: 0,
    zIndex: 2,
    width: "100%",
    position: "absolute",
    padding: "1rem 1.5rem",
    color: theme.palette.common.white
  },
  img: {
    objectFit: "cover",
    objectPosition: "center",
    transition: "transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms"
  },
  ":hover": {
    img: { transform: "scale(1.1)" },
    ".title": { textDecoration: "underline" }
  }
}));
