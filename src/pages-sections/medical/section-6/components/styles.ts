"use client";

import { styled } from "@mui/material/styles";

export const BlogCardWrapper = styled("div")(({ theme }) => ({
  gap: "1.5rem",
  display: "flex",
  alignItems: "center",

  ".img-wrapper": {
    maxWidth: 250,
    display: "flex",
    borderRadius: 12,
    overflow: "hidden"
  },

  ".date": {
    color: theme.palette.grey[600],
    marginBottom: theme.spacing(1.5)
  },

  ".title": {
    fontSize: 18,
    maxWidth: 220,
    [theme.breakpoints.up("lg")]: { fontSize: 20, maxWidth: 250 }
  },

  [theme.breakpoints.down("sm")]: {
    maxWidth: 375,
    flexDirection: "column",
    alignItems: "flex-start",
    h3: { maxWidth: "100%" },
    ".img-wrapper": { maxWidth: "100%" }
  }
}));

// TESTIMONIAL CAROUSEL SECTION STYLES
export const TestimonialRootStyle = styled("div")(({ theme }) => ({
  height: "100%",
  borderRadius: 16,
  paddingInline: "5rem",
  paddingBlock: "2.5rem",
  backgroundColor: theme.palette.grey[300],

  [theme.breakpoints.down("sm")]: {
    paddingInline: "2rem",
    paddingBlock: "2rem"
  },

  ".wrapper": { position: "relative" },

  ".icon": {
    right: 0,
    fontSize: 66,
    rotate: "180deg",
    position: "absolute",
    color: theme.palette.grey[500],
    ...(theme.direction === "rtl" && { right: "auto", left: 0 })
  },

  ".btn-wrapper": {
    textAlign: theme.direction === "rtl" ? "left" : "right",

    ".right-arrow": {
      marginLeft: 8,
      backgroundColor: "white",
      boxShadow: theme.shadows[2]
    },

    ...(theme.direction === "rtl" && {
      ".MuiSvgIcon-root": { rotate: "180deg" }
    })
  }
}));

export const TestimonialCard = styled("div")(({ theme }) => ({
  ".title": {
    fontSize: 18,
    fontWeight: 600,
    paddingTop: "1.5rem"
  },
  ".comment": {
    fontSize: 16,
    lineHeight: 1.7,
    marginTop: "1rem"
  },
  ".user-img-wrapper": {
    width: 50,
    height: 50,
    flexShrink: 0,
    display: "flex",
    overflow: "hidden",
    borderRadius: "50%",
    border: "2px solid white"
  },
  ".user-info": {
    gap: 16,
    marginTop: 18,
    display: "flex",
    alignItems: "center",
    ".username": { fontSize: 18, fontWeight: 500 },
    ".designation": { color: theme.palette.grey[600] }
  }
}));
