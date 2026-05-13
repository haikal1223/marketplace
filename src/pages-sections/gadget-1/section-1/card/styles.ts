"use client";

import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const Wrapper = styled("div")(({ theme }) => ({
  gap: 10,
  minHeight: 350,
  borderRadius: 12,
  overflow: "hidden",
  position: "relative",
  display: "flex",
  alignItems: "center",
  color: theme.palette.common.white,
  ":hover img": { transform: "scale(1.1)" },
  img: {
    objectFit: "cover",
    transition: "all 4s cubic-bezier(0, 0, 0.1, 1)"
  },
  ".content": {
    zIndex: 1,
    maxWidth: 330,
    paddingLeft: "3rem",
    position: "relative",
    ".body": { marginTop: ".5rem" },
    ".badge": {
      color: "white",
      marginBottom: 4,
      padding: "5px 10px",
      display: "inline-block",
      "&.info": { backgroundColor: theme.palette.primary.main },
      "&.success": { backgroundColor: theme.palette.success.main },
      "&.primary": {
        color: "black",
        backgroundColor: theme.palette.warning.main
      }
    },
    ".btn": {
      fontSize: 16,
      fontWeight: 500,
      marginTop: "2rem",
      display: "inline-block",
      borderBottom: `2px solid ${theme.palette.common.white}`
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: 270,
      paddingLeft: "2rem",
      ".btn": { fontSize: 14 }
    }
  }
}));
