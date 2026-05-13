import { styled } from "@mui/material/styles";
import { layoutConstant } from "utils/constants";

export const StyledRoot = styled("div")(({ theme }) => ({
  position: "relative",
  "& .header": {
    top: 0,
    left: 0,
    right: 0,
    position: "fixed",
    padding: "0.5rem 1rem",
    backgroundColor: theme.palette.background.paper
  },
  "& .category-list": {
    left: 0,
    position: "fixed",
    overflowY: "auto",
    background: theme.palette.grey[100],
    top: layoutConstant.mobileHeaderHeight,
    bottom: layoutConstant.mobileNavHeight,
    borderRight: `1px solid ${theme.palette.grey[300]}`
  },
  "& .container": {
    left: "80px",
    width: "calc(100% - 80px)",
    position: "fixed",
    overflowY: "auto",
    padding: "0.75rem 1.25rem",
    top: layoutConstant.mobileHeaderHeight,
    bottom: layoutConstant.mobileNavHeight,
    "& .child-categories": {
      paddingLeft: theme.spacing(2),
      marginBottom: theme.spacing(1),
      borderLeft: `1px solid ${theme.palette.grey[300]}`,
      "& .link": { fontWeight: 400 }
    },
    "& .link": {
      fontWeight: 500,
      lineHeight: 1.75,
      display: "block",
      transition: "all 0.2s",
      paddingBlock: theme.spacing(0.5),
      ":hover": { color: theme.palette.primary.main }
    }
  }
}));

export const CategoryListItem = styled("div", {
  shouldForwardProp: (prop) => prop !== "isActive"
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  width: "80px",
  height: "80px",
  display: "flex",
  cursor: "pointer",
  padding: "0.5rem",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  borderLeft: `3px solid ${isActive ? theme.palette.primary.main : "transparent"}`,
  "& .title": {
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textAlign: "center",
    fontSize: "11px",
    lineHeight: "1"
  },
  "& .icon": { fontSize: "24px", marginBottom: "0.5rem" },
  ...(isActive && { color: theme.palette.primary.main })
}));
