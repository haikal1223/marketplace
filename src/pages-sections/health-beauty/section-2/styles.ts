"use client";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const ContentBox = styled(Card)(({ theme }) => ({
  height: 250,
  display: "flex",
  alignItems: "center",
  "& .content": { width: "50%" },
  border: `1px solid ${theme.palette.divider}`
}));

export const RightContent = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50%",
  height: "100%",
  flexDirection: "column",
  borderRadius: "0px 50% 50% 0px",
  background: theme.palette.primary[200],
  "& p": { fontSize: 13, lineHeight: 1.4 }
}));

export const LeftContent = styled("div")(() => ({
  width: "50%",
  height: "100%",
  position: "relative",
  img: {
    objectFit: "cover",
    objectPosition: "top",
    paddingInline: "1rem"
  }
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  fontWeight: 400,
  fontSize: "12px",
  marginTop: "16px",
  padding: "4px 12px",
  background: theme.palette.primary.main,
  "&:hover": { background: theme.palette.primary[400] }
}));
