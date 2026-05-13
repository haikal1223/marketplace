import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// STYLED COMPONENTS
export const FilterButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "selected"
})<{ selected?: boolean }>(({ theme, selected }) => ({
  fontWeight: selected ? 600 : 500,
  color: selected ? theme.palette.primary.main : "inherit",
  ":hover": {
    backgroundColor: "transparent",
    color: theme.palette.primary.main
  }
}));

export const TitleBadge = styled("span")(({ theme }) => ({
  margin: "0 4px",
  color: theme.palette.grey[500]
}));

export const Wrapper = styled("div")(({ theme }) => ({
  marginBottom: "1.5rem",
  padding: "6% 6% 0px",
  outline: "none",
  overflow: "hidden",
  cursor: "pointer",
  marginTop: "1rem",
  position: "relative",
  borderRadius: "0.5rem",
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.divider}`,
  "& .overlay": { transition: "0.3s ease-in-out" },
  "&:hover": { ".overlay": { opacity: 1 } },

  ".card": {
    overflow: "hidden",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  img: {
    width: "100%",
    height: "auto",
    display: "flex",
    objectFit: "contain",
    objectPosition: "top center"
  }
}));

export const StatusChip = styled("div")(({ theme }) => ({
  width: 44,
  height: 44,
  zIndex: 11,
  top: "10px",
  right: "8px",
  color: "#fff",
  fontWeight: 700,
  fontSize: "13px",
  borderRadius: 36,
  padding: "11px 7px",
  position: "absolute",
  boxShadow: theme.shadows[2],
  background: theme.palette.dark.main
}));

export const Overlay = styled("div")({
  inset: 0,
  opacity: 0,
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0, 0.2)",
  ".icon-btn": {
    backgroundColor: "white",
    transition: "transform 0.2s ease-in-out",
    ":hover": { transform: "scale(1.1)", backgroundColor: "white" }
  }
});

export const StyledRoot = styled("div")(() => ({
  marginBottom: "7rem",
  background: "url(/assets/images/landing/landing-bg-2.svg) center/contain no-repeat",
  ".container": { position: "relative" },
  ".header": {
    maxWidth: 830,
    textAlign: "center",
    marginInline: "auto",
    marginBottom: "2.5rem"
  },
  ".filters": {
    gap: 8,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },
  ".btn-wrapper": {
    marginTop: "3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));
