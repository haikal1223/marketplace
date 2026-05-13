"use client";

import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const BannerWrapper = styled("div")(({ theme }) => ({
  zIndex: 1,
  rowGap: "5rem",
  padding: "2rem",
  display: "flex",
  flexWrap: "wrap",
  overflow: "hidden",
  borderRadius: ".5rem",
  alignItems: "center",
  position: "relative",
  justifyContent: "flex-end",
  ":after": {
    top: 0,
    left: 0,
    zIndex: -1,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundSize: "cover",
    backgroundPosition: "center left",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(/assets/images/banners/long-banner.jpg)`,
    ...(theme.direction === "rtl" && { transform: "rotateX(180deg) rotateZ(180deg)" })
  },

  [theme.breakpoints.down("md")]: {
    gap: "1rem",
    flexDirection: "column",
    justifyContent: "center"
  },

  ".content": {
    flex: 1,
    textAlign: "center",
    "& p": { fontSize: 16 },
    "& h3": {
      lineHeight: 1,
      fontSize: 36,
      span: { color: theme.palette.error.main },
      [theme.breakpoints.down("sm")]: { fontSize: 28 }
    },
    [theme.breakpoints.up("md")]: { paddingInlineStart: "10rem" }
  }
}));
