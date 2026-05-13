"use client";

import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

export const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  boxShadow: "none",
  alignItems: "center",
  padding: "20px 50px",
  justifyContent: "center",
  background: theme.palette.grey[50],
  [theme.breakpoints.down("sm")]: {
    padding: "20px 30px",
    "& h3": { fontSize: 20 }
  },

  ".content": {
    width: "60%",
    p: { fontWeight: 500, marginBottom: ".2rem" },
    h3: { fontSize: 25, lineHeight: 1.35, fontWeight: 600, marginBottom: "1.5rem" },
    [theme.breakpoints.up("lg")]: { width: "50%" }
  },

  ".img-wrapper": {
    width: "40%",
    [theme.breakpoints.up("lg")]: { width: "50%" }
  }
}));
