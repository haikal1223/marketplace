"use client";

import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

// STYLED COMPONENTS
export const StyledRoot = styled("div")(({ theme }) => ({
  borderRadius: 12,
  overflow: "hidden",
  backgroundColor: theme.palette.primary.main,
  padding: "3rem",
  // ...(theme.direction === "rtl" && { padding: "2rem 2.5rem 5rem 1rem" }),
  h5: {
    fontSize: 18,
    marginBottom: "1.25rem"
  },
  h1: {
    maxWidth: 280,
    lineHeight: 1.27,
    marginBottom: ".5rem"
  },
  h6: {
    maxWidth: 470,
    fontWeight: 400,
    color: "inherit",
    marginBottom: "2.5rem"
  }
}));

export const StyledGrid = styled(Grid)(({ theme }) => ({
  alignItems: "center",
  display: "flex !important",
  // padding: "2rem 1rem 5rem 2.5rem",
  // backgroundColor: theme.palette.common.black,
  // ...(theme.direction === "rtl" && { padding: "2rem 2.5rem 5rem 1rem" }),
  [theme.breakpoints.down("sm")]: { flexDirection: "column-reverse" }
}));

export const GridItemOne = styled(Grid)({ color: "white" });

export const GridItemTwo = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: { padding: "1.8rem" }
}));
