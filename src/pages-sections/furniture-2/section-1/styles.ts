"use client";

import { styled } from "@mui/material/styles";

export const RootStyle = styled("div")(({ theme }) => ({
  minHeight: 400,
  borderRadius: 12,
  display: "flex",
  overflow: "hidden",
  position: "relative",
  ".banner": { objectFit: "cover" },
  ".content": {
    top: 30,
    insetInline: 0,
    textAlign: "center",
    position: "absolute",

    ".title": {
      lineHeight: 1,
      fontSize: 60,
      fontWeight: 600,
      textTransform: "uppercase",
      [theme.breakpoints.down("sm")]: { fontSize: 48 },
      [theme.breakpoints.down(375)]: { fontSize: 36 }
    },

    ".sub-title": {
      fontSize: 28,
      fontWeight: 600,
      textTransform: "uppercase"
    },

    ".price": {
      fontSize: 18,
      marginTop: ".5rem",
      marginBottom: "1.5rem",
      span: { fontWeight: 600 }
    }
  }
}));
