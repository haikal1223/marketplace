"use client";

import { styled } from "@mui/material/styles";

// STYLED COMPONENTS
export const RootStyle = styled("div")(({ theme }) => ({
  borderRadius: 8,
  display: "grid",
  padding: "2rem 0",
  gridTemplateColumns: "repeat(4, 1fr)",
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down("md")]: {
    gap: 30,
    gridTemplateColumns: "repeat(2, 1fr)"
  },
  [theme.breakpoints.down("sm")]: {
    gap: 30,
    paddingLeft: "2rem",
    paddingRight: "2rem",
    gridTemplateColumns: "1fr"
  }
}));
