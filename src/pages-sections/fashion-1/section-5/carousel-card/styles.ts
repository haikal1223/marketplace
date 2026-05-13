"use client";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const ContentWrapper = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    padding: "2rem",
    width: "100%"
  },
  [theme.breakpoints.between("sm", "md")]: {
    width: "80%",
    padding: "0 3rem",
    paddingBottom: "2rem"
  },

  p: { marginTop: "0.3rem" },
  h4: { marginTop: "1.5rem", marginBottom: "0.3rem" },
  h3: { marginBottom: "0.2rem", color: theme.palette.primary[500] },
  "& .buttons": {
    gap: "1rem",
    display: "flex",
    marginTop: "1.5rem",
    alignItems: "center"
  }
}));

export const FavoriteButton = styled(Button)(({ theme }) => ({
  color: "white",
  height: "44px",
  borderRadius: "8px",
  paddingInline: "1rem",
  backgroundColor: theme.palette.grey[500],
  ":hover": { backgroundColor: theme.palette.grey[500] }
}));

export const ImageWrapper = styled("div")(({ theme }) => ({
  minHeight: 400,
  height: "100%",
  margin: "2.5rem",
  position: "relative",
  img: { objectFit: "contain", display: "block" },
  [theme.breakpoints.down("sm")]: { minHeight: 300 }
}));
