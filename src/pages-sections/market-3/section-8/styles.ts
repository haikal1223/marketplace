"use client";

import { styled } from "@mui/material/styles";

export const StyledContent = styled("div")(({ theme }) => ({
  marginTop: "1.5rem",
  paddingBlock: "2rem",
  borderRadius: ".5rem",
  backgroundColor: theme.palette.grey[100],
  ".brand-item": {
    height: 50,
    maxWidth: 110,
    margin: "auto",
    display: "flex",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
    "& img": {
      filter: "grayscale(1)",
      objectFit: "contain"
    }
  }
}));
