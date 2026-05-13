"use client";

import { styled } from "@mui/material/styles";

export const RootStyle = styled("div")(({ theme }) => ({
  minHeight: 300,
  borderRadius: 12,
  display: "flex",
  overflow: "hidden",
  position: "relative",
  marginTop: "-10rem",

  img: { objectFit: "cover" },

  ".content": {
    top: "40%",
    right: "15%",
    position: "absolute",
    transform: "translateY(-40%)",
    ":dir(rtl)": { left: "15%", right: "auto" },

    h2: {
      fontSize: 36,
      fontWeight: 600,
      lineHeight: 1.2,
      marginTop: "1.5rem",
      marginBottom: ".5rem",
      [theme.breakpoints.down("sm")]: { fontSize: 30 }
    },

    ".description": {
      fontSize: 16,
      lineHeight: 1.2,
      marginBottom: "1.5rem",
      [theme.breakpoints.down("sm")]: { fontSize: 14 }
    },

    [theme.breakpoints.down("sm")]: {
      top: "50%",
      insetInline: 0,
      padding: "2rem",
      transform: "translateY(-50%)"
    },

    [theme.breakpoints.down(375)]: {
      h2: { fontSize: 24, marginTop: 0 }
    }
  },

  [theme.breakpoints.down(375)]: { minHeight: 260 }
}));
