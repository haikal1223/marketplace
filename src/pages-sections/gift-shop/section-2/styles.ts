"use client";

import { styled } from "@mui/material/styles";

export const ContentRoot = styled("div")(({ theme }) => ({
  gap: 12,
  display: "flex",
  flexWrap: "wrap",
  background: "#fff",
  marginBottom: "2rem",
  alignItems: "center",
  padding: "1.5rem 2rem",
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down("sm")]: {
    marginBottom: 0,
    textAlign: "center",
    padding: "1rem 0.5rem",
    flexDirection: "column"
  },
  "& .description": { color: theme.palette.text.secondary },
  "& .title": { fontSize: 16, fontWeight: 500 }
}));

export const IconBox = styled("div")(({ theme }) => ({
  padding: "12px",
  display: "flex",
  fontSize: "22px",
  alignItems: "center",
  backgroundColor: theme.palette.marron[50]
}));
