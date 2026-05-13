"use client";

import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

export const StyledGrid = styled(Grid)(() => ({
  padding: "3rem",
  borderRadius: 12,
  alignItems: "center"
}));

export const H5 = styled("h5")(({ theme }) => ({
  fontSize: 18,
  fontWeight: 500,
  marginBottom: ".5rem",
  [theme.breakpoints.down("sm")]: { fontSize: 14 }
}));

export const H3 = styled("h3")(({ theme }) => ({
  fontSize: 33,
  fontWeight: 600,
  lineHeight: "1.37",
  marginBottom: "2rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: 24,
    marginBottom: "1.5rem"
  }
}));
