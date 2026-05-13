"use client";

import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";

// STYLED COMPONENTS
export const StyledButtonBase = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "variant"
})<{ variant: "light" | "dark" }>(({ variant, theme }) => ({
  fontWeight: 500,
  padding: ".75rem 1.5rem",
  textTransform: "uppercase",
  transition: "all 300ms ease-out",
  ...(variant === "light" && {
    color: "white",
    border: "2px solid white",
    ":hover": {
      backgroundColor: "white",
      color: theme.palette.text.primary
    }
  }),
  ...(variant === "dark" && {
    color: theme.palette.text.primary,
    border: `2px solid ${theme.palette.text.primary}`,
    ":hover": {
      backgroundColor: theme.palette.text.primary,
      color: "white"
    }
  })
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: 12,
  borderRadius: 16,
  padding: "5px 12px",
  border: `1px solid ${theme.palette.divider}`,
  ":hover": { backgroundColor: "inherit" },
  ...(theme.direction === "rtl" && {
    ".MuiButton-endIcon": { rotate: "180deg" }
  })
}));

export const StyledHeadingRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "2rem",
  justifyContent: "space-between",
  "& .title": { fontSize: 24, fontWeight: 600 }
}));
