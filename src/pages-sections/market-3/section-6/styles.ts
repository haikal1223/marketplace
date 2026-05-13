"use client";

import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const BannerBox = styled("div", {
  shouldForwardProp: (prop) => prop !== "img"
})<{ img: string }>(({ theme, img }) => ({
  padding: "3rem 2rem",
  overflow: "hidden",
  borderRadius: ".5rem",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${img})`,
  ...(theme.direction === "rtl" && {
    textAlign: "right",
    "& > .MuiDivider-root": { marginLeft: "auto" }
  }),

  "&.text-white": {
    color: "white",
    "& .price span": { color: "white" },
    "& .MuiDivider-root": { borderColor: "white" }
  },

  "& .subtitle": { fontSize: 17 },
  "& .title": { fontSize: 27, fontWeight: 600 },
  "& .MuiDivider-root": {
    width: 60,
    borderWidth: 1,
    marginBlock: ".5rem",
    border: `1px solid ${theme.palette.primary.main}`
  },
  "& .price": {
    fontSize: 16,
    span: {
      fontSize: 21,
      fontWeight: 600,
      color: theme.palette.primary.main
    }
  }
}));
