"use client";

import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

export const DiscountWrapper = styled(Card)(({ theme }) => ({
  padding: "50px",
  marginBottom: "3rem",
  backgroundColor: theme.palette.grey[100],

  "& h1": { fontSize: 36 },
  ".MuiButton-root": { marginTop: "2rem" },
  "& p": { fontSize: 16, marginBottom: ".5rem", fontWeight: 500 },

  [theme.breakpoints.down("sm")]: {
    marginInline: "auto",
    padding: "30px 20px",
    "& .content": {
      marginBottom: 30,
      textAlign: "center",
      "& h1": { fontSize: 25 }
    }
  }
}));
