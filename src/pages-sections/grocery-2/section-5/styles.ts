"use client";

import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
// CUSTOM ICON COMPONENT
import Quote from "icons/Quote";

// STYLED COMPONENTS
export const StyledCard = styled(Card)(({ theme }) => ({
  cursor: "grab",
  padding: "2rem",
  overflow: "hidden",
  borderRadius: 12,
  position: "relative",
  background: theme.palette.grey[50]
}));

export const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 760,
  display: "flex",
  flexWrap: "wrap",
  marginInline: "auto",
  position: "relative",
  padding: "4rem 6rem",
  [theme.breakpoints.down("sm")]: { padding: "2rem 4rem" },
  ".testimonial-content": {
    width: "100%",
    textAlign: "center",
    p: { color: theme.palette.grey[700] },
    h5: { marginTop: ".5rem", fontWeight: 600, fontSize: 16 }
  }
}));

export const StyledQuote = styled(Quote)(({ theme }) => ({
  opacity: 0.08,
  fontSize: "4rem",
  position: "absolute",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: { fontSize: "3rem" },
  "&.first": {
    top: 0,
    ...(theme.direction === "rtl" ? { right: 0 } : { left: 0 })
  },
  "&.last": {
    bottom: 0,
    transform: "rotate(180deg)",
    ...(theme.direction === "rtl" ? { left: 0 } : { right: 0 })
  }
}));

export const StyledAvatar = styled(Avatar)({
  width: 64,
  height: 64,
  margin: "auto",
  display: "block",
  marginBottom: "1rem"
});
