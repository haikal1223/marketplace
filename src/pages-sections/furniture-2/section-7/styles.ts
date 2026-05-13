"use client";

import { styled } from "@mui/material/styles";

export const RootStyled = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  marginTop: "5rem",
  paddingTop: "4rem",
  paddingBottom: "15rem",

  ".heading": {
    textAlign: "center",
    marginBottom: "2.5rem",

    ".title": {
      fontSize: 30,
      fontWeight: 600,
      [theme.breakpoints.down("sm")]: { fontSize: 27 }
    },

    ".description": {
      fontSize: 16,
      color: theme.palette.grey[600],
      [theme.breakpoints.down("sm")]: { fontSize: 14 }
    }
  }
}));

export const Wrapper = styled("div")(({ theme }) => ({
  borderRadius: 16,
  padding: "4rem 3rem",
  backgroundColor: theme.palette.grey[200],
  [theme.breakpoints.down("lg")]: { padding: "2rem" },

  ".user-info": {
    gap: "1rem",
    display: "flex",
    marginBottom: "1rem",
    alignItems: "center"
  }
}));

export const ImageWrapper = styled("div")({
  width: 50,
  height: 50,
  flexShrink: 0,
  display: "flex",
  overflow: "hidden",
  borderRadius: "50%",
  border: "2px solid white"
});
