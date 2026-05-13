"use client";

import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const ServiceCard = styled("div")(({ theme }) => ({
  gap: "1rem",
  display: "flex",
  flexWrap: "wrap",
  padding: "1.5rem",
  borderRadius: "8px",
  alignItems: "center",
  border: `1px solid ${theme.palette.divider}`,
  "& .description": { color: theme.palette.text.secondary },
  ".title": {
    fontSize: 20,
    fontWeight: 600,
    color: theme.palette.text.primary
  },
  [theme.breakpoints.between("sm", "md")]: {
    textAlign: "center",
    padding: "1rem 0.5rem",
    flexDirection: "column"
  }
}));
