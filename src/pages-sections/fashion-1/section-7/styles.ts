"use client";

import { styled } from "@mui/material/styles";

export const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  padding: "1rem 2rem",
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.between("sm", "lg")]: { justifyContent: "space-evenly" },
  [theme.breakpoints.down("sm")]: { flexDirection: "column", alignItems: "flex-start" }
}));
