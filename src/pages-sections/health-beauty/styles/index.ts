"use client";

import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const SubTitle = styled("p")(({ theme }) => ({
  fontSize: 13,
  marginBottom: 24,
  color: theme.palette.grey[600]
}));
