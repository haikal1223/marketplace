"use client";

import { styled } from "@mui/material/styles";

export const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  marginTop: "4rem",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  color: "white",
  textAlign: "center",
  padding: "6rem 2rem",
  backgroundSize: "cover",
  backgroundColor: "grey.500",
  backgroundRepeat: "no-repeat",
  backgroundImage: "url(/assets/images/banners/banner-11.jpg)",

  "& .subtitle": {
    fontSize: 30,
    lineHeight: 1,
    marginBottom: ".5rem",
    span: { color: theme.palette.error.main },
    [theme.breakpoints.down("sm")]: { fontSize: 27 }
  },

  "& .title": {
    fontSize: 50,
    lineHeight: 1,
    fontWeight: 600,
    marginBottom: ".5rem",
    [theme.breakpoints.down("sm")]: { fontSize: 42 }
  },

  "& .description": {
    fontSize: 18,
    marginBottom: "3rem",
    [theme.breakpoints.down("sm")]: { fontSize: 16 }
  }
}));
