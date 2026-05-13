"use client";

import { styled } from "@mui/material/styles";

export const StyledContent = styled("div")(({ theme }) => ({
  zIndex: 1,
  position: "relative",
  ".card": {
    display: "flex",
    minHeight: 150,
    padding: "2rem",
    cursor: "pointer",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: theme.shadows[1],
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      boxShadow: theme.shadows[2],
      transform: "translateY(-4px)"
    }
  },
  ":after": {
    height: 120,
    width: 120,
    top: 0,
    right: 0,
    zIndex: -1,
    content: '""',
    marginTop: -50,
    marginRight: -50,
    position: "absolute",
    borderRadius: "300px",
    background: "#fbeef0",
    [theme.breakpoints.down("sm")]: { display: "none" }
  },
  ":before": {
    width: 120,
    height: 120,
    left: 0,
    bottom: 0,
    zIndex: -1,
    content: '""',
    marginLeft: -50,
    marginBottom: -50,
    position: "absolute",
    borderRadius: "300px",
    background: theme.palette.grey[200],
    [theme.breakpoints.down("sm")]: { display: "none" }
  },
  ".title": {
    maxWidth: 200,
    marginTop: "1rem",
    textAlign: "center",
    marginInline: "auto"
  }
}));
