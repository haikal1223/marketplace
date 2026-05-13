"use client";

import Card from "@mui/material/Card";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";

// STYLED COMPONENTS
export const StyledListItem = styled(ListItem)(({ theme }) => ({
  fontWeight: 500,
  cursor: "pointer",
  padding: "0.75rem 0 0 0",
  transition: "all 0.3s",
  ":hover": {
    color: theme.palette.primary.main,
    textDecoration: "underline",
    textUnderlineOffset: "0.25rem"
  }
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  border: 0,
  padding: "2rem 2rem",
  borderRadius: ".5rem",
  backgroundColor: theme.palette.grey[50]
}));
