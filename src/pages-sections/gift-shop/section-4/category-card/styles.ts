"use client";

import { styled } from "@mui/material/styles";

// STYLED COMPONENTS
export const StyledRoot = styled("div")(({ theme }) => ({
  textAlign: "center",
  transition: "all 0.3s",
  p: { color: theme.palette.grey[600] },
  h6: { fontSize: 15, fontWeight: 500, marginBlock: "8px 2px" },
  "&:hover": { "& h6": { color: theme.palette.primary.main } }
}));

export const ImageWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  padding: "0 40px 20px 40px",
  background: theme.palette.primary[50],
  img: {
    width: "100%",
    height: "auto",
    aspectRatio: "16/9",
    objectFit: "contain"
  }
}));
