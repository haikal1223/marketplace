"use client";

import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const StyledCard = styled(Card)(({ theme }) => ({
  gap: "1rem",
  height: "100%",
  display: "flex",
  padding: "1.5rem",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    padding: 20,
    textAlign: "center",
    flexDirection: "column"
  },
  "& p": {
    fontSize: 12,
    marginBottom: ".5rem",
    color: theme.palette.primary.main
  },
  "& h5": {
    fontSize: 16,
    lineHeight: 1,
    fontWeight: 500
  }
}));
