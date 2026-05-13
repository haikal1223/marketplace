"use client";

import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { CARD_MEDIA_HEIGHT_PX } from "lib/card-layout";

export const Card = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "8px",
  transition: "all 0.3s",
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.divider}`,
  ":hover": {
    "& .product-actions": { right: 5 },
    "& img": { transform: "scale(1.1)" },
    border: `1px solid ${theme.palette.primary.main}`
  }
}));

export const CardMedia = styled("div")({
  width: "100%",
  height: CARD_MEDIA_HEIGHT_PX,
  minHeight: CARD_MEDIA_HEIGHT_PX,
  maxHeight: CARD_MEDIA_HEIGHT_PX,
  flexShrink: 0,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  "& > span": {
    display: "block",
    width: "100%",
    height: "100% !important"
  },
  "& img": {
    transition: "0.3s",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center"
  }
});

export const CardContent = styled("div")(({ theme }) => ({
  padding: "1rem",
  textAlign: "center",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  "& .title": {
    fontWeight: 500,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    minHeight: "2.6em"
  },
  "& .price": { fontWeight: 600, paddingBlock: "0.25rem" },
  "& .ratings": {
    gap: "0.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
    span: { fontSize: 16 },
    ".amount": { fontSize: 12, color: theme.palette.grey[500], fontWeight: 500 }
  }
}));

export const StyledIconButton = styled(IconButton)({
  top: 10,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .1s"
});

export const FavoriteButton = styled(IconButton)({
  top: 45,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .2s"
});
