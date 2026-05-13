import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

export const StyledRoot = styled("div")(({ theme }) => ({
  overflow: "hidden",
  paddingBottom: theme.spacing(4),
  display: "flex",
  flexWrap: "wrap",
  gap: "1.5rem",
  marginTop: "1rem",
  "& > a": { flex: "1 1 0" }
}));

export const CategoryBoxWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "selected"
})<{ selected: boolean }>(({ selected, theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingBlock: "3rem",
  minWidth: "200px",
  cursor: "pointer",
  borderRadius: 12,
  position: "relative",
  flexDirection: "column",
  transition: "all 250ms ease-in-out",
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: selected ? theme.shadows[5] : "none",
  "& > .icon": { fontSize: 44 },
  "& > .title": { fontSize: 14, fontWeight: 500 },
  "&:hover": { backgroundColor: theme.palette.grey[50] }
}));

export const StyledChip = styled(Chip)(() => ({
  top: "1rem",
  right: "1rem",
  fontWeight: 600,
  fontSize: "10px",
  padding: "5px 10px",
  position: "absolute"
}));
