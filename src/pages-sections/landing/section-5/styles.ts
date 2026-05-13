"use client";

import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const StyledRoot = styled("div")(({ theme }) => ({
  ".model-content": {
    marginTop: "4rem"
  },
  ".list": {
    marginTop: "2rem",
    ".item": {
      gap: ".5rem",
      fontSize: 18,
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      marginBottom: ".75rem",
      color: theme.palette.grey[900]
    }
  },
  ".api-content": {
    marginTop: theme.spacing(25),
    marginBottom: theme.spacing(12)
  },
  ".server": {
    display: "flex",
    marginBottom: "5rem",
    justifyContent: "center",
    "& img": {
      width: "auto",
      height: "120px"
    }
  }
}));

export const ImageBox = styled("div")(({ theme }) => ({
  padding: 32,
  display: "flex",
  borderRadius: 16,
  justifyContent: "center",
  backgroundColor: theme.palette.grey[300]
}));
