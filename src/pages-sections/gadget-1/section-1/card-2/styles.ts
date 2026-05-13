"use client";

import { styled } from "@mui/material/styles";

export const Wrapper = styled("div")(({ theme }) => ({
  gap: 10,
  minHeight: 350,
  borderRadius: 12,
  overflow: "hidden",
  position: "relative",
  display: "flex",
  alignItems: "end",
  color: theme.palette.common.white,
  ":hover img": { transform: "scale(1.1)" },
  img: {
    objectFit: "cover",
    objectPosition: "top center",
    transition: "all 4s cubic-bezier(0, 0, 0.1, 1)"
  },
  ":before": {
    content: '""',
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.common.black,
    opacity: 0.3,
    zIndex: 1
  },
  ".content": {
    zIndex: 1,
    width: "100%",
    textAlign: "center",
    padding: "2rem",
    position: "relative",
    ".badge": {
      fontSize: 16,
      marginBottom: 4,
      display: "inline-block"
    }
  }
}));
