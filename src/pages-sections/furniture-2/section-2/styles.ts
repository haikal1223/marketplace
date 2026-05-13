"use client";

import { styled } from "@mui/material/styles";

export const BannerCardWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  minHeight: 220,
  maxHeight: 300,
  borderRadius: 12,
  display: "flex",
  overflow: "hidden",
  position: "relative",
  img: { objectFit: "cover" },
  ".content": {
    zIndex: 1,
    right: 50,
    top: "50%",
    textAlign: "right",
    position: "absolute",
    transform: "translateY(-50%)",

    "& .tag": {
      fontSize: 24,
      fontWeight: 600,
      textTransform: "uppercase",
      [theme.breakpoints.down("sm")]: { fontSize: 20 }
    },

    "& .title": {
      fontSize: 36,
      lineHeight: 1,
      fontWeight: 600,
      textTransform: "uppercase",
      [theme.breakpoints.down("sm")]: { fontSize: 32 }
    },

    "& .price": {
      marginBottom: "1rem",
      color: theme.palette.grey[600],
      span: { color: theme.palette.error.main, fontWeight: 600 }
    },

    [theme.breakpoints.down(574)]: { right: 35, h6: { fontSize: 27 } },
    ...(theme.direction === "rtl" && { left: 50, textAlign: "left", right: "auto" })
  }
}));
