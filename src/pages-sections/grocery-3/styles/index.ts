"use client";

import { styled } from "@mui/material/styles";

// USED IN SECTION 3 & 4
export const TitleBox = styled("div")(({ theme }) => ({
  marginTop: "4rem",
  textAlign: "center",
  marginBottom: "3rem",
  "& h1": {
    fontSize: 36,
    fontWeight: 600,
    marginBottom: ".75rem",
    [theme.breakpoints.down("sm")]: { fontSize: 28 }
  },
  "& div": {
    width: 200,
    height: "2px",
    margin: "auto",
    background: theme.palette.primary.main
  }
}));
