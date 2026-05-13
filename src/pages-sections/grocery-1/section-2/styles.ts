"use client";

import { styled } from "@mui/material/styles";

export const ServiceCard = styled("div")(({ theme }) => ({
  gap: 16,
  display: "flex",
  flexWrap: "wrap",
  padding: "1.5rem",
  background: "#fff",
  borderRadius: "8px",
  alignItems: "center",
  boxShadow: theme.shadows[5],
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    padding: "1rem 0.5rem",
    flexDirection: "column"
  },
  "& h4": {
    fontSize: "1rem",
    fontWeight: 600,
    color: theme.palette.grey[900]
  },
  "& p": {
    color: theme.palette.grey[600]
  }
}));
