"use client";

import { styled } from "@mui/material/styles";
import { CARD_MEDIA_HEIGHT_PX } from "lib/card-layout";

export const StyledRoot = styled("div")(({ theme }) => ({
  borderRadius: 12,
  overflow: "hidden",
  border: `1px solid ${theme.palette.divider}`,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover .img-wrapper img": { scale: 1.1 },
  "& .img-wrapper": {
    display: "flex",
    position: "relative",
    flexShrink: 0,
    height: CARD_MEDIA_HEIGHT_PX,
    minHeight: CARD_MEDIA_HEIGHT_PX,
    maxHeight: CARD_MEDIA_HEIGHT_PX,
    overflow: "hidden",
    backgroundColor: theme.palette.grey[50],
    "& > span": {
      display: "block",
      width: "100%",
      height: "100% !important"
    },
    img: {
      transition: "0.3s",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center"
    }
  },
  "& .content": {
    padding: "1rem",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flex: 1
  }
}));

export const PriceText = styled("p")(({ theme }) => ({
  fontSize: 17,
  lineHeight: 1,
  fontWeight: 600,
  marginTop: ".75rem",
  color: theme.palette.primary.main,
  ".base-price": {
    fontSize: 13,
    marginLeft: 8,
    textDecoration: "line-through",
    color: theme.palette.grey[600]
  }
}));
