"use client";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

// STYLED COMPONENTS
export const CardWrapper = styled(Box)({
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

export const CardContent = styled(Box, {
  shouldForwardProp: (props) => props !== "contentAlign"
})<{ contentAlign: "right" | "left" }>(({ contentAlign, theme }) => ({
  top: 0,
  left: 32,
  zIndex: 1,
  color: "white",
  height: "100%",
  display: "flex",
  position: "absolute",
  flexDirection: "column",
  justifyContent: "center",
  "&:dir(rtl)": { right: 32, alignItems: "flex-end" },
  "& .title": { fontWeight: 600, fontSize: 24 },
  "& .divider": { width: 50, borderWidth: 1, marginBlock: ".75rem" },
  ...(contentAlign === "right" && {
    right: 32,
    left: "auto",
    alignItems: "flex-end",
    "&:dir(rtl)": { left: 32, right: "auto", alignItems: "flex-start" }
  })
}));

export const CardLink = styled("span")({
  position: "relative",
  paddingBottom: "2px",
  textTransform: "uppercase",
  ":hover::after": { width: "100%" },
  ":after": {
    left: 0,
    bottom: 0,
    width: "0%",
    content: "''",
    height: "2px",
    transition: "0.3s",
    position: "absolute",
    backgroundColor: "white"
  }
});
