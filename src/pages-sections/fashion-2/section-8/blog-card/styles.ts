"use client";

import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

// STYLED COMPONENTS
export const RootStyle = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: theme.shadows[1],
  ".content": {
    paddingTop: ".5rem",
    paddingInline: "1rem",
    paddingBottom: "1.5rem",
    h4: { fontWeight: 600, fontSize: 17 },
    "& .description": { marginTop: ".25rem", marginBottom: "1rem" }
  }
}));

export const ImageBox = styled("div")({
  borderRadius: 12,
  margin: 16,
  maxHeight: 220,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  img: { transition: "0.3s", display: "block" },
  ":hover": { img: { transform: "scale(1.1)" } }
});

export const DateBox = styled("div")(({ theme }) => ({
  top: 30,
  left: 30,
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: 12,
  textAlign: "center",
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.grey[200],
  p: {
    fontSize: 14,
    lineHeight: 1,
    fontWeight: 600,
    width: "min-content"
  }
}));
