import { styled } from "@mui/material/styles";

export const CategoryWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "show"
})<{ show: boolean }>(({ show, theme }) => ({
  left: 0,
  zIndex: 3,
  width: "100%",
  position: "fixed",
  top: show ? 0 : -90,
  boxShadow: theme.shadows[2],
  transition: "top 0.3s ease-in-out"
}));

export const SaleNavItem = styled("div", {
  shouldForwardProp: (prop) => prop !== "selected"
})<{ selected: boolean }>(({ selected, theme }) => ({
  minWidth: 100,
  height: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: selected ? theme.palette.primary.light : "transparent",
  "& p": {
    fontSize: 12,
    textAlign: "center",
    fontWeight: selected ? "600" : "400",
    color: selected ? theme.palette.primary.main : "inherit"
  },
  "& .icon": {
    fontSize: "1.75rem",
    color: selected ? theme.palette.primary.main : "inherit"
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.light
  }
}));
