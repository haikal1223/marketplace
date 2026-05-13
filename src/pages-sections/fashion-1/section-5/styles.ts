"use client";

import { styled } from "@mui/material/styles";

export const ContentWrapper = styled("div")({
  position: "relative",
  backgroundColor: "#F3F6F9"
});

export const BadgeBox = styled("div")(({ theme }) => ({
  top: 0,
  right: "3rem",
  position: "absolute",
  [theme.breakpoints.down("sm")]: { width: 85, right: "1rem" }
}));
