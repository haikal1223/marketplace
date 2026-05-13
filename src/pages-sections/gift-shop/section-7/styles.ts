"use client";

import { styled } from "@mui/material/styles";

export const RootStyle = styled("div")(({ theme }) => ({
  minHeight: 400,
  display: "flex",
  overflow: "hidden",
  position: "relative",
  ".banner": { objectFit: "cover" },
  ".content": {
    right: 0,
    top: "50%",
    left: "50%",
    textAlign: "center",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    ".MuiButton-root": {
      padding: ".75rem 2rem",
      borderRadius: 0
    },
    h3: {
      fontSize: 48,
      lineHeight: 1,
      marginBlock: "1rem 1.5rem",
      [theme.breakpoints.down("xl")]: { fontSize: 42 },
      [theme.breakpoints.down("lg")]: { fontSize: 36 }
    }
  },
  [theme.breakpoints.down("sm")]: { minHeight: 330 }
}));
