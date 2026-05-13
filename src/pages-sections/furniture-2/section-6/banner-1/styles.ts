"use client";

import { styled } from "@mui/material/styles";

export const BannerWrapper = styled("div")(({ theme }) => ({
  minHeight: 400,
  height: "100%",
  display: "flex",
  borderRadius: 12,
  overflow: "hidden",
  position: "relative",
  img: { objectFit: "cover" },

  ".content": {
    top: 40,
    left: 40,
    zIndex: 1,
    position: "absolute",

    ".title": {
      fontSize: 27,
      fontWeight: 500,
      color: theme.palette.primary.main
    },

    ".tag": {
      fontSize: 36,
      lineHeight: 1.2,
      fontWeight: 600,
      textTransform: "uppercase"
    },

    ".price": {
      color: theme.palette.grey[600],
      span: { color: theme.palette.primary.main, fontWeight: 600 }
    },

    ":dir(rtl)": {
      right: 40,
      left: "auto",
      textAlign: "right"
    }
  },
  ".count-down": {
    gap: 24,
    marginTop: 24,
    display: "flex",
    flexWrap: "wrap",
    [theme.breakpoints.down(375)]: {
      maxWidth: 140,
      marginRight: "auto",
      justifyContent: "space-between"
    }
  }
}));

export const CountBoxWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  ".label": {
    marginTop: 8,
    fontWeight: 500,
    color: theme.palette.grey[600]
  },

  ".count-box": {
    width: 50,
    height: 50,
    fontSize: 22,
    borderRadius: 8,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    color: theme.palette.grey[600]
  }
}));
